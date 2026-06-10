# 自定义指令

## v-throttle

### 基础用法

:::demo
directives/throttle/base
:::

### 事件修饰符和传参

:::demo
directives/throttle/method
:::

### 输入框中使用

:::demo
directives/throttle/input
:::

### 说明

- `v-throttle` 用于固定时间内只执行一次，适合滚动、拖拽、连续点击等高频场景。
- 指令值必须是函数，例如 `v-throttle="handleClick"`。
- 不传事件修饰符时，普通元素默认监听 `click`，输入框或内部包含 `input` 的组件默认监听 `input`。
- 数字修饰符表示节流间隔，单位毫秒，例如 `v-throttle.3000="handleClick"`。
- 非数字修饰符表示监听事件名，例如 `v-throttle.scroll.1000="handleScroll"`。
- 可以同时监听多个事件，例如 `v-throttle.click.scroll.1000="handleEvent"`。
- 需要传参时可以使用箭头函数，例如 `v-throttle="($event) => handleEvent($event, '保存')"`。
