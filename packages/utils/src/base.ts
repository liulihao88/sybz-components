import type { SybzComponentTheme } from './theme'
import { unref, isRef, isVNode, toRaw, h, Fragment, nextTick, normalizeClass } from 'vue'
import type { AppContext, Component, StyleValue, VNode } from 'vue'
import type { Ref } from 'vue'
import { consola } from 'consola'
import { cloneDeep } from 'es-toolkit' // 这里不要lodash-es的原因是, 体积太大, 超过500kb无法打包
import { formatTime } from './format'
import { resolveConfirmSemantic } from './confirmSemantic'
import type { ConfirmTarget, ConfirmVariant } from './confirmSemantic'
import { ElMessage, ElMessageBox, type ElMessageBoxOptions, type MessageOptions } from 'element-plus'
import { configureHttp, type CreateHttpOptions } from './http'

export type { ConfirmTarget, ConfirmVariant } from './confirmSemantic'

type Func<Args extends any[] = any[], Return = any> = (...args: Args) => Return
type StorageValue = unknown
type StorageMap = Record<string, any>
type MaybeRef<T> = T | Ref<T>
type WidthStyleResult = { width: string }
export type ValidateTriggerType = 'blur' | 'change'
export type ValidateInput = ValidateRules | ValidatePrimitiveValue
export type ValidateTypeInput = string | ValidateRules
type NormalizedValidateParams = {
  type: string
  rulesObject: ValidateRules
  rawRules: ValidateInput
  pureValid: boolean
}
export interface ValidateRuleResult {
  required?: boolean
  message?: string
  trigger?: ValidateTriggerType[]
  validator?: (rule: any, value: any, callback: (error?: Error) => void) => void
  min?: number
  max?: number
}
type ValidatePrimitiveValue = string | number | boolean | null | undefined
type MockValueOptionItem<T = any> = { label: string; value: T }

export type UtilsTheme = SybzComponentTheme

export interface SybzUtilsConfig {
  /**
   * 工具函数的默认主题。
   */
  theme?: UtilsTheme
  /** HTTP 客户端的全局配置，应用入口配置一次即可。 */
  http?: CreateHttpOptions
}

export interface ToastOptions extends Omit<Partial<MessageOptions>, 'icon'> {
  /** 是否解析 HTML 字符串，并将已全局注册的组件标签渲染为 Vue 组件；默认 true。仅传可信内容。 */
  dangerouslyUseHTMLString?: boolean
  /** 图标组件，或由全局 SIcon 自动解析的图标名称。 */
  icon?: string | Component
  /** 传给 s-icon 或自定义图标组件的属性。 */
  iconAttrs?: {
    size?: string | number
    color?: string
    source?: 'auto' | 'element-plus' | 'iconify' | 'css' | 'svg' | 'url'
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
    variant?: 'plain' | 'light' | 'solid'
    class?: string
    style?: StyleValue
    [key: string]: unknown
  }
  /** 字符串组件标签中 @click="方法名" 等事件对应的处理函数。 */
  handlers?: Record<string, (...args: any[]) => void>
  /** 是否启用仅在悬停关闭区域时出现的关闭按钮，默认 `true`。 */
  showClose?: boolean
  /**
   * 调用前是否先关闭全部消息提示。
   */
  closeAll?: boolean
  /**
   * 当前消息的主题；未传时使用 utils 全局主题。
   */
  theme?: UtilsTheme
}

interface ClearStorageExcludeOptions {
  /**
   * 清空时需要保留的 key 列表。
   */
  exclude: string[]
}

type ClearStorageInput = string | string[] | ClearStorageExcludeOptions

interface ValidateFormOptions {
  /**
   * 校验失败时的自定义提示文案；不传时根据字段错误自动选择。
   */
  message?: string
  /**
   * 是否在提示文案后追加字段名。
   */
  detail?: boolean
  /**
   * 是否显示错误提示。
   */
  showMessage?: boolean
}

interface FormValidateTarget {
  validate: (callback: (valid: boolean, status: StorageMap) => void) => void
}

interface MockValueOptions {
  /**
   * `email` 模式下的邮箱后缀，默认 `@qq.com`。
   */
  emailStr?: string
  /**
   * `time` 模式下追加的时间格式，默认 `{y}-{m}-{d} {h}:{i}:{s}`。
   */
  timeStr?: string
  /**
   * 生成结果前缀。
   */
  startStr?: string
  /**
   * 数组选项模式下的固定索引；不传时随机取值。
   */
  optionsIndex?: number | null
}

export interface ValidateRules {
  /**
   * 校验类型。作为 `validate({ type: 'mobile' })` 使用时生效。
   */
  type?: ValidateTypeValue | (string & {})
  /**
   * 校验失败提示文案。
   */
  message?: string
  /**
   * 最小值或最小长度。
   */
  min?: number
  /**
   * 最大值或最大长度。
   */
  max?: number
  /**
   * 对比值，例如 `same` 校验时使用。
   */
  value?: any
  /**
   * `pureValid` 模式下的待校验值，目前仅 `same` 需要（`value` 表示对比值）。
   */
  compare?: any
  /**
   * 自定义正则。
   */
  reg?: RegExp
  /**
   * 是否必填，默认 `true`。
   */
  required?: boolean
  /**
   * 触发时机，常用 `['blur', 'change']`。
   */
  trigger?: ValidateTriggerType[]
}

interface CopyOptions extends ToastOptions {
  /**
   * 是否隐藏复制成功提示。
   */
  hideToast?: boolean
}

type WidthInput = string | number | boolean | Ref<string | number | boolean>
export type ConfirmMessage = string | VNode | (() => VNode)
export type ConfirmTheme = UtilsTheme
type ConfirmAppendTarget = NonNullable<ElMessageBoxOptions['appendTo']>
type VueAppHost = {
  _context?: AppContext | null
}
type AppRootElement = Element & {
  /** Vue 3 挂载应用后写在容器上的实例，属性名是两个下划线。 */
  __vue_app__?: VueAppHost
  /** 兼容旧实现里误写的单下划线属性。 */
  _vue_app?: VueAppHost
}

export interface ConfirmCustomOptions {
  /**
   * 确认框语义样式。
   */
  variant?: ConfirmVariant
  /**
   * 删除场景中要操作的目标名称。
   */
  target?: ConfirmTarget
  /**
   * 确认框主题。
   */
  theme?: ConfirmTheme
  /**
   * 手动传入 appContext，处理多应用或嵌套弹窗场景。
   */
  appContext?: AppContext | null
}

export type ConfirmOptions = ElMessageBoxOptions & ConfirmCustomOptions

interface TryCatchResult<T> {
  /**
   * 执行成功时返回的数据；失败时为 `null`。
   */
  data: T | null
  /**
   * 执行失败时返回的异常；成功时为 `null`。
   */
  error: any
}

type TryCatchTask<T> = Promise<T> | (() => T | Promise<T>)

const DEFAULT_CONFIRM_BUTTON_CLASS = 's-message-box__confirm-btn'
const DEFAULT_CANCEL_BUTTON_CLASS = 's-message-box__cancel-btn'
const CHENGHUA_CONFIRM_BOX_CLASS = 's-message-box--chenghua'
const CHENGHUA_CONFIRM_BUTTON_CLASS = 's-message-box__confirm-btn--chenghua'
const CHENGHUA_CANCEL_BUTTON_CLASS = 's-message-box__cancel-btn--chenghua'
const SHIJINGSHAN_CONFIRM_BOX_CLASS = 's-message-box--shijingshan'
const SYBZ_CONFIRM_BOX_CLASS = 's-message-box--sybz'
const SHIJINGSHAN_CONFIRM_BUTTON_CLASS = 's-message-box__confirm-btn--shijingshan'
const SYBZ_CONFIRM_BUTTON_CLASS = 's-message-box__confirm-btn--sybz'
const SHIJINGSHAN_CANCEL_BUTTON_CLASS = 's-message-box__cancel-btn--shijingshan'
const SYBZ_CANCEL_BUTTON_CLASS = 's-message-box__cancel-btn--sybz'
const utilsConfig: Required<SybzUtilsConfig> = {
  theme: 'default',
  http: {},
}

