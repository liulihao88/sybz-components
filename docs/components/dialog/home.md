# dialog(弹出框)组件

[https://element-plus.org/zh-CN/component/dialog.html](https://element-plus.org/zh-CN/component/dialog.html)

## Hidden Title {.md-hidden}

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<s-dialog title="基础dialog" v-model="isShow">内容</s-dialog>`。属性说明：`title` 示例值：`基础dialog`，类型：string，默认值：`""`；`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
dialog/base
:::

### 抽屉式用法

设置 `type="drawer"` 时，`s-dialog` 会按抽屉方式展示。`type` 的可选值是 `''` 和 `drawer`，默认值是 `''`。设置 `width` 可以控制抽屉宽度，`width` 支持 `string` 和 `number`，默认值是 `''`。

:::demo 基础写法：`<s-dialog v-model="isShow" title="抽屉式 dialog" type="drawer" width="1200">...</s-dialog>`。属性说明：`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`抽屉式 dialog`，类型：string，默认值：`""`；`type` 示例值：`drawer`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`width` 示例值：`1200`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示抽屉式用法配置，可以直接复制基础写法后按业务替换数据。
dialog/drawer
:::

#### drawer 配合 fillSlot

`fillSlot` 的可选值是 `true` 和 `false`，默认值是 `false`。

:::demo 基础写法：`<s-dialog title="基础dialog" v-model="isShow" fillSlot type="drawer">...</s-dialog>`。属性说明：`title` 示例值：`基础dialog`，类型：string，默认值：`""`；`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定；`fillSlot` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`type` 示例值：`drawer`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
dialog/drawerFillSlot
:::

### 成华样式

设置 `theme="chenghua"` 可以切换到成华样式。成华主题默认展示底部按钮，和普通 dialog 行为一致。

#### chenghua主题示例

:::demo 基础写法：`<s-dialog title="默认成华弹框" theme="chenghua" width="512px" v-model="visible.base">...</s-dialog>`。属性说明：`title` 示例值：`默认成华弹框`，类型：string，默认值：`""`；`theme` 示例值：`chenghua`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`width` 示例值：`512px`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`v-model` 示例值：`visible.base`，类型由绑定值决定，默认值由绑定变量初始值决定；`show-footer` 示例值：`false`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`cancel-text` 示例值：`暂不处理`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`confirm-text` 示例值：`立即提交`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`cancel-attrs` 示例值：`{ width: 96, height: 40 }`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
dialog/chenghua/base
:::

#### chenghua 抽屉式用法

设置 `theme="chenghua"` 和 `type="drawer"` 时，`s-dialog` 会按成华主题的抽屉式弹层展示。`theme` 的可选值是 `''` 和 `chenghua`，默认值是 `''`；`type` 的可选值是 `''` 和 `drawer`，默认值是 `''`；`width` 支持 `string` 和 `number`，默认值是 `''`，可用于控制抽屉宽度。

:::demo 基础写法：`<s-dialog v-model="visible" title="成华抽屉式 dialog" theme="chenghua" type="drawer" width="1000" confirm-text="保存" cancel-text="关闭">...</s-dialog>`。属性说明：`v-model` 示例值：`visible`，类型由绑定值决定，默认值由绑定变量初始值决定；`title` 示例值：`成华抽屉式 dialog`，类型：string，默认值：`""`；`theme` 示例值：`chenghua`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`type` 示例值：`drawer`，类型：string，可选值：`primary` / `success` / `warning` / `danger` / `info` / `text`，默认值：`default` 或 `""`；`width` 示例值：`1000`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`confirm-text` 示例值：`保存`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`cancel-text` 示例值：`关闭`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
dialog/chenghua/drawer
:::

### 通常用法

:::demo 基础写法：`<s-dialog ref="dialogRef" title="常用的dialog" @confirm="cusConfirm" width="100%" :closeOnClickModal="false" :confirmAttrs="{ loading: confirmLoading, }" confirmText="保存" v-model="isShow" @cancel="proxy.$toast('哈哈')" cancelText="高级配置" :cancelAttrs="{ type: 'primary', icon: 'el-icon-edit', }">...</s-dialog>`。属性说明：`title` 示例值：`常用的dialog`，类型：string，默认值：`""`；`width` 示例值：`100%`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`closeOnClickModal` 示例值：`false`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`confirmAttrs` 示例值：`{ loading: confirmLoading, }`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`confirmText` 示例值：`保存`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定；`cancelText` 示例值：`高级配置`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`cancelAttrs` 示例值：`{ type: 'primary', icon: 'el-icon...`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示通常用法配置，可以直接复制基础写法后按业务替换数据。
dialog/usually
:::

### 插槽

:::demo 基础写法：`<s-dialog title="基础dialog" v-model="isShow">...</s-dialog>`。属性说明：`title` 示例值：`基础dialog`，类型：string，默认值：`""`；`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
dialog/slot
:::

### 全屏

:::demo 基础写法：`<s-dialog title="基础dialog" v-model="isShow" fullscreen>...</s-dialog>`。属性说明：`title` 示例值：`基础dialog`，类型：string，默认值：`""`；`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定；`fullscreen` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示全屏配置，可以直接复制基础写法后按业务替换数据。
dialog/fullscreen
:::

### 弹框form表单

:::demo 基础写法：`<s-dialog ref="dialogRef" title="弹框form表单" v-model="isShow" @confirm="confirm">...</s-dialog>`。属性说明：`title` 示例值：`弹框form表单`，类型：string，默认值：`""`；`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定。本示例展示表单场景，可以直接复制基础写法后按业务替换数据。
dialog/dialogForm
:::

### 自动给确认按钮加loading

dialog组件如果把@confirm换成:confirm, 那么子组件会优先处理属性confirm, 如果属性confirm是一个异步请求, 会加载loading;
注意: 如果点击后确认按钮一致有loading, 那说明返回的不是promise

:::demo 基础写法：`<s-dialog v-model="isShow" :confirm="confirm">...</s-dialog>`。属性说明：`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定；`confirm` 示例值：`confirm`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示自动给确认按钮加loading配置，可以直接复制基础写法后按业务替换数据。
dialog/confirmLoading
:::

### 内部高度占满100%: fillSlot

:::demo 基础写法：`<s-dialog title="基础dialog" v-model="isShow" fillSlot>...</s-dialog>`。属性说明：`title` 示例值：`基础dialog`，类型：string，默认值：`""`；`v-model` 示例值：`isShow`，类型由绑定值决定，默认值由绑定变量初始值决定；`fillSlot` 示例值：`true`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
dialog/fillSlot
:::

### 全局默认配置

dialog 支持在 `app.use` 的第二个参数里配置全局默认值，写法和 Element Plus 的全局配置保持一致。

```js
app.use(SybzComponents, {
  theme: 'chenghua',
  dialog: {
    hideHeaderIcon: true,
  },
})
```


### 属性

|      属性名       | 说明                                                                                    | 类型                                          | 默认值 |
| :---------------: | --------------------------------------------------------------------------------------- | --------------------------------------------- | ------ |
|       title       | 顶部title                                                                               | string                                        | 提示   |
|       width       | 弹框宽度；当 `type="drawer"` 时用于控制抽屉宽度                                       | string / number                               | ''     |
|       theme       | 弹框样式，可选 `chenghua`                                                               | string                                        | -      |
|       type        | 弹框类型，可选 `drawer`                                                                 | string                                        | ''     |
|  hideHeaderIcon   | 是否隐藏顶部默认icon                                                                    | boolean                                       | false  |
|    cancelText     | 取消按钮文本                                                                            | string                                        | 取消   |
|    confirmText    | 确认按钮文本                                                                            | string                                        | 确认   |
|      footer       | 是否显示底部操作按钮                                                                    | object                                        | -      |
|    showFooter     | 是否显示底部操作按钮                                                                    | boolean                                       | true   |
|    showCancel     | 是否显示取消按钮                                                                        | boolean <s-tip content="true\|false"></s-tip> | true   |
|    showConfirm    | 是否显示确认按钮                                                                        | boolean                                       | true   |
|   confirmAttrs    | 确认按钮的属性                                                                          | object                                        | {}     |
|    cancleAttrs    | 取消按钮的属性                                                                          | object                                        | {}     |
| destroy-on-close  | 当关闭 Dialog 时，销毁其中的元素                                                        | boolean                                       | false  |
|    fullscreen     | 是否为全屏Dialog                                                                        | boolean                                       | false  |
|   enableConfirm   | 是否允许使用enter回车键执行confirm事件                                                  | boolean                                       | true   |
| closeOnClickModal | 是否允许点击模态框关闭弹框                                                              | boolean                                       | true   |
|      confirm      | 绑定确认按钮的方法, 与方法的区别是, 可以使用属性绑定异步事件而直接让确认按钮加载loading | Function                                      | -      |
|     fillSlot      | 是否让默认slot内容区撑满dialog body高度, 并由slot内部自行处理滚动                       | boolean                                       | false  |

### 方法

| 属性名  | 说明           | 类型     |
| :-----: | -------------- | -------- |
| cancel  | 取消按钮的方法 | Function |
| confirm | 确认按钮的方法 | Function |

### Slots

|   插槽名   | 说明                                                   |
| :--------: | ------------------------------------------------------ |
|   header   | 对话框标题内容区；只替换标题文字区域，默认 icon 仍保留 |
| headerIcon | 对话框标题左侧 icon 内容                               |
|   footer   | Dialog 按钮操作区的内容                                |
