# @sybz-components/utils

直接从工具库引入，不再包装或手写同类逻辑；迁移同一文件内全部同类调用并清理旧 import。

| 原写法                      | 使用                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ElMessage`                 | `$toast`                                                                                                          |
| `ElMessageBox.confirm`      | `confirm`                                                                                                         |
| `cloneDeep`                 | `clone`                                                                                                           |
| 手写防抖/节流/空值/类型/URL | `debounce`/`throttle`/`isEmpty`/`isArray,isObject,isString,isFunction`/`isUrl`                                    |
| 字节/千分位/小数/尺寸/时间  | `formatBytes,formatBytesConvert`/`formatThousands`/`formatToFixed`/`processWidth`/`formatTime,formatDurationTime` |
| 表单校验/try-catch+loading  | `validate,validateForm,validateTrigger`/`tryCatch`                                                                |
| Vite 开发能力/Git 记录      | `sybzVitePlugins`/`gitCommitLog`（独立入口）                                                                      |
| 前端代码统一规范            | `sybzEslintConfig`/`createSybzEslintConfig`/`sybzPrettierConfig`/`sybzLintStagedConfig`（独立入口）               |

另有 `delay`、`merge`、`configureUtils`、`resolveConfirmSemantic`。`processWidth` 支持数字、字符串和 0。

```ts
configureUtils({ theme: 'shijingshan' }) // default|chenghua|shijingshan；单次 theme 优先
await confirm({ variant: 'delete', target: row.name, theme: 'shijingshan' })
$toast('删除成功')
```

- `confirm` 新代码优先对象式；兼容 `confirm(message, options, appContext)`。
- `variant`: `default|delete|warning`；删除/警告自动生成标题、正文、按钮和主题状态，显式值优先。`resolveConfirmSemantic` 供自定义确认 UI 复用，勿重组语义。
- `theme:'default'` 可关闭该次全局主题。
- `import { sybzVitePlugins } from '@sybz-components/utils/vite'`。
- `sybzVitePlugins()` 管理 Tailwind v4、代码定位、Git 记录、构建时间；已有 Tailwind 插件传 `{ tailwind:false }`，插件数组无需展开。
- 代码规范从 `@sybz-components/utils/codeStandard` 导入，不放入 Vite 插件；项目通过一行配置分别复用 ESLint、Prettier 和 lint-staged 预设。
