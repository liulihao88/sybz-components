# clickOutside外部点击事件组件

## Hidden Title {.md-hidden}

<DocBasicUsage code='<sClickOutside @clickOutside="outer" @mounted="mounted"></sClickOutside>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<sClickOutside @clickOutside="outer" @mounted="mounted">...</sClickOutside>`。该示例不需要额外属性。
clickOutside/base
:::

### 属性

|  属性名   | 说明                             | 类型   | 默认值 |
| :-------: | -------------------------------- | ------ | ------ |
| `options` | 透传给 `onClickOutside` 的配置项 | object | `{}`   |

### 事件

|     事件名     | 说明                   | 回调参数  |
| :------------: | ---------------------- | --------- |
| `clickOutside` | 点击组件外部区域时触发 | `options` |
|   `mounted`    | 组件挂载完成时触发     | `wrapRef` |

### 插槽

|  插槽名   | 说明             |
| :-------: | ---------------- |
| `default` | 被监听的内容区域 |
