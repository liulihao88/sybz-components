# http 请求工具

## Hidden Title {.md-hidden}

<DocBasicUsage code="http.get('/api/users')" />

### 基础用法

:::demo
utils/http/base
:::

### 说明

`http` 是基于 Axios 的请求封装，默认返回响应体数据，并统一处理业务失败和网络错误。也可以使用 `createHttp` 创建带有 `baseURL`、请求头、错误提示和响应转换配置的客户端。

### 调用形式

```ts
http(url, params?, config?)
http.send(config)
http.get(url, params?, config?)
http.post(url, data?, config?)
http.put(url, data?, config?)
http.patch(url, data?, config?)
http.delete(url, config?)
http.download(url, params?, config?)
createHttp(options?)
```

### 常用参数

| 参数      | 类型                | 默认值 | 说明                                                 |
| --------- | ------------------- | ------ | ---------------------------------------------------- |
| `url`     | `string`            | -      | 请求地址。                                           |
| `params`  | `unknown`           | -      | GET、下载请求的查询参数。                            |
| `data`    | `unknown`           | -      | POST、PUT、PATCH 请求体。                            |
| `config`  | `HttpRequestConfig` | `{}`   | Axios 请求配置；`rawResponse: true` 时返回完整响应。 |
| `options` | `CreateHttpOptions` | `{}`   | `createHttp` 的 Axios 默认配置及业务处理配置。       |

### createHttp 配置

| 配置项                  | 类型                            | 默认值                            | 说明                            |
| ----------------------- | ------------------------------- | --------------------------------- | ------------------------------- |
| `isBusinessSuccess`     | `(data, response) => boolean`   | `data.success !== false`          | 返回 `false` 时视为业务失败。   |
| `getBusinessMessage`    | `(data, fallback) => string`    | 读取 `detail`、`error`、`message` | 提取业务错误文案。              |
| `transformResponseData` | `(data, response) => unknown`   | 未设置                            | 统一转换响应体。                |
| `showErrorToast`        | `boolean`                       | `false`                           | 是否自动调用 `toast` 提示错误。 |
| `toast`                 | `(message: string) => void`     | 未设置                            | 错误提示函数。                  |
| `normalizeError`        | `(error: unknown) => HttpError` | 内置转换                          | 自定义错误转换。                |

### 常用场景

```ts
import { createHttp, http, type HttpError } from '@sybz-components/utils'

const users = await http.get<User[]>('/api/users', { page: 1 })
await http.post('/api/users', { name: '张三' })

const response = await http.send<{ id: number }>({
  url: '/api/users/1',
  method: 'GET',
  rawResponse: true,
})
console.log(response.status, response.data)

const client = createHttp({
  baseURL: '/api',
  showErrorToast: true,
  toast: (message) => console.error(message),
  transformResponseData: (data) => (data as { data: unknown }).data,
})

try {
  await client.delete('/users/1')
} catch (error) {
  const requestError = error as HttpError
  console.log(requestError.status, requestError.message)
}

const file = await http.download('/api/export', { type: 'xlsx' })
```

### 返回值

普通请求返回响应体数据；`rawResponse: true` 返回 Axios `AxiosResponse`；`download` 返回 `Blob`。请求失败时抛出 `HttpError`，包含 `status`、`code`、`data` 和 `cause`。

:::utils-source http
:::
