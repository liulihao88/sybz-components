# s-icon

统一替代 `el-icon + el-tooltip` 和手写容器。新增业务图标优先 `tabler:*`，同页保持同一线性图标集；Logo 可用 `logos:*`。业务无需安装/导入 `@iconify/vue`。

## 来源

| 场景                            | 写法                                                           |
| ------------------------------- | -------------------------------------------------------------- |
| Iconify（默认自动识别英文冒号） | `<s-icon icon="tabler:user" />`                                |
| Element Plus（旧代码可保留）    | `<s-icon icon="delete" />`                                     |
| 项目 SVG                        | `<s-icon icon="custom-name" source="svg" />`                   |
| URL/Emoji/Vue 组件/自定义内容   | `icon="https://…"` / `icon="❌"` / `:icon="Search"` / 默认插槽 |

`source` 默认 `auto`，可强制 `element-plus|iconify|svg|url`；能自动识别时不传。`s-button` 的 `icon/loading-icon/loadingIcon` 使用相同字符串规则。在线 Iconify 首次需访问 API，离线见下文。

## 属性

| 属性                                  | 类型/值                                     | 默认    |
| ------------------------------------- | ------------------------------------------- | ------- |
| `icon`                                | string/Component                            | `''`    |
| `source`                              | auto/element-plus/iconify/svg/url           | auto    |
| `size`                                | string/number（数字补 px）                  | 16px    |
| `color`                               | string；高于 type，禁用态除外               | —       |
| `type`                                | default/primary/success/warning/danger/info | default |
| `variant`                             | plain/light/solid                           | plain   |
| `border-radius`                       | string/number；light/solid 通常 8px         | —       |
| `rotate`                              | number（deg）或角度字符串                   | `''`    |
| `cursor`                              | CSS cursor                                  | pointer |
| `disabled`                            | boolean                                     | false   |
| `shadow`                              | always/never/hover                          | never   |
| `hover-animation`                     | boolean                                     | false   |
| `theme`                               | default/chenghua/shijingshan                | default |
| `content`                             | tooltip 文本                                | `''`    |
| `dangerously-use-html-string`         | 仅可信 tooltip HTML                         | false   |
| `iconify-attrs/svg-attrs/image-attrs` | 对应底层 attrs                              | `{}`    |

Tooltip 的 placement/effect/show-after 等属性可直接透传。事件为 `click(event)`；disabled 时不触发。状态色用 `type`，品牌特例才用 `color`；solid 默认白色前景（显式 color 可覆盖）；多色 `logos:*` 通常不跟随 color。

```vue
<s-icon icon="tabler:edit" type="primary" variant="light" content="编辑" @click="edit" />
<s-icon icon="tabler:trash" type="danger" variant="solid" border-radius="6" content="删除" @click="remove" />
<s-icon icon="tabler:refresh" :rotate="90" shadow="hover" hover-animation />
```

## 离线与配置化

```ts
import { addIconifyCollection, addIconifyIcon } from 'sybz-components'
addIconifyIcon('project:rocket', { width: 24, height: 24, body: '<path fill="currentColor" d="…" />' })
addIconifyCollection({ prefix: 'project', width: 24, height: 24, icons: { home: { body: '<path … />' } } })

const columns = [
  {
    label: '状态',
    prop: 'status',
    comp: 's-icon',
    attrs: { icon: 'tabler:circle-check', type: 'success', content: '正常' },
  },
]
```

只有属性依赖当前行且配置回调无法表达时才用插槽/render。迁移后删除图标 import、tooltip 包装、旧 class/style；颜色→`type`，背景/padding/圆角→`variant`/`border-radius`，禁用→`disabled`。不显示时依次检查名称英文冒号/存在性、API 或离线注册、disabled、多色图标、非空 content。
