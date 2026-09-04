# @sybz-components/utils 函数参考

优先从 `@sybz-components/utils` 引入已有函数，避免在业务代码里重复实现通用逻辑。

## 常用导入

```ts
import {
  $toast,
  clone,
  configureUtils,
  confirm,
  debounce,
  delay,
  formatBytes,
  formatBytesConvert,
  formatDurationTime,
  formatThousands,
  formatTime,
  formatToFixed,
  isArray,
  isEmpty,
  isFunction,
  isObject,
  isString,
  isUrl,
  merge,
  processWidth,
  resolveConfirmSemantic,
  throttle,
  tryCatch,
  validate,
  validateForm,
  validateTrigger,
} from '@sybz-components/utils'
```

`resolveConfirmSemantic({ variant, target, theme })` 是 `confirm()`、`s-dialog`、`s-popconfirm` 共用的语义解析方法。自定义确认界面需要保持相同标题、正文、按钮和语义 class 时直接复用，不要重新拼装。

## 全局主题

在应用入口配置一次默认主题，后续 `confirm` 和 `$toast` 会自动使用该主题：

```ts
import { configureUtils } from '@sybz-components/utils'

configureUtils({ theme: 'shijingshan' })
```

- `theme`: `default | chenghua | shijingshan`，默认 `default`。
- 单次调用传入的 `theme` 优先级高于全局配置。
- 单次传入 `theme: 'default'` 可关闭该次调用的全局主题。

Vite 构建插件使用独立入口，避免把 Node.js 依赖带入浏览器工具包：

```ts
import { gitCommitLog } from '@sybz-components/utils/gitCommitLog'
import { sybzVitePlugins } from '@sybz-components/utils/vite'
```

## 替换方向

| 原写法                            | 优先替换                                        |
| --------------------------------- | ----------------------------------------------- |
| `ElMessage.success/error/warning` | `$toast`                                        |
| `ElMessageBox.confirm`            | `confirm`                                       |
| `lodash-es/cloneDeep`             | `clone`                                         |
| 手写 `debounce`                   | `debounce`                                      |
| 手写 `throttle`                   | `throttle`                                      |
| 手写空值判断                      | `isEmpty`                                       |
| 手写类型判断                      | `isArray`、`isObject`、`isString`、`isFunction` |
| 手写 URL 判断                     | `isUrl`                                         |
| 手写字节单位转换                  | `formatBytes`、`formatBytesConvert`             |
| 手写千分位、小数处理              | `formatThousands`、`formatToFixed`              |
| 手写宽高单位处理                  | `processWidth`                                  |
| 手写表单校验 Promise              | `validateForm`                                  |
| 手写 Git 提交记录注入             | `gitCommitLog`                                  |
| 重复配置 Vite 开发插件            | `sybzVitePlugins`                               |
| `try/catch + loading` 重复模板    | `tryCatch`                                      |

## 使用规则

- 删除被替换后的 `lodash-es`、`element-plus` 消息类 import。
- 同一文件内同类逻辑要整体替换，不要只改一处。
- 不为简单函数再包一层同名函数，除非业务确实需要统一副作用。
- `processWidth` 可处理数字、字符串长度和值为 `0` 的 padding/width 场景。
- 项目需要查看自身 Git 提交记录时，在 Vite 配置中注册 `gitCommitLog()`；页面打开后默认打印，也可通过 `b()` 再次查看。
- 项目需要 Tailwind CSS v4、代码定位、Git 提交记录或打包时间时，在 Vite 配置中注册 `sybzVitePlugins()`；Vite 会自动扁平化插件数组，无需展开运算符。通过 `tailwind`、`codeInspector`、`gitCommitLog` 和 `buildTime` 配置启用、关闭或定制对应能力。项目自行注册 `@tailwindcss/vite` 时，使用 `sybzVitePlugins({ tailwind: false })`。

## 示例

```ts
import { $toast, confirm, clone, formatTime, isEmpty } from '@sybz-components/utils'

async function remove(row) {
  await confirm('确认删除该数据吗？')
  await api.remove(row.id)
  $toast('删除成功')
}

const copied = clone(detail)
const createdAt = formatTime(detail.createdAt)

if (isEmpty(list)) {
  $toast('暂无数据', 'w')
}
```