/**
 * 配置 `@sybz-components/utils` 的全局默认行为。
 *
 * 单次函数调用中传入的配置优先级高于这里的全局配置。
 *
 * @example
 * configureUtils({ theme: 'shijingshan' })
 */
export function configureUtils(config: SybzUtilsConfig): Readonly<Required<SybzUtilsConfig>> {
  if (config.theme !== undefined) {
    utilsConfig.theme = config.theme
  }
  if (config.http !== undefined) {
    utilsConfig.http = config.http
    configureHttp(config.http)
  }
  return { ...utilsConfig }
}

function _getBrowserStorage(isSession = false): Storage | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    return isSession ? window.sessionStorage : window.localStorage
  } catch {
    return null
  }
}

function _parseStorageValue<T = any>(value: string | null): T | string | number | null {
  if (value == null) {
    return null
  }

  try {
    const parsed = JSON.parse(value)
    if (typeof parsed !== 'number') {
      return parsed
    }
  } catch {
    // Keep the original string when it is not valid JSON.
  }

  return value
}

type MessageType = 'success' | 'info' | 'error' | 'warning'
type ShortType = 's' | 'i' | 'e' | 'w'
type ToastType = MessageType | ShortType

function renderToastComponents(
  message: string,
  components: Record<string, Component>,
  handlers: ToastOptions['handlers'],
): VNode {
  const template = document.createElement('template')
  template.innerHTML = message

  const renderNode = (node: Node): VNode | string | null => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? ''
    if (node.nodeType !== Node.ELEMENT_NODE) return null

    const element = node as Element
    const tag = element.tagName.toLowerCase()
    const pascalTag = tag.replace(/(^|-)([a-z])/g, (_, _separator, letter: string) => letter.toUpperCase())
    const component = components[tag] ?? components[pascalTag]
    const attrs: Record<string, unknown> = {}
    for (const { name, value } of Array.from(element.attributes)) {
      if (name.startsWith('@')) {
        const handler = handlers?.[value]
        if (handler) {
          const eventName = name
            .slice(1)
            .replace(/(^|-)([a-z])/g, (_, _separator, letter: string) => letter.toUpperCase())
          attrs[`on${eventName}`] = handler
        }
      } else {
        attrs[name] = value === '' ? true : value
      }
    }
    const children = Array.from(element.childNodes, renderNode).filter((child) => child !== null)

    return component ? h(component, attrs, { default: () => children }) : h(tag, attrs, children)
  }

  return h(
    Fragment,
    null,
    Array.from(template.content.childNodes, renderNode).filter((child) => child !== null),
  )
}

/**
 * @description 显示消息提示。默认展示成功状态，并支持类型简写、完整配置和快捷调用。
 *
 * 支持三种常见写法：
 * 1. `$toast('保存成功')`
 * 2. `$toast('保存失败', 'e')`
 * 3. `$toast({ message: '自定义', type: 'warning' })`
 *
 * @param message 提示内容，支持纯文本、VNode、渲染函数，或完整配置对象。
 * @param type 提示类型，支持 `success/info/error/warning` 和简写 `s/i/e/w`，也支持直接传配置对象。
 * @param otherParams 额外配置，例如 `duration`、`customClass`、`closeAll`。
 * @returns 无返回值。
 *
 * @example
 * ```ts
 * import { $toast } from '@sybz-components/utils'
 *
 * $toast('保存成功')
 * $toast('保存失败', 'e')
 * $toast({
 *   message: '自定义提示',
 *   type: 'warning',
 *   duration: 1000,
 *   closeAll: true,
 * })
 * $toast.error('接口请求失败', { showClose: true })
 * ```
 *
 * @see {@link https://liulihao88.github.io/sybz-components/components/utils/$toast/home.html 详细文档}
 */
export function $toast(
  message: string | ToastOptions | VNode | (() => VNode),
  type: ToastType | ToastOptions = 'success',
  otherParams: ToastOptions = {},
): void {
  const typeMap: Record<ShortType, MessageType> = {
    s: 'success',
    i: 'info',
    e: 'error',
    w: 'warning',
  }

  function isShortType(t: any): t is ShortType {
    return ['s', 'i', 'e', 'w'].includes(t)
  }

  function isToastOptions(obj: any): obj is ToastOptions {
    return typeof obj === 'object' && obj !== null && !isVNode(obj)
  }

  function showToast(options: ToastOptions) {
    const {
      theme = utilsConfig.theme,
      customClass,
      iconAttrs,
      handlers,
      dangerouslyUseHTMLString = true,
      ...messageOptions
    } = options
    let htmlStringEnabled = dangerouslyUseHTMLString
    const appContext = _resolveAppContext(null)
    const appComponents = appContext?.components

    if (typeof messageOptions.icon === 'string') {
      const icon = appComponents?.SIcon ?? appComponents?.['s-icon']
      if (icon) {
        const iconName = messageOptions.icon
        messageOptions.icon = () => h(icon, { cursor: 'default', ...iconAttrs, icon: iconName })
      }
    } else if (messageOptions.icon && iconAttrs) {
      const icon = messageOptions.icon
      messageOptions.icon = () => h(icon, iconAttrs)
    }

    if (typeof messageOptions.message === 'string' && htmlStringEnabled) {
      const registeredComponents = appComponents ?? {}
      if (Object.keys(registeredComponents).length > 0) {
        messageOptions.message = renderToastComponents(messageOptions.message, registeredComponents, handlers)
        htmlStringEnabled = false
      }
    }

    if (options.closeAll) {
      ElMessage.closeAll()
    }

    const resolvedCustomClass = _mergeClassNames(
      's-toast',
      customClass !== 'el' && 's-antd-message',
      customClass !== 'el' && theme !== 'default' && `s-antd-message--${theme}`,
      customClass !== 'el' && customClass,
    )

    const resolvedMessageOptions = {
      ...messageOptions,
      dangerouslyUseHTMLString: htmlStringEnabled,
      showClose: options.showClose ?? true,
      customClass: resolvedCustomClass,
    } as MessageOptions
    if (appContext) ElMessage(resolvedMessageOptions, appContext)
    else ElMessage(resolvedMessageOptions)
  }

  // Case 1: message is options object
  if (isToastOptions(message)) {
    showToast(message)
    return
  }

  // Case 2: type is options object
  if (isToastOptions(type)) {
    showToast({
      message,
      type: 'success',
      ...type,
    })
    return
  }

  // Case 3: regular message with type and options
  const resolvedType = isShortType(type) ? typeMap[type] : type

  showToast({
    message,
    type: resolvedType,
    ...otherParams,
  })
}

/**
 * `$toast.success(...)` 的快捷调用。
 */
$toast.success = (message: string | ToastOptions | VNode | (() => VNode), otherParams: ToastOptions = {}) =>
  $toast(message, 'success', otherParams)
/**
 * `$toast.info(...)` 的快捷调用。
 */
$toast.info = (message: string | ToastOptions | VNode | (() => VNode), otherParams: ToastOptions = {}) =>
  $toast(message, 'info', otherParams)
/**
 * `$toast.error(...)` 的快捷调用。
 */
$toast.error = (message: string | ToastOptions | VNode | (() => VNode), otherParams: ToastOptions = {}) =>
  $toast(message, 'error', otherParams)
/**
 * `$toast.warning(...)` 的快捷调用。
 */
$toast.warning = (message: string | ToastOptions | VNode | (() => VNode), otherParams: ToastOptions = {}) =>
  $toast(message, 'warning', otherParams)

/**
 * 写入浏览器缓存。
 *
 * @param storageName 缓存 key。
 * @param params 要保存的值；对象和数组会自动序列化。
 * @param isSession 是否写入 `sessionStorage`；默认写入 `localStorage`。
 * 在 SSR / Node 环境下会自动跳过，不会抛错。
 *
 * @example
 * setStorage('token', 'abc123')
 *
 * @example
 * setStorage('userInfo', { id: 1, name: 'andy' }, true)
 */
