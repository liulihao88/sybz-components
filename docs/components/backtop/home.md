# Backtop 回到顶部

`s-backtop` 使用原生 `div` 实现，滚动超过指定高度后出现，点击后在指定时长内回到顶部。

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-backtop />' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法（`visibilityHeight` 默认值：`200`）

:::demo 基础写法：在可滚动页面放置 `<s-backtop />`，滚动超过 `200px` 后显示，点击后回到页面顶部。`visibilityHeight` 可设置为非负数字，默认 `200`。
backtop/base
:::

### 悬停提示与立即返回（`duration` 默认值：`500`，示例值：`0`）

:::demo 基础写法：`<s-backtop :duration="0" :visibility-height="0">...</s-backtop>`。示例通过 `el-tooltip` 在鼠标移入时提示“回到顶部”，点击立即返回页面顶部。`duration` 为非负毫秒数，默认 `500`，`0` 表示立即跳转；`visibilityHeight` 默认 `200`，此处设为 `0` 方便直接查看效果。
backtop/hover
:::

### 属性与自定义内容

:::demo 基础写法：`<s-backtop target=".demo-scroll" :visibility-height="100" :duration="500">顶部</s-backtop>`。在同一个示例中切换 `target`（默认页面，也可传 CSS 选择器）、`visibilityHeight`（非负数字，默认 `200`）、`right`（数字像素，默认 `40`）、`bottom`（数字像素，默认 `40`）、`duration`（非负毫秒数，默认 `500`，`0` 立即跳转）；默认插槽可自定义按钮内容，`click` 事件返回 `MouseEvent`。
backtop/other
:::

### API

| 属性               | 说明                             | 类型 / 可选值     | 默认值 |
| ------------------ | -------------------------------- | ----------------- | ------ |
| `target`           | 滚动容器的 CSS 选择器            | string            | 页面   |
| `visibilityHeight` | 滚动达到该高度时显示             | 非负 number，像素 | `200`  |
| `right`            | 距离视口右侧的距离               | number，像素      | `40`   |
| `bottom`           | 距离视口底部的距离               | number，像素      | `40`   |
| `duration`         | 回到顶部的动画时间，`0` 立即跳转 | 非负 number，毫秒 | `500`  |

### 事件

| 事件    | 参数         | 说明                   |
| ------- | ------------ | ---------------------- |
| `click` | `MouseEvent` | 点击回到顶部按钮时触发 |

### 插槽

| 插槽      | 说明                             |
| --------- | -------------------------------- |
| `default` | 自定义按钮内容，默认显示向上箭头 |
