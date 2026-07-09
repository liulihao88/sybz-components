# icon图标

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-icon name="delete"></s-icon>' />

## 属性事件插槽简介

<ApiIntro />

[Element Plus Icon Documentation](https://element-plus.org/zh-CN/component/icon.html)

### 基础用法

:::demo 展示基础用法。基础写法：`<s-icon name="delete">...</s-icon>`。属性：`name` 类型 `string`，默认值未设置；`content` 类型 `string`，默认值 `''`；`dangerouslyUseHTMLString` 可选 `true / false`，默认值 `false`。
icon/base
:::

### 插槽

:::demo 展示插槽内容定制。基础写法：`<s-icon>...</s-icon>`。插槽：按示例中的插槽名定制内容。
icon/slot
:::

### 常用图标查找

:::demo 展示图标按钮配置。基础写法：`<s-icon :name="v.value" color="var(--blue)">...</s-icon>`。属性：`icon` 类型 `string / Component`，默认值未设置。
icon/usually
:::

### 所有图标

:::demo 展示图标按钮。基础写法：`<s-icon :name="iconName" class="item">...</s-icon>`。属性：`name` 类型 `string`，默认值未设置。
icon/all
:::

### 属性

|           属性名           | 说明                                           | 类型            | 默认值  |
| :------------------------: | ---------------------------------------------- | --------------- | ------- |
|           `name`           | 图标名称                                       | string          | -       |
|          `color`           | 图标颜色                                       | string          | -       |
|           `size`           | 图标尺寸                                       | string / number | `16px`  |
|         `disabled`         | 是否禁用，禁用后不会触发点击                   | boolean         | `false` |
|           `type`           | 图标类型，传 `svg` 时走 `s-svg` 渲染           | string          | `''`    |
|         `svgAttrs`         | 透传给 `s-svg` 的属性                          | object          | `{}`    |
| `dangerouslyUseHTMLString` | 是否将 tooltip 的 `content` 按 HTML 字符串渲染 | boolean         | `false` |

### 事件

| 事件名  | 说明           | 回调参数 |
| :-----: | -------------- | -------- |
| `click` | 点击图标时触发 | `event`  |

### 说明

- 组件底层使用 `el-icon`，tooltip 相关属性如 `content`、`placement`、`effect` 可直接透传。