export function setStorage(storageName: string, params: StorageValue, isSession = false): void {
  const storage = _getBrowserStorage(isSession)
  if (!storage) {
    return
  }

  let handleParams
  if (typeof params === 'number' || typeof params === 'string') {
    handleParams = params
  } else {
    handleParams = JSON.stringify(params)
  }
  storage.setItem(storageName, handleParams)
}

/**
 * 读取浏览器缓存。
 *
 * @param data 缓存 key。
 * @param isSession 是否从 `sessionStorage` 读取；默认从 `localStorage` 读取。
 * @returns 读取到的缓存值；不存在或在 SSR 环境下时返回 `null`。
 *
 * @example
 * const token = getStorage('token')
 *
 * @example
 * const userInfo = getStorage('userInfo', true)
 */
export function getStorage<T = any>(data: string, isSession = false): T | string | number | null {
  const storage = _getBrowserStorage(isSession)
  if (!storage) {
    return null
  }

  return _parseStorageValue<T>(storage.getItem(data))
}

/**
 * 清空浏览器缓存。
 *
 * @param str 要清空的 key；不传时清空全部，传 `exclude` 时表示保留指定 key。
 * @returns 无返回值。
 * 在 SSR / Node 环境下会自动跳过。
 *
 * @example
 * clearStorage()
 *
 * @example
 * clearStorage('loginId')
 *
 * @example
 * clearStorage({ exclude: ['token', 'theme'] })
 */
export function clearStorage(str: ClearStorageInput = ''): void {
  const sessionStorageRef = _getBrowserStorage(true)
  const localStorageRef = _getBrowserStorage(false)

  if (!sessionStorageRef && !localStorageRef) {
    return
  }

  if (isEmpty(str)) {
    sessionStorageRef?.clear()
    localStorageRef?.clear()
  }
  if (typeof str === 'string' || Array.isArray(str)) {
    const strArr = Array.isArray(str) ? str : [str]
    for (let i = 0; i < strArr.length; i++) {
      sessionStorageRef?.removeItem(strArr[i])
      localStorageRef?.removeItem(strArr[i])
    }
  }
  if (_isObjectWithExclude(str)) {
    if (!isEmpty(str.exclude) && getType(str) === 'object') {
      const sessionStorageObj: StorageMap = {}
      const localStorageObj: StorageMap = {}
      for (const key in str.exclude) {
        if (Object.prototype.hasOwnProperty.call(str.exclude, key)) {
          const name = str.exclude[key]
          const localValue = getStorage(name)
          const sessionValue = getStorage(name, true)
          if (localValue !== null) {
            localStorageObj[name] = localValue
          }
          if (sessionValue !== null) {
            sessionStorageObj[name] = sessionValue
          }
        }
      }
      sessionStorageRef?.clear()
      localStorageRef?.clear()
      for (const key in sessionStorageObj) {
        setStorage(key, sessionStorageObj[key], true)
      }
      for (const key in localStorageObj) {
        setStorage(key, localStorageObj[key])
      }
    }
  }
}
// 自定义类型守卫函数
function _isObjectWithExclude(obj: ClearStorageInput): obj is ClearStorageExcludeOptions {
  return typeof obj === 'object' && obj !== null && 'exclude' in obj && Array.isArray(obj.exclude)
}

/**
 * 将 Element Plus 表单校验封装为 Promise。
 *
 * @param ref 表单实例或表单实例的 `ref`。
 * @param options 校验配置。
 * @returns 校验通过时返回表单状态对象，失败时 reject 对应状态对象。
 *
 * @example
 * await validateForm(formRef)
 *
 * @example
 * await validateForm(formRef, { message: '请检查表单信息', detail: true })
 */
export function validateForm(
  ref: MaybeRef<FormValidateTarget>,
  { message, detail = false, showMessage = true }: ValidateFormOptions = {},
): Promise<StorageMap> {
  return new Promise((resolve, reject) => {
    unref(ref).validate((valid, status) => {
      if (valid) {
        resolve(status)
      } else {
        if (showMessage) {
          const fieldNames = Object.keys(status ?? {})
          const errors = fieldNames.flatMap((field) => {
            const fieldErrors = status[field]
            return Array.isArray(fieldErrors) ? fieldErrors : [fieldErrors]
          })
          const errorMessages = errors
            .map((error) => error?.message)
            .filter((errorMessage): errorMessage is string => typeof errorMessage === 'string' && !!errorMessage.trim())
          const nonRequiredMessage = errors.find((error) => {
            const errorMessage = error?.message
            if (typeof errorMessage !== 'string' || !errorMessage.trim()) return false
            if ('fieldValue' in Object(error) && !isEmpty(error.fieldValue)) return true
            return (
              !/^(请输入|请选择|请填写|请上传|请勾选|不能为空)/.test(errorMessage) ||
              /^请输入(?:正确|非负|正|整数|数字|\d|至少|最多|不超过)/.test(errorMessage)
            )
          })?.message
          const defaultMessage =
            nonRequiredMessage ?? (errorMessages.length ? '存在必填项未填写，请补充完整' : '表单校验未通过，请检查输入')
          const toastMessage = message === undefined ? defaultMessage : message
          if (toastMessage) $toast(detail ? toastMessage + fieldNames.join(',') : toastMessage, 'e')
        }
        reject(status)
      }
    })
  })
}

function isPlainObject(data: any): boolean {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    return false
  }

  const proto = Object.getPrototypeOf(data)
  return proto === Object.prototype || proto === null
}

/**
 * 判断值是否为空。
 *
 * 默认采用更安全的“结构空值”语义：
 * `undefined`、`null`、空字符串、空数组、空对象、`NaN`、空 `Map` / `Set`、无效日期会返回 `true`。
 *
 * @param data 要判断的值。
 * @param strict 是否使用严格模式。默认 `true`；传 `false` 时会沿用旧语义，把 `0` 和 `false` 也视为空值。
 * @returns 是否为空。
 *
 * @example
 * isEmpty('   ')
 * // => true
 *
 * @example
 * isEmpty(0)
 * // => false
 *
 * @example
 * isEmpty(0, false)
 * // => true
 */
export function isEmpty(data: any, strict = true): boolean {
  if (isRef(data)) {
    data = unref(data)
  }

  // 处理 null/undefined
  if (data == null) return true
  // 如果是日期对象，检查它是否是有效的日期
  if (data instanceof Date) {
    return Number.isNaN(data.getTime())
  }
  // 处理基础类型
  switch (typeof data) {
    case 'string':
      return data.trim().length === 0
    case 'boolean':
      return strict ? false : !data
    case 'number':
      return Number.isNaN(data) || (!strict && data === 0)
    case 'symbol':
      return false
    case 'bigint':
      return strict ? false : data === BigInt(0)
    case 'function':
      return false
  }
  // 处理集合类型
  if (data instanceof Map || data instanceof Set) return data.size === 0
  // 处理数组
  if (Array.isArray(data)) {
    return data.length === 0
  }

  // 只把 plain object 当作普通对象判断，避免误伤 Promise / RegExp / Error 等实例
  if (isPlainObject(data)) {
    return Reflect.ownKeys(data).length === 0
  }

  return false
}

/**
 * 合并两个对象。
 *
 * 当同名字段同时有值时，以第二个对象为准；当其中一个字段为空时，保留有值的一侧。
 *
 * @param obj1 第一个对象。
 * @param obj2 第二个对象。
 * @returns 合并后的对象。
 *
 * @example
 * merge(
 *   { name: '', age: 18, city: 'beijing' },
 *   { name: 'andy', age: 20, city: '' },
 * )
 */
export function merge<T extends StorageMap, U extends StorageMap>(obj1: T, obj2: U): T & U {
  const merged: StorageMap = { ...obj1, ...obj2 }
  for (let key in merged) {
    if (!isEmpty(obj1[key]) && !isEmpty(obj2[key])) {
      merged[key] = obj2[key]
    } else if (isEmpty(obj1[key]) && !isEmpty(obj2[key])) {
      merged[key] = obj2[key]
    } else if (!isEmpty(obj1[key]) && isEmpty(obj2[key])) {
      merged[key] = obj1[key]
    }
  }
  return merged as T & U
}

