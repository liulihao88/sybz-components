# warning警告组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-warning content="这是基础用法" title="我是title"></s-warning>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-warning content="这是基础用法" title="我是title"></s-warning>`。
warning/base
:::

### 成华主题

:::demo 展示成华主题样式。基础写法：`<s-warning theme="chenghua" title="服务提示" content="已启用成华主题的信息提示，可用于展示普通说明。" />`。
warning/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-warning theme="shijingshan" title="服务提示" content="已启用石景山主题的信息提示，可用于展示普通说明。" />`。
warning/shijingshan/base
:::

### 通常用法

:::demo 展示基础用法。基础写法：`<s-warning content="这是基础用法" title="我是title"></s-warning>`。
warning/usually
:::

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-warning></s-warning>`。插槽：按示例中的插槽名定制内容。
warning/slot
:::

### 高度

:::demo 设置 `height` 后，提示内容会在指定高度内垂直居中。基础写法：`<s-warning content="固定高度提示" height="80px" />`。属性：`height` 类型 `string / number`，支持 CSS 长度值，默认不设置。
warning/height
:::

### 属性

|          属性名          | 说明                                                  | 类型                      | 默认值    |
| :----------------------: | ----------------------------------------------------- | ------------------------- | --------- |
|          title           | 标题内容                                              | string                    | `''`      |
|          theme           | 主题样式，支持 `default` / `chenghua` / `shijingshan` | string                    | `default` |
|           type           | 提示类型，支持 `info/simple/warning/error`            | string                    | `info`    |
|         content          | 显示的正文内容                                        | string                    | -         |
|          width           | 宽度                                                  | string / number           | `100%`    |
|          height          | 高度，设置后内容垂直居中                              | string / number           | -         |
| dangerouslyUseHTMLString | 是否将 `content` 作为 HTML 片段处理                   | boolean                   | `false`   |
|           icon           | 是否显示图标                                          | boolean                   | `true`    |
|           size           | 组件尺寸，支持 `small/default`                        | string                    | `default` |
|          dotted          | 是否使用虚线边框                                      | boolean                   | `false`   |
|       customStyle        | 自定义样式对象                                        | object                    | `{}`      |
|        iconAttrs         | 图标额外属性                                          | object                    | `{}`      |
|           left           | 左侧额外间距，传 `true` 时默认 `8px`                  | boolean / string / number | `false`   |

### Slots

| 插槽名  | 说明           |
| :-----: | -------------- |
| default | 默认正文内容   |
|  title  | 自定义标题内容 |
| content | 自定义正文内容 |
