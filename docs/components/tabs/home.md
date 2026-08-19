# tabs切换组件

[Element Plus Tabs Documentation](https://element-plus.org/zh-CN/component/tabs.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-tabs :options="navList"></s-tabs>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示基础用法。基础写法：`<s-tabs :options="navList"></s-tabs>`。属性：`options` 类型 `array`，默认值 `[]`。
tabs/base
:::

### chenghua主题

:::demo 展示成华主题样式。基础写法：`<s-tabs :options="navList" theme="chenghua"></s-tabs>`。
tabs/chenghua/base
:::

### 石景山主题

:::demo 展示石景山主题样式。基础写法：`<s-tabs :options="navList" theme="shijingshan"></s-tabs>`。
tabs/shijingshan/base
:::

### 尺寸

:::demo 展示尺寸配置。基础写法：`<s-tabs :options="navList" size="small"></s-tabs>`。属性：`size` 可选 `'' / small / default / large`，默认值 `default`。
tabs/size
:::

### 胶囊类型

:::demo 展示胶囊类型切换，激活胶囊会从当前项平滑滑动到目标项。基础写法：`<s-tabs v-model="defaultActiveTab" :options="navList" type="capsule"></s-tabs>`。属性：`type` 可选 `'' / capsule / card / border-card`，默认值 `''`；`size` 可选 `small / default / large`，默认值 `default`。
tabs/capsule
:::

### 胶囊类型内容过多

:::demo 当胶囊页签内容超过容器宽度时，会自动显示左右箭头；箭头支持 hover 状态，并保留激活项的平滑滑动效果。基础写法：`<s-tabs type="capsule" :options="options" />`。属性：`type` 可选值 `capsule`；`options` 类型 `array`，默认值 `[]`。
tabs/capsuleOverflow
:::

### 通常用法

:::demo 展示通常用法配置。基础写法：`<s-tabs :options="navList" v-model="navName" @tabChange="tabChange"></s-tabs>`。属性：`options` 类型 `array`，默认值 `[]`。
tabs/usually
:::

### Slots

:::demo 展示插槽内容定制。基础写法：`<s-tabs :options="navList"></s-tabs>`。插槽：按示例中的插槽名定制内容。
tabs/slot
:::

### Trigger `click|hover`

:::demo 展示触发方式。基础写法：`<s-tabs :options="navList" trigger="hover" v-model="navValue"></s-tabs>`。属性：`trigger` 可选 `click / hover`，默认值 `click`。
tabs/trigger
:::

### children `支持嵌套 el-tab-pane`

:::demo 展示children `支持嵌套 el-tab-pane`配置。基础写法：`<s-tabs v-model="activeName" class="demo-tabs" default-value="third" @tab-click="handleClick" :options="tabs"></s-tabs>`。属性：`options` 类型 `array`，默认值 `[]`。
tabs/children
:::

### other

:::demo 展示 Element Plus Tabs 属性透传。基础写法：`<s-tabs :options="navList" :type="type" :stretch="stretch"></s-tabs>`。属性：`type`、`stretch` 等继承 `el-tabs`。
tabs/other
:::

### addRemove

:::demo 展示动态增删页签。基础写法：`<s-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab"></s-tabs>`。属性：`closable` 可选 `true / false`，默认值按 Element Plus Tabs 配置。
tabs/addRemove
:::

### 位置

可以通过 tab-position 设置标签的位置

标签一共有四个方向的设置 tabPosition="left|right|top|bottom"

:::demo 展示位置配置。基础写法：`<s-tabs :options="navList" :tab-position="tabPosition"></s-tabs>`。属性：`options` 类型 `array`，默认值 `[]`。
tabs/location
:::

### 属性

|    属性名    | 说明                                                                        | 类型                                   | 默认值                             |
| :----------: | --------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------- |
| `modelValue` | 当前激活 tab                                                                | string / number / boolean              | -                                  |
|  `options`   | 标签页配置                                                                  | array                                  | `[]`                               |
|   `label`    | 标签标题字段名                                                              | string                                 | `label`                            |
|   `value`    | 标签值字段名                                                                | string                                 | `value`                            |
|  `subAttrs`  | 透传给 `el-tab-pane` 的属性                                                 | object                                 | `{}`                               |
|  `trigger`   | 切换触发方式，支持 `click` / `hover`                                        | string                                 | `click`                            |
|    `type`    | 标签类型，支持 `capsule` 和 Element Plus 原生 `card` / `border-card` 等类型 | string                                 | 按内部组件或 Element Plus 对应属性 |
|   `theme`    | 主题样式，支持 `default` / `chenghua` / `shijingshan`                       | `default` / `chenghua` / `shijingshan` | `default`                          |
|    `size`    | 尺寸，支持 `small` / `default` / `large`                                    | string                                 | `default`                          |
|   `width`    | 组件宽度，数字按 px 处理                                                    | string / number                        | `''`                               |

### 事件

|       事件名        | 说明                    |
| :-----------------: | ----------------------- |
| `update:modelValue` | 当前激活 tab 变化时触发 |

### 插槽

|      插槽名      | 说明                                   |
| :--------------: | -------------------------------------- |
|    `default`     | 自定义整个 tabs 内容                   |
|    `${value}`    | 自定义每个 tab-pane 内容，名称为选项值 |
| `${value}-label` | 自定义每个 tab 标题区域                |