/**
 * 深拷贝数据；传入数组时可按次数重复展开。
 *
 * @param data 要克隆的数据。
 * @param times 当 `data` 是数组时的复制次数，默认 `1`。
 * @returns 克隆后的数据。
 *
 * @example
 * clone({ name: 'andy', info: { id: 1 } })
 *
 * @example
 * clone([1, 2, { name: 'andy' }], 2)
 * // => [1, 2, { name: 'andy' }, 1, 2, { name: 'andy' }]
 */
export function clone<T>(data: T[], times?: number): T[]
export function clone<T>(data: T, times?: number): T
export function clone<T>(data: T | T[], times = 1): T | T[] {
  const rawData = isRef(data) ? unref(data) : data
  // Check if the data is not an array
  if (!Array.isArray(rawData)) {
    // If not an array, return a deep clone of the data
    return cloneDeep(rawData) as T
  }
  const clonedData = cloneDeep(rawData) as T[]
  const result: T[] = []
  for (let i = 0; i < times; i++) {
    result.push(...clonedData)
  }
  return result
}

/**
 * 生成随机字符串，也支持手机号、邮箱、时间、数字、IP、端口等特殊模式。
 *
 * @param type 生成模式，支持空字符串、`phone`、`email`、`time`、`number`、`ip`、`port`，也支持传选项数组。
 * @param length 随机字符串或数字的长度，默认 `4`。
 * @param options 额外配置。
 * @returns 生成结果。
 *
 * @example
 * mockValue()
 * // => 'aB3d'
 *
 * @example
 * mockValue('phone')
 * // => '13603312460'
 *
 * @example
 * mockValue('time', 0, { startStr: 'andy', timeStr: '{h}:{i}:{s}' })
 */
export function mockValue(
  type: string | Array<MockValueOptionItem> = '',
  length = 4,
  options: MockValueOptions = {},
): string | number | any {
  const { emailStr = '@qq.com', timeStr = '{y}-{m}-{d} {h}:{i}:{s}', startStr = '', optionsIndex = null } = options

  // 辅助函数：判断是否为ref对象
  function isRef(obj: any): obj is Ref<any> {
    return obj && typeof obj === 'object' && obj._isRef === true
  }

  // 辅助函数：获取ref的实际值
  function unref<T>(ref: Ref<T> | T): T {
    return isRef(ref) ? ref.value : ref
  }

  // 辅助函数：生成随机数
  function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  // 解包可能为ref的参数
  type = unref(type)

  // 处理数组类型参数（下拉框选项）
  if (Array.isArray(type)) {
    if (type.length === 0) return ''

    const randIndex = optionsIndex ?? random(0, type.length - 1)
    const selectedItem = type[randIndex]

    // 如果数组项是对象且有value属性，则返回value
    if (typeof selectedItem === 'object' && selectedItem !== null && 'value' in selectedItem) {
      return selectedItem.value
    }

    // 否则直接返回数组项
    return selectedItem
  }

  // 生成随机字符串
  let randomChars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
  let result = startStr

  // 生成手机号
  if (type === 'phone') {
    const prefixes = ['130', '131', '132', '133', '135', '136', '137', '138', '170', '187', '189']
    result = prefixes[random(0, prefixes.length - 1)]

    for (let i = 0; i < 8; i++) {
      result += Math.floor(Math.random() * 10)
    }
    return result
  }

  // 生成邮箱
  if (type === 'email') {
    result = mockValue(startStr, length) + emailStr
    return result
  }

  // 生成时间
  if (type === 'time') {
    return mockValue(startStr, length, options) + ' ' + formatTime(new Date(), timeStr)
  }

  // 生成数字
  if (type === 'number') {
    const numChars = '123456789'
    result = ''

    for (let i = 0; i < length; i++) {
      result += numChars[random(0, numChars.length - 1)]
    }
    return Number(result)
  }

  // 生成IP地址
  if (type === 'ip') {
    const randomNum = random(1, 99)
    return `10.0.11.${randomNum}`
  }

  // 生成端口号
  if (type === 'port') {
    return random(1, 65535)
  }

  // 生成普通随机字符串
  for (let i = 0; i < length; i++) {
    result += randomChars[random(0, randomChars.length - 1)]
  }

  return result
}

/**
 * 获取值的原始类型名称，返回值统一为小写字符串。
 *
 * @param type 要判断的值。
 * @returns 类型名称，例如 `array`、`date`、`object`、`null`。
 *
 * @example
 * getType(new RegExp())
 * // => 'regexp'
 *
 * @example
 * getType([])
 * // => 'array'
 */
export function getType(type: unknown): string {
  if (typeof type === 'object') {
    const objType = Object.prototype.toString.call(type).slice(8, -1).toLowerCase()
    return objType
  } else {
    return typeof type
  }
}

/**
 * 一个辅助函数，用于在代码中创建一个暂停（延迟）。
 * 它返回一个 Promise，你可以在 `await` 后使用它来实现类似 "delay" 的效果。
 *
 * @param delay - 等待的毫秒数。默认值为 0，表示不延迟。
 * @param fn - (可选) 一个在延迟结束后立即执行的函数。
 *
 * @returns 一个 Promise，当延迟结束后解析（resolve）。
 *
 * @example
 * // 基本用法：延迟 2 秒后打印消息
 * console.log('开始');
 * await delay(2000);
 * console.log('2秒后执行');
 *
 * @example
 * // 带回调函数的用法：延迟 1 秒后执行清理工作
 * delay(1000, () => {
 *   console.log('执行清理操作...');
 *   // 清理代码...
 * });
 *
 * @example
 * // 在循环中使用：每次迭代后延迟 500 毫秒
 * for (let i = 0; i < 5; i++) {
 *   console.log(`当前值: ${i}`);
 *   await delay(500);
 * }
 */
export function delay(delay: number = 0, fn?: () => void) {
  return new Promise<void>((resolve) =>
    setTimeout(() => {
      fn?.()
      resolve()
    }, delay),
  )
}

/**
 * 为 `validate` 预置空触发时机，只在提交或手动调用表单校验时触发。
 *
 * @param type 校验类型。
 * @param rules 校验规则；第一个参数是规则对象时，此参数作为 `pureValid`。
 * @param pureValid 是否直接返回布尔值。
 * @returns 与 `validate` 一致。
 *
 * @example
 * const rule = validateOnSubmit('required', { message: '请输入名称' })
 *
 * @example
 * const isMobile = validateOnSubmit({ type: 'mobile', value: '13800138000' }, true)
 */
export function validateOnSubmit(type: ValidateRules, rules: true, pureValid?: boolean): boolean
export function validateOnSubmit(
  type?: ValidateTypeInput,
  rules?: ValidateInput | false,
  pureValid?: false,
): ValidateRuleResult
export function validateOnSubmit(
  type: ValidateTypeInput | undefined,
  rules: ValidateInput | boolean | undefined,
  pureValid: true,
): boolean
export function validateOnSubmit(
  type: ValidateTypeInput = 'required',
  rules: ValidateInput | boolean = {},
  pureValid = false,
): ValidateRuleResult | boolean {
  const normalized = normalizeValidateParams(type, rules, pureValid)
  if (normalized.pureValid) {
    return validate(normalized.type, normalized.rawRules, true)
  }
  return validate(
    normalized.type,
    {
      ...normalized.rulesObject,
      trigger: normalized.rulesObject.trigger ?? [],
    },
    normalized.pureValid as false,
  )
}

/** 内置校验类型；不在其中的字符串会被当作错误提示文案。 */
const ValidateType = {
  REQUIRED: 'required',
  CHANGE: 'change',
  PASSWORD: 'password',
  NUMBER: 'number',
  POSITIVE: 'positive',
  ZERO_POSITIVE: 'zeroPositive',
  INTEGER: 'integer',
  DECIMAL: 'decimal',
  MOBILE: 'mobile',
  EMAIL: 'email',
  IP: 'ip',
  PORT: 'port',
  BETWEEN: 'between',
  LENGTH: 'length',
  SAME: 'same',
  CUSTOM: 'custom',
} as const

