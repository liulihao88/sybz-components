import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CreateAxiosDefaults,
  type Method,
} from 'axios'

export interface HttpRequestConfig<D = unknown> extends AxiosRequestConfig<D> {
  rawResponse?: boolean
  skipAuth?: boolean
  skipErrorToast?: boolean
}

export class HttpError<T = unknown> extends Error {
  readonly status?: number
  readonly code?: string
  readonly data?: T
  readonly cause?: unknown

  constructor(message: string, options: { status?: number; code?: string; data?: T; cause?: unknown } = {}) {
    super(message)
    this.name = 'HttpError'
    Object.assign(this, options)
  }
}

export interface CreateHttpOptions<D = unknown> extends CreateAxiosDefaults<D> {
  /** 返回 false 时视为业务失败；默认仅识别 success === false。 */
  isBusinessSuccess?: (data: unknown, response: AxiosResponse<D>) => boolean
  /** 从后端返回体提取业务错误文案。 */
  getBusinessMessage?: (data: unknown, fallback: string) => string
  /** 统一转换响应体，适用于 { data: ... } 等包装格式。 */
  transformResponseData?: (data: D, response: AxiosResponse<D>) => unknown
  /** 是否自动使用 $toast 提示错误。 */
  showErrorToast?: boolean
  toast?: (message: string) => void
  normalizeError?: (error: unknown) => HttpError
  /** 统一获取请求令牌。 */
  getToken?: () => string | undefined | null
  /** 请求发出前的统一处理。 */
  onRequest?: (config: HttpRequestConfig) => HttpRequestConfig | void
  /** 响应成功后的统一处理。 */
  onResponse?: (response: AxiosResponse) => void
  /** 响应失败后的统一处理，例如 401 跳转登录。 */
  onError?: (error: HttpError, response?: AxiosResponse) => void | Promise<void>
}

export type HttpClient = Omit<AxiosInstance, 'get' | 'post' | 'put' | 'patch' | 'delete'> & {
  <T = unknown, D = unknown>(url: string, params?: unknown, config?: HttpRequestConfig<D>): Promise<T>
  send<T = unknown, D = unknown>(config: HttpRequestConfig<D> & { rawResponse: true }): Promise<AxiosResponse<T>>
  send<T = unknown, D = unknown>(config: HttpRequestConfig<D> & { rawResponse?: false }): Promise<T>
  get<T = unknown>(url: string, params?: unknown, config?: HttpRequestConfig): Promise<T>
  post<T = unknown, D = unknown>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T>
  put<T = unknown, D = unknown>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T>
  patch<T = unknown, D = unknown>(url: string, data?: D, config?: HttpRequestConfig<D>): Promise<T>
  delete<T = unknown>(url: string, config?: HttpRequestConfig): Promise<T>
  download(url: string, params?: unknown, config?: HttpRequestConfig): Promise<Blob>
}

const record = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null
const defaultMessage = (data: unknown, fallback: string) => {
  if (!record(data)) return fallback
  for (const key of ['detail', 'error', 'message'])
    if (typeof data[key] === 'string' && data[key]) return data[key] as string
  return fallback
}

export function createHttp<D = unknown>(options: CreateHttpOptions<D> = {}): HttpClient {
  const {
    isBusinessSuccess = (data) => !(record(data) && data.success === false),
    getBusinessMessage = defaultMessage,
    transformResponseData,
    showErrorToast = false,
    toast,
    normalizeError,
    getToken,
    onRequest,
    onResponse,
    onError,
    ...axiosOptions
  } = options
  const instance = axios.create(axiosOptions)
  const normalize = (error: unknown): HttpError => {
    if (error instanceof HttpError) return error
    if (!axios.isAxiosError(error))
      return new HttpError(error instanceof Error ? error.message : '请求失败', { cause: error })
    const response = error.response
    const message =
      error.code === AxiosError.ECONNABORTED || error.code === 'ETIMEDOUT'
        ? '请求超时，请重试'
        : error.code === AxiosError.ERR_CANCELED
          ? '请求已取消'
          : response
            ? `请求失败（${response.status}）`
            : '网络连接失败，请检查网络后重试'
    return new HttpError(getBusinessMessage(response?.data, message), {
      status: response?.status,
      code: error.code,
      data: response?.data,
      cause: error,
    })
  }
  instance.interceptors.request.use((config) => {
    const requestConfig = config as HttpRequestConfig
    requestConfig.headers = AxiosHeaders.from(requestConfig.headers)
    if (!requestConfig.skipAuth) {
      const token = getToken?.()
      if (token && !requestConfig.headers.has('Authorization'))
        requestConfig.headers.set('Authorization', `Bearer ${token}`)
    }
    return (onRequest?.(requestConfig) as typeof requestConfig) || requestConfig
  })
  instance.interceptors.response.use(
    (response) => {
      const config = response.config as HttpRequestConfig
      if (!isBusinessSuccess(response.data, response as unknown as AxiosResponse<D>))
        throw new HttpError(getBusinessMessage(response.data, '请求失败'), {
          status: response.status,
          data: response.data,
        })
      if (transformResponseData && !config.rawResponse)
        response.data = transformResponseData(
          response.data as unknown as D,
          response as unknown as AxiosResponse<D>,
        ) as typeof response.data
      onResponse?.(response)
      return response
    },
    async (error) => {
      const normalized = normalizeError ? normalizeError(error) : normalize(error)
      const response = axios.isAxiosError(error) ? error.response : undefined
      if (showErrorToast && !(response?.config as HttpRequestConfig | undefined)?.skipErrorToast)
        toast?.(normalized.message)
      await onError?.(normalized, response)
      throw normalized
    },
  )
  const send = async <T, B>(config: HttpRequestConfig<B>): Promise<T | AxiosResponse<T>> => {
    const response = await instance.request<T, AxiosResponse<T>, B>(config)
    return config.rawResponse ? response : response.data
  }
  const request = (url: string, params?: unknown, config: HttpRequestConfig = {}) =>
    send({ ...config, method: 'GET', url, params, rawResponse: false }) as Promise<unknown>
  const client = Object.assign(request, instance, {
    send,
    get: (url: string, params?: unknown, config?: HttpRequestConfig) => request(url, params, config),
    post: (url: string, data?: unknown, config?: HttpRequestConfig) =>
      send({ ...config, method: 'POST' as Method, url, data, rawResponse: false }),
    put: (url: string, data?: unknown, config?: HttpRequestConfig) =>
      send({ ...config, method: 'PUT' as Method, url, data, rawResponse: false }),
    patch: (url: string, data?: unknown, config?: HttpRequestConfig) =>
      send({ ...config, method: 'PATCH' as Method, url, data, rawResponse: false }),
    delete: (url: string, config?: HttpRequestConfig) =>
      send({ ...config, method: 'DELETE' as Method, url, rawResponse: false }),
    download: (url: string, params?: unknown, config?: HttpRequestConfig) =>
      send<Blob, unknown>({ ...config, method: 'GET', url, params, responseType: 'blob', rawResponse: false }),
  }) as HttpClient
  return client
}

export const http = createHttp()