/** 可用的内置校验类型。 */
export type ValidateTypeValue = (typeof ValidateType)[keyof typeof ValidateType]

const DEFAULT_VALIDATE_TRIGGER: ValidateTriggerType[] = ['blur', 'change']

/** 内置正则统一在此维护，避免每次调用重新创建。 */
const VALIDATE_REGEXP = {
  password: /^[a-zA-Z0-9_-]+$/,
  // 正整数
  positiveInteger: /^[1-9]\d*$/,
  // 非负整数
  nonNegativeInteger: /^(0|[1-9]\d*)$/,
  // 整数，包含负数和 0
  integer: /^(0|-?[1-9]\d*)$/,
  // 非负数字，最多 2 位小数
  decimal: /^(?:0|[1-9]\d*)(?:\.\d{1,2})?$/,
  mobile: /^1\d{10}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ip: /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
  // 1-65535
  port: /^(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3})$/,
} as const

type ValidateValidator = (rule: any, value: any, callback: (error?: Error) => void) => void

function isRegExp(value: unknown): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]'
}

/** null / undefined 一律视为不通过；顺带重置 g、y 标记的 lastIndex，避免多次校验结果交替。 */
function testRegExp(reg: RegExp, value: unknown): boolean {
  if (value == null) return false
  if (reg.global || reg.sticky) reg.lastIndex = 0
  return reg.test(value as string)
}

/** 非必填且值为空时跳过格式校验，把空值交给必填校验处理。 */
function isOptionalEmpty(value: unknown, required: boolean): boolean {
  return !required && isEmpty(value)
}

function createRegExpValidator(reg: RegExp, rules: ValidateRules, defaultMessage: string): ValidateValidator {
  return (_rule, value, callback) => {
    if (isOptionalEmpty(value, rules.required ?? true)) {
      callback()
      return
    }
    if (!testRegExp(reg, value)) {
      callback(new Error(rules.message ?? defaultMessage))
      return
    }
    callback()
  }
}

function toOptionalNumber(value: unknown): number | undefined {
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (typeof value !== 'string' || value.trim() === '') return undefined
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : undefined
}

/** 数值范围校验，通过时返回 null。 */
function getBetweenError(value: unknown, rules: ValidateRules): string | null {
  const num = toOptionalNumber(value)
  if (num === undefined) return '请输入数字'
  const min = toOptionalNumber(rules.min)
  const max = toOptionalNumber(rules.max)
  if (min !== undefined && num < min) return `数字不能小于${rules.min}`
  if (max !== undefined && num > max) return `数字不能大于${rules.max}`
  return null
}

/** 字符长度校验，通过时返回 null。 */
function getLengthError(value: unknown, rules: ValidateRules): string | null {
  if (value == null) return rules.message ?? '请输入'
  const min = toOptionalNumber(rules.min)
  const max = toOptionalNumber(rules.max)
  const length = String(value).length
  if (min !== undefined && length < min) return rules.message ?? `请输入至少${min}个字符`
  if (max !== undefined && length > max) return rules.message ?? `请输入最多${max}个字符`
  return null
}

function getLengthMessage(rules: ValidateRules): string {
  const min = toOptionalNumber(rules.min)
  const max = toOptionalNumber(rules.max)
  if (min !== undefined && max !== undefined) return `请输入${min}到${max}个字符`
  if (min !== undefined) return `请输入至少${min}个字符`
  if (max !== undefined) return `请输入最多${max}个字符`
  return '请输入'
}

/** 一致性校验，通过时返回 null。 */
function getSameError(value: unknown, rules: ValidateRules, required: boolean): string | null {
  if (value !== unref(rules.value)) return rules.message ?? '密码和确认密码要一致'
  if (required && isEmpty(value)) return rules.message ?? '请输入'
  return null
}

function createValueRule(
  value: unknown,
  isPureValid: boolean,
  reg: RegExp,
  defaultMessage: string,
  rules: ValidateRules,
  trigger: ValidateTriggerType[],
): ValidateRuleResult | boolean {
  if (isPureValid) return testRegExp(reg, value)
  return {
    required: rules.required ?? true,
    validator: createRegExpValidator(reg, rules, defaultMessage),
    trigger,
  }
}

/**
 * 生成 Element Plus 表单校验规则，或直接执行纯校验。
 *
 * @example
 * const mobileRule = validate('mobile')
 *
 * @example
 * const selectRule = validate('change')
 *
 * @example
 * const rangeRule = validate('between', { min: 1, max: 99 })
 *
 * @example
 * const objectRule = validate({ type: 'mobile', message: '请输入手机号' })
 *
 * @example
 * const isIp = validate('ip', '192.168.1.1', true)
 *
 * @example
 * const isSame = validate({ type: 'same', value: 'pwd', compare: 'pwd' }, true)
 *
 * @param type 校验类型、校验规则对象；如果传入的字符串不在内置类型列表中，则会直接作为错误提示文案使用。
 * @param rules 校验规则配置，或在 `pureValid=true` 时直接传待校验值；当第一个参数是对象时，此参数表示 `pureValid`。
 * @param pureValid 是否直接返回布尔值。
 * @returns `pureValid=true` 时返回布尔值，否则返回 Element Plus 规则对象。
 */
export function validate(type: ValidateRules, rules: true, pureValid?: boolean): boolean
export function validate(type?: ValidateTypeInput, rules?: ValidateInput | false, pureValid?: false): ValidateRuleResult
export function validate(
  type: ValidateTypeInput | undefined,
  rules: ValidateInput | boolean | undefined,
  pureValid: true,
): boolean
export function validate(
  type: ValidateTypeInput = 'required',
  rules: ValidateInput | boolean = {},
  pureValid = false,
): ValidateRuleResult | boolean {
  const normalized = normalizeValidateParams(type, rules, pureValid)
  const rulesObject = normalized.rulesObject
  const rawRules = normalized.rawRules
  const validType = normalized.type || ValidateType.REQUIRED
  const isPureValid = normalized.pureValid
  const trigger = rulesObject.trigger ?? [...DEFAULT_VALIDATE_TRIGGER]
  const parseRequired = rulesObject.required ?? true
  const defaultRequiredMessage = validType === ValidateType.CHANGE ? '请选择' : '请输入'
  // 纯校验时待校验值：type 为对象时优先取 rules.value，否则取第二个参数
  const pureValue = Object.prototype.hasOwnProperty.call(rulesObject, 'value') ? rulesObject.value : rawRules

  if (validType === ValidateType.REQUIRED || validType === ValidateType.CHANGE) {
    if (isPureValid) return !isEmpty(pureValue)
    return {
      required: parseRequired,
      message: rulesObject.message ?? defaultRequiredMessage,
      trigger,
    }
  }

  if (validType === ValidateType.PASSWORD) {
    if (isPureValid) return testRegExp(VALIDATE_REGEXP.password, pureValue)
    return {
      required: parseRequired,
      validator: createRegExpValidator(
        VALIDATE_REGEXP.password,
        rulesObject,
        '密码只能由英文、数字、下划线、中划线组成',
      ),
      trigger,
    }
  }

  if (validType === ValidateType.NUMBER || validType === ValidateType.POSITIVE) {
    return createValueRule(
      pureValue,
      isPureValid,
      VALIDATE_REGEXP.positiveInteger,
      '请输入正整数',
      rulesObject,
      trigger,
    )
  }
  if (validType === ValidateType.ZERO_POSITIVE) {
    return createValueRule(
      pureValue,
      isPureValid,
      VALIDATE_REGEXP.nonNegativeInteger,
      '请输入非负整数',
      rulesObject,
      trigger,
    )
  }
  if (validType === ValidateType.INTEGER) {
    return createValueRule(pureValue, isPureValid, VALIDATE_REGEXP.integer, '请输入整数', rulesObject, trigger)
  }
  if (validType === ValidateType.DECIMAL) {
    return createValueRule(
      pureValue,
      isPureValid,
      VALIDATE_REGEXP.decimal,
      '请输入非负数字, 包含小数且最多2位',
      rulesObject,
      trigger,
    )
  }
  if (validType === ValidateType.MOBILE) {
    return createValueRule(pureValue, isPureValid, VALIDATE_REGEXP.mobile, '请输入正确的手机号', rulesObject, trigger)
  }
  if (validType === ValidateType.EMAIL) {
    return createValueRule(pureValue, isPureValid, VALIDATE_REGEXP.email, '请输入正确的email', rulesObject, trigger)
  }
  if (validType === ValidateType.IP) {
    return createValueRule(pureValue, isPureValid, VALIDATE_REGEXP.ip, '请输入正确的ip地址', rulesObject, trigger)
  }
  if (validType === ValidateType.PORT) {
    return createValueRule(pureValue, isPureValid, VALIDATE_REGEXP.port, '请输入1-65535的端口号', rulesObject, trigger)
  }

  if (validType === ValidateType.BETWEEN) {
    if (isPureValid) return getBetweenError(pureValue, rulesObject) === null
    return {
      required: parseRequired,
      trigger,
      validator: (_rule, value, callback) => {
        if (isOptionalEmpty(value, parseRequired)) {
          callback()
          return
        }
        const errorMessage = getBetweenError(value, rulesObject)
        if (errorMessage) {
          callback(new Error(errorMessage))
          return
        }
        callback()
      },
    }
  }

  if (validType === ValidateType.LENGTH) {
    if (isPureValid) return getLengthError(pureValue, rulesObject) === null
    return {
      min: rulesObject.min,
      max: rulesObject.max,
      message: rulesObject.message ?? getLengthMessage(rulesObject),
      trigger,
      required: parseRequired,
    }
  }

  if (validType === ValidateType.SAME) {
    // same 需要两个值：rules.value 为对比值；纯校验时 rules.compare 为待校验值
    if (isPureValid) return getSameError(rulesObject.compare, rulesObject, parseRequired) === null
    return {
      required: parseRequired,
      trigger,
      validator: (_rule, value, callback) => {
        const errorMessage = getSameError(value, rulesObject, parseRequired)
        if (errorMessage) {
          callback(new Error(errorMessage))
          return
        }
        callback()
      },
    }
  }

  if (validType === ValidateType.CUSTOM) {
    // 缺少正则是配置错误：提示后降级为必填校验，避免校验时抛出难以定位的异常
    if (!isRegExp(rulesObject.reg)) {
      consola.warn('[validate] custom 类型需要传入 reg 正则，已降级为必填校验')
      if (isPureValid) return !isEmpty(pureValue)
      return {
        required: parseRequired,
        message: rulesObject.message ?? defaultRequiredMessage,
        trigger,
      }
    }
    return createValueRule(pureValue, isPureValid, rulesObject.reg, '请输入', rulesObject, trigger)
  }

  // 不是内置类型时，把 type 当作错误提示文案，行为等同必填校验
  if (isPureValid) return !isEmpty(pureValue)
  return {
    required: parseRequired,
    message: validType || defaultRequiredMessage,
    trigger,
  }
}

function normalizeValidateParams(
  type: ValidateTypeInput,
  rules: ValidateInput | boolean,
  pureValid: boolean,
): NormalizedValidateParams {
  if (typeof type === 'object' && type !== null) {
    const rulesObject = type
    return {
      type: rulesObject.type || ValidateType.REQUIRED,
      rulesObject,
      rawRules: rulesObject,
      pureValid: typeof rules === 'boolean' ? rules : pureValid,
    }
  }

  return {
    type: type as string,
    rulesObject: typeof rules === 'object' && rules !== null ? rules : {},
    rawRules: rules,
    pureValid,
  }
}

/**
 * 复制文本到剪贴板。
 *
 * @param text 需要复制的文本。
 * @param toastParams 提示配置；传 `hideToast: true` 时不显示成功提示。
 * @returns 是否复制成功。
 *
 * @example
 * copy('这是要复制的文本')
 *
 * @example
 * copy('静默复制', { hideToast: true })
 */
export const copy = (text: string, toastParams: CopyOptions = {}): boolean => {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  document.body.removeChild(textarea)
  if (!toastParams.hideToast) {
    // 确保我们传递给$toast的是一个有效的ToastOptions对象
    const { hideToast: _hideToast, ...toastOptions } = toastParams
    $toast(text + '复制成功', toastOptions)
    return true
  }
  return true
}

/**
 * 带变量名的日志输出封装。
 *
 * @param variableStr 变量名或标签名。
 * @param variable 需要打印的值。
 * @param otherInfo 附加信息，常用于手动传入文件路径。
 *
 * @example
 * const formData = { id: 1, name: 'andy' }
 * log('formData', formData)
 */
export function log(variableStr: string, variable: unknown, otherInfo = ''): void {
  const stack = new Error().stack?.split('\n')[2]?.trim() ?? '' // 获取调用堆栈的第二行
  const matchResult = stack.match(/\((.*):(\d+):(\d+)\)/)
  let fileInfo = ''
  try {
    if (matchResult && otherInfo) {
      const lineNumber = matchResult[2]
      fileInfo = `vscode://file${JSON.parse(otherInfo)}:${lineNumber}`
    }
  } catch {
    fileInfo = otherInfo
  }

  if (isRef(variable)) {
    const unrefVariable = unref(variable)
    _log(toRaw(unrefVariable))
  } else {
    _log(variable)
  }
  function _log(consoleData: unknown) {
    if (getType(consoleData) === 'object' || getType(consoleData) === 'array') {
      consola.log(
        `%c${variableStr} `,
        'background:#fff; color: blue;font-size: 0.8em',
        JSON.stringify(consoleData, null, '\t'),
        `${fileInfo}`,
      )
    } else {
      consola.log(`%c${variableStr} `, 'background:#fff; color: blue;font-size: 0.8em', consoleData, `${fileInfo}`)
    }
  }
  function getType(type: unknown): string {
    if (typeof type === 'object') {
      const objType = Object.prototype.toString.call(type).slice(8, -1).toLowerCase()
      return objType
    } else {
      return typeof type
    }
  }
}

/**
 * 生成指定范围内的随机整数。
 *
 * @param min 最小值，默认 `0`。
 * @param max 最大值，默认 `10`。
 * @returns 随机整数。
 *
 * @example
 * random()
 *
 * @example
 * random(100, 999)
 */
export function random(min = 0, max = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 将驼峰命名转换为连接符命名。
 *
 * @param text 要转换的文本。
 * @param connect 连接符，默认 `-`。
 * @returns 转换后的文本。
 *
 * @example
 * toLine('NameAndy')
 * // => 'name-andy'
 *
 * @example
 * toLine('CompTitle', '_')
 * // => 'comp_title'
 */
export function toLine(text: string, connect = '-'): string {
  let translateText = text
    .replace(/([A-Z])/g, (match, _letter, offset) => {
      if (offset === 0) {
        return `${match.toLocaleLowerCase()}`
      } else {
        return `${connect}${match.toLocaleLowerCase()}`
      }
    })
    .toLocaleLowerCase()
  return translateText
}

const _CSS_UNIT_RE = /^[0-9]+(\.[0-9]+)?(px|%|em|rem|vw|vh|ch)$/
const _CSS_LENGTH_FUNCTION_RE = /^(?:calc|min|max|clamp|var)\(.+\)$/
/**
 * 将宽度值规范化为可直接用于样式的结果。
 *
 * @param initValue 宽度值，支持数字、数字字符串、CSS 长度、CSS 计算函数和 `ref`。
 * @param isBase 为 `true` 时直接返回宽度字符串；否则返回 `{ width }` 对象。
 * @returns 宽度字符串或宽度样式对象；无效值返回空字符串或空对象。
 *
 * @example
 * processWidth(200)
 * // => { width: '200px' }
 *
 * @example
 * processWidth('50%', true)
 * // => '50%'
 *
 * @example
 * processWidth('calc(100% - 24px)', true)
 * // => 'calc(100% - 24px)'
 */
export function processWidth(initValue: WidthInput, isBase: true): string
export function processWidth(initValue: WidthInput, isBase?: false): WidthStyleResult | {}
export function processWidth(initValue: WidthInput, isBase = false): WidthStyleResult | {} | string {
  const raw = unref(initValue)

  if (raw === undefined || raw === null || raw === '' || raw === false) {
    return isBase ? '' : {}
  }

  const str = raw === true ? '100%' : typeof raw === 'number' ? `${raw}` : raw

  let res: string
  if (!isNaN(Number(str))) {
    res = str + 'px'
  } else if (_CSS_UNIT_RE.test(str) || _CSS_LENGTH_FUNCTION_RE.test(str)) {
    res = str
  } else {
    return isBase ? '' : {}
  }

  return isBase ? res : { width: res }
}

interface ThrottleOptions {
  /**
   * 是否在首次调用时立即执行，默认 `true`。
   */
  leading?: boolean
  /**
   * 是否在节流周期结束时执行最后一次调用，默认 `true`。
   */
  trailing?: boolean
}

type ThrottleOptionsInput = boolean | ThrottleOptions

type ThrottledFunction<T extends Func> = ((...args: Parameters<T>) => ReturnType<T> | undefined) & {
  cancel: () => void
  flush: () => ReturnType<T> | undefined
}

const normalizeThrottleOptions = (options: ThrottleOptionsInput = {}) => {
  const normalized = typeof options === 'boolean' ? { leading: options } : options

  return {
    leading: normalized.leading !== false,
    trailing: normalized.trailing !== false,
  }
}

/**
 * 创建节流函数。
 *
 * @param fn 需要节流执行的函数。
 * @param delay 节流间隔，单位毫秒，默认 `1000`。
 * @param options 节流选项。传 `false` 等同于 `{ leading: false }`。
 * @param resultCallback 每次真正执行后触发的结果回调。
 * @returns 带 `cancel()` / `flush()` 方法的节流函数。
 *
 * @example
 * const onResize = throttle(() => {
 *   console.log('resize')
 * }, 300)
 *
 * @example
 * const save = throttle(saveDraft, 1000, { leading: false, trailing: true })
 *
 * @example
 * const track = throttle(trackPosition, 200, { trailing: false }, (result) => {
 *   console.log(result)
 * })
 *
 * track.cancel()
 * track.flush()
 */
export function throttle<T extends Func>(
  fn: T,
  delay = 1000,
  options: ThrottleOptionsInput = {},
  resultCallback?: (result: ReturnType<T>) => void,
): ThrottledFunction<T> {
  const { leading, trailing } = normalizeThrottleOptions(options)
  let timer: ReturnType<typeof setTimeout> | undefined = undefined
  let previous: number | undefined
  let lastArgs: Parameters<T> | undefined
  let lastThis: ThisParameterType<T> | undefined
  let result: ReturnType<T> | undefined

  const cancel = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }

    previous = undefined
    lastArgs = undefined
    lastThis = undefined
  }

  const invoke = () => {
    if (!lastArgs) return result

    previous = Date.now()
    const args = lastArgs
    const context = lastThis

    lastArgs = undefined
    lastThis = undefined
    const nextResult = fn.apply(context, args) as ReturnType<T>
    result = nextResult
    resultCallback?.(nextResult)
    return result
  }

  const flush = () => {
    if (timer) {
      clearTimeout(timer)
      timer = undefined
    }

    return invoke()
  }

  const throttled = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const now = Date.now()

    lastArgs = args
    lastThis = this

    if (previous === undefined) {
      if (leading) {
        return invoke()
      }
      previous = now
    }

    const remaining = delay - (now - previous)

    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer)
        timer = undefined
      }

      return invoke()
    }

    if (!timer && trailing) {
      timer = setTimeout(() => {
        timer = undefined

        if (!leading) {
          previous = undefined
        }

        invoke()
      }, remaining)
    }

    return result
  } as ThrottledFunction<T>

  throttled.cancel = cancel
  throttled.flush = flush

  return throttled
}

/**
 * 统一处理 Promise 或任务函数执行结果。
 *
 * 推荐优先传入函数，这样可以同时捕获同步 `throw` 和异步 `reject`。
 *
 * @param task Promise，或返回值 / Promise 的函数。
 * @param sendLoading 可选的 loading `ref`。
 * @returns 包含 `data` 和 `error` 的结果对象。
 *
 * @example
 * const loading = ref(false)
 * const { data, error } = await tryCatch(() => fetchUserData(), loading)
 *
 * @example
 * const { data, error } = await tryCatch(Promise.resolve({ id: 1 }))
 *
 * @example
 * const { data, error } = await tryCatch(() => {
 *   if (!form.name) throw new Error('请输入名称')
 *   return submitForm(form)
 * })
 */
export function tryCatch<T>(task: Promise<T>, sendLoading?: Ref<boolean> | null): Promise<TryCatchResult<T>>
export function tryCatch<T>(task: () => T | Promise<T>, sendLoading?: Ref<boolean> | null): Promise<TryCatchResult<T>>
export async function tryCatch<T>(
  task: TryCatchTask<T>,
  sendLoading?: Ref<boolean> | null,
): Promise<TryCatchResult<T>> {
  const updateLoading = (value: boolean): void => {
    if (isRef(sendLoading)) {
      sendLoading.value = value
    } else if (sendLoading !== undefined && sendLoading !== null) {
      consola.warn('Cannot modify non-ref sendLoading directly!')
    }
  }

  updateLoading(true)

  try {
    const data = typeof task === 'function' ? await task() : await task
    return { data, error: null }
  } catch (error: any) {
    return { data: null, error }
  } finally {
    updateLoading(false)
  }
}

/**
 * 防抖函数返回值类型。
 */
type DebouncedFunction<T extends Func> = ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) & {
  cancel: () => void
}

/**
 * 创建防抖函数。
 *
 * @param func 需要防抖执行的函数。
 * @param delay 延迟时间，单位毫秒，默认 `500`。
 * @param immediate 是否在第一次调用时立即执行。
 * @param resultCallback 每次真正执行后触发的结果回调。
 * @returns 带 `cancel()` 方法的防抖函数。
 *
 * @example
 * const search = debounce((keyword: string) => {
 *   return keyword.trim()
 * }, 300)
 *
 * await search('sybz')
 *
 * @example
 * const submit = debounce(saveForm, 500, true, (result) => {
 *   console.log(result)
 * })
 *
 * submit.cancel()
 */
export function debounce<T extends Func>(
  func: T,
  delay: number = 500,
  immediate?: boolean,
  resultCallback?: (result: ReturnType<T>) => void,
): DebouncedFunction<T> {
  let timer: null | ReturnType<typeof setTimeout> = null
  let isInvoke = false
  const _debounce = function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    return new Promise((resolve, reject) => {
      if (timer) clearTimeout(timer)
      if (immediate && !isInvoke) {
        try {
          const result = func.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
        } catch (e) {
          reject(e)
        }
        isInvoke = true
      } else {
        timer = setTimeout(() => {
          try {
            const result = func.apply(this, args)
            if (resultCallback) resultCallback(result)
            resolve(result)
          } catch (e) {
            reject(e)
          }
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  } as DebouncedFunction<T>
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    isInvoke = false
    timer = null
  }
  return _debounce
}

/**
 * 打开确认框。
 *
 * 相比直接调用 `ElMessageBox.confirm`，这里额外处理了默认参数、嵌套弹窗挂载点和 `appContext`。
 *
 * @param message 确认框内容，支持字符串、VNode 或渲染函数。
 * @param options MessageBox 配置项。
 * @param appContext 可选的 Vue 应用上下文。
 * @returns `ElMessageBox.confirm` 返回的 Promise。
 *
 * @example
 * await confirm('确定删除吗？')
 *
 * @example
 * await confirm('确认提交？', {
 *   showCancelButton: true,
 *   appendTo: '#dialogRoot',
 * })
 *
 * @example
 * await confirm({
 *   variant: 'delete',
 *   target: '机器之心公众号',
 *   theme: 'shijingshan',
 * })
 */
export function confirm(
  options: ConfirmOptions,
  appContext?: AppContext | null,
): ReturnType<typeof ElMessageBox.confirm>
export function confirm(
  message: ConfirmMessage,
  options?: ConfirmOptions,
  appContext?: AppContext | null,
): ReturnType<typeof ElMessageBox.confirm>
export function confirm(
  messageOrOptions: ConfirmMessage | ConfirmOptions,
  optionsOrAppContext: ConfirmOptions | AppContext | null = null,
  appContext: AppContext | null = null,
) {
  const isOptionsCall = typeof messageOrOptions === 'object' && messageOrOptions !== null && !isVNode(messageOrOptions)
  const options = (isOptionsCall ? messageOrOptions : (optionsOrAppContext ?? {})) as ConfirmOptions
  const message = isOptionsCall ? (options.message ?? '') : (messageOrOptions as ConfirmMessage)
  const argumentAppContext = isOptionsCall ? (optionsOrAppContext as AppContext | null) : appContext
  const {
    message: _message,
    theme = utilsConfig.theme,
    variant = 'default',
    target,
    customClass,
    confirmButtonClass,
    cancelButtonClass,
    appendTo,
    appContext: optionAppContext,
    ...messageBoxOptions
  } = options
  const inputMessage = typeof message === 'function' ? (message as () => VNode)() : message
  const semantic = resolveConfirmSemantic({
    variant,
    target,
    theme,
    title: typeof messageBoxOptions.title === 'string' ? messageBoxOptions.title : undefined,
    confirmButtonText: messageBoxOptions.confirmButtonText,
  })
  const resolvedMessage =
    variant === 'delete' && semantic.hasTarget && !inputMessage
      ? `确认要删除<code type="danger">${_escapeHtml(semantic.target!)}</code>吗？删除后不可恢复。`
      : variant === 'delete' && !inputMessage
        ? semantic.defaultMessage
        : inputMessage
  const resolvedAppendTo = _resolveAppendTarget(appendTo)
  const resolvedAppContext = _resolveAppContext(optionAppContext || argumentAppContext)
  const isChenghuaTheme = theme === 'chenghua'
  const isShijingshanTheme = theme === 'shijingshan'
  const isSybzTheme = theme === 'sybz'

  const mergeOptions = {
    title: semantic.title,
    draggable: true,
    showCancelButton: true,
    cancelButtonText: '取消',
    confirmButtonText: semantic.confirmButtonText,
    dangerouslyUseHTMLString: true,
    ...messageBoxOptions,
    appendTo: resolvedAppendTo,
    appContext: resolvedAppContext,
    customClass: _mergeClassNames(
      's-message-box--selectable-title',
      isChenghuaTheme && CHENGHUA_CONFIRM_BOX_CLASS,
      isShijingshanTheme && SHIJINGSHAN_CONFIRM_BOX_CLASS,
      isSybzTheme && SYBZ_CONFIRM_BOX_CLASS,
      variant !== 'default' && `s-message-box--${variant}`,
      customClass,
    ),
    confirmButtonClass: _mergeClassNames(
      DEFAULT_CONFIRM_BUTTON_CLASS,
      isChenghuaTheme && CHENGHUA_CONFIRM_BUTTON_CLASS,
      isShijingshanTheme && SHIJINGSHAN_CONFIRM_BUTTON_CLASS,
      isSybzTheme && SYBZ_CONFIRM_BUTTON_CLASS,
      confirmButtonClass,
    ),
    cancelButtonClass: _mergeClassNames(
      DEFAULT_CANCEL_BUTTON_CLASS,
      isChenghuaTheme && CHENGHUA_CANCEL_BUTTON_CLASS,
      isShijingshanTheme && SHIJINGSHAN_CANCEL_BUTTON_CLASS,
      isSybzTheme && SYBZ_CANCEL_BUTTON_CLASS,
      cancelButtonClass,
    ),
  }

  const result = ElMessageBox.confirm(resolvedMessage, mergeOptions)
  void nextTick(() => {
    document
      .querySelectorAll<HTMLElement>('.s-message-box--selectable-title .el-message-box__title > span')
      .forEach((title) => {
        if (title.dataset.selectableTitle) return
        title.dataset.selectableTitle = 'true'
        title.addEventListener('mousedown', (event) => event.stopPropagation())
      })
  })
  return result
}

function _escapeHtml(value: string | number) {
  return String(value).replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }
    return entities[character]
  })
}

function _mergeClassNames(...classNames: Array<MessageOptions['customClass'] | null | false>) {
  return normalizeClass(classNames.filter(Boolean))
}

function _resolveAppendTarget(appendTo?: ConfirmAppendTarget) {
  if (typeof document === 'undefined') {
    return appendTo
  }

  if (appendTo instanceof HTMLElement) {
    return appendTo
  }

  if (typeof appendTo === 'string' && appendTo.trim()) {
    const rawSelector = appendTo.trim()

    try {
      const selector =
        rawSelector.startsWith('#') || rawSelector.startsWith('.') || rawSelector.startsWith('[')
          ? rawSelector
          : `#${rawSelector}`

      return document.querySelector<HTMLElement>(selector) || appendTo
    } catch {
      return appendTo
    }
  }

  const overlayList = Array.from(document.querySelectorAll<HTMLElement>('.el-overlay'))
  const dialogOverlay = overlayList
    .filter((item) => {
      if (!item.isConnected || item.style.display === 'none') {
        return false
      }

      const containsDialog = item.querySelector('.el-dialog, .el-drawer')
      const containsMessageBox = item.querySelector('.el-message-box')

      return !!containsDialog && !containsMessageBox
    })
    .at(-1)

  return dialogOverlay || appendTo
}

function _resolveAppContext(appContext: AppContext | null | undefined) {
  if (appContext) {
    return appContext
  }

  const installWithContext = ElMessageBox.install as unknown as { context?: AppContext | null } | undefined
  const messageBoxWithContext = ElMessageBox as typeof ElMessageBox & { _context?: AppContext | null }
  const elementPlusContext = installWithContext?.context || messageBoxWithContext._context || null

  if (typeof document === 'undefined') {
    return elementPlusContext
  }

  return elementPlusContext || _mountedAppContext()
}

/**
 * 从 Vue 的挂载容器上取 appContext。
 * Vue 把实例写在 `__vue_app__`（两个下划线），并给容器加 `data-v-app`；
 * 应用不一定挂在 `#app` 上，所以两个入口都要找。
 */
function _mountedAppContext() {
  const roots = [document.querySelector('#app'), document.querySelector('[data-v-app]')]
  for (const root of roots) {
    const element = root as AppRootElement | null
    const context = element?.__vue_app__?._context ?? element?._vue_app?._context
    if (context) {
      return context
    }
  }
  return null
}

/**
 * 读取根节点上的 CSS 自定义变量。
 *
 * @param propertyName CSS 变量名，例如 `--blue`。
 * @returns CSS 变量的值。
 *
 * @example
 * getVariable('--vp-c-brand-1')
 */
export function getVariable(propertyName: string, fallback = ''): string {
  if (typeof document === 'undefined') {
    return fallback
  }

  const res = getComputedStyle(document.documentElement).getPropertyValue(propertyName).trim()
  return res || fallback
}

declare const __SYBZ_UTILS_BUILD_TIME__: string | undefined

const DEFAULT_BUILD_TIME_FALLBACK = '未注入'

/**
 * 返回当前 @sybz-components/utils 包的构建时间。
 *
 * @returns 构建时间字符串。
 *
 * @example
 * getUtilsBuildTime()
 */
export function getUtilsBuildTime(fallback = DEFAULT_BUILD_TIME_FALLBACK): string {
  if (typeof __SYBZ_UTILS_BUILD_TIME__ === 'string' && __SYBZ_UTILS_BUILD_TIME__) {
    return __SYBZ_UTILS_BUILD_TIME__
  }

  return fallback
}

/**
 * 返回当前 utils 包的构建时间。
 *
 * @returns 构建时间字符串。
 *
 * @example
 * test()
 */
export function test(): string {
  return `build time: ${getUtilsBuildTime()}`
}
