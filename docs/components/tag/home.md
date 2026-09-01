# Tag 标签组件

`s-tag` 基于 Element Plus `el-tag` 封装，支持直接指定标签类型，也支持根据值自动映射标签文案和颜色。适合状态展示、枚举值翻译、表格状态列等场景。

[Element Plus Tag Documentation](https://element-plus.org/zh-CN/component/tag.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<STag class="m-r-8" type="primary">默认</STag>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 展示 `type`。基础写法：`<STag class="m-r-8" type="primary">默认</STag>`。属性：`type` 可选 `primary / success / info / warning / danger`，默认值未设置。
tag/base
:::

### 成华主题

#### chenghua基础用法

:::demo 展示chenghua基础用法。基础写法：`<s-tag theme="chenghua" type="primary">运行中</s-tag>`。
tag/chenghua/chenghuaBase
:::

#### chenghua映射状态

:::demo 展示成华主题样式。基础写法：`<s-tag v-for="status in serviceStatus" :key="status" theme="chenghua" :value="status" :options="statusOptions" :config="{ label: 'label', value: 'value' }" :primary="['running']" :warning="['pending']" :danger="['error']" :info="['unknown']" />`。
tag/chenghua/chenghuaMap
:::

### 石景山主题

#### shijingshan基础用法

:::demo 展示石景山基础用法。基础写法：`<s-tag theme="shijingshan" type="primary">运行中</s-tag>`。
tag/shijingshan/shijingshanBase
:::

#### shijingshan映射状态

:::demo 展示石景山主题样式。基础写法：`<s-tag v-for="status in serviceStatus" :key="status" theme="shijingshan" :value="status" :options="statusOptions" :config="{ label: 'label', value: 'value' }" :primary="['running']" :warning="['pending']" :danger="['error']" :info="['unknown']" />`。
tag/shijingshan/shijingshanMap
:::

### 值匹配着色

:::demo 展示值匹配着色配置。基础写法：`<s-tag :primary="[1, 2]" :value="value" :warning="[3, 4]" :danger="[5, 6]" :info="7" width="100" height="100"></s-tag>`。属性：`value` 类型 `string / number / boolean`，默认值按组件配置；`width` 类型 `string / number`，默认值 `''`。
tag/usually
:::

### options + config 配置

:::demo 展示options + config 配置配置。基础写法：`<s-tag :primary="['Normal']" :info="['Unknown', 'PowerOff', 'Maintenance']" :warning="['Rebooting', 'Shuttingdown']" :danger="['Issue']" :options="nodeStatus" :config="{ label: 'name', }" :value="value"></s-tag>`。属性：`options` 类型 `array`，默认值 `[]`；`config` 类型 `object`，默认值 `{}`。
tag/company
:::

### 分组映射数据

:::demo 展示分组映射数据。基础写法：`<STag class="m-r-8" :type="v.type">{{ v.name }}</STag>`。属性：`type` 可选 `primary / success / info / warning / danger`，默认值未设置。
tag/map
:::

### 插槽内容

:::demo 展示插槽内容定制。基础写法：`<s-tag>好样的</s-tag>`。插槽：按示例中的插槽名定制内容。
tag/slot
:::

### 动态切换

:::demo 展示动态状态切换。基础写法：`<s-tag :options="map2" width="100" height="100" :value="value"></s-tag>`。属性：`options` 类型 `array`，默认值 `[]`；`width` 类型 `string / number`，默认值 `''`。
tag/async
:::

### 文本溢出提示

:::demo 标签宽度不足时，文本自动显示省略号，鼠标移入后显示完整内容；文本未溢出时不显示提示，原有逻辑保持不变。基础写法：`<s-tag width="120">这是一段较长的标签文本</s-tag>`。属性：`width` 类型 `string / number`，默认值未设置，数字自动补 `px`；`height` 类型 `string / number`，默认值未设置；默认插槽用于标签文本，默认值为 `value` 或映射后的标签文案。
tag/overflow
:::

### 公共外观属性（hoverAnimation 默认值：false）

:::demo `width / height / color / hoverAnimation` 由公共 Hook 统一处理。基础写法：`<s-tag width="120" height="36" color="#7c3aed" hover-animation>公共属性标签</s-tag>`。属性：`width / height` 类型 `string / number`，默认值 `''`；`color` 类型 `string`，默认值 `''`；`hoverAnimation` 可选值 `true / false`，默认值 `false`。
tag/commonProps
:::

### 属性

|      属性名      | 说明                                                        | 类型                                                  | 默认值    |
| :--------------: | ----------------------------------------------------------- | ----------------------------------------------------- | --------- |
|     `value`      | 当前值；未传默认插槽时会作为标签内容或映射源                | string / number                                       | -         |
|      `type`      | 直接指定标签类型                                            | `primary` / `success` / `info` / `warning` / `danger` | -         |
|     `theme`      | 标签主题，支持 `default` / `chenghua` / `shijingshan`       | `default` / `chenghua` / `shijingshan`                | `default` |
|      `size`      | 标签尺寸                                                    | `''` / `large` / `default` / `small`                  | `''`      |
|    `options`     | 映射数据源，支持“平铺数组 + config”和“分组映射数组”两种写法 | array                                                 | `[]`      |
|     `config`     | 平铺数组模式下的字段映射配置                                | `{ label?: string, value?: string }`                  | `{}`      |
|    `primary`     | 匹配为主色标签的规则                                        | boolean / string / number / array                     | -         |
|      `info`      | 匹配为信息标签的规则                                        | boolean / string / number / array                     | -         |
|    `warning`     | 匹配为警告标签的规则                                        | boolean / string / number / array                     | -         |
|     `danger`     | 匹配为危险标签的规则                                        | boolean / string / number / array                     | -         |
|     `other`      | 未命中任何规则时的兜底标签类型                              | string                                                | `primary` |
|     `width`      | 标签宽度，数字及数字字符串自动按 `px` 处理                  | string / number                                       | -         |
|     `height`     | 标签高度，数字及数字字符串自动按 `px` 处理                  | string / number                                       | -         |
|     `color`      | 标签文字颜色                                                | string                                                | `''`      |
| `hoverAnimation` | 是否启用公共悬停上移动画                                    | boolean                                               | `false`   |

文本超出标签可用宽度时会自动显示省略号，并仅在鼠标移入溢出文本时显示完整内容。`closable` 标签的关闭图标不会被文本挤压。

### 常用透传属性

|   属性名   | 说明             | 类型                          | 默认值    |
| :--------: | ---------------- | ----------------------------- | --------- |
|  `effect`  | 标签主题         | `dark` / `light` / `plain`    | `light`   |
|   `size`   | 标签尺寸         | `large` / `default` / `small` | `default` |
| `closable` | 是否显示关闭按钮 | boolean                       | `false`   |
|  `round`   | 是否使用圆角样式 | boolean                       | `false`   |
|   `hit`    | 是否有描边效果   | boolean                       | `false`   |

### 事件

| 事件名  | 说明                                   |
| :-----: | -------------------------------------- |
| `click` | 点击标签时触发，透传自 `el-tag`        |
| `close` | 关闭标签时触发，需配合 `closable` 使用 |

### 插槽

|  插槽名   | 说明                                                    |
| :-------: | ------------------------------------------------------- |
| `default` | 自定义标签内容；传入后会覆盖默认的 `value`/映射文案展示 |

### options 数据格式

#### 1. 基础值数组

最简单的写法：直接遍历数组，每一项通过 `value` 显示；`value` 类型为 `string / number`，默认值为 `''`。

```vue
<script setup lang="ts">
const options = ['男人', '女人', '太监']
</script>

<template>
  <s-tag v-for="item in options" :key="item" :value="item" />
</template>
```

#### 2. 平铺数组 + `config`

适合后端直接返回普通枚举列表，再配合 `primary/info/warning/danger` 决定颜色。

```ts
const options = [
  { name: '未知', value: 'Unknown' },
  { name: '正常', value: 'Normal' },
  { name: '问题', value: 'Issue' },
]
```

```vue
<s-tag
  :value="row.status"
  :options="options"
  :config="{ label: 'name', value: 'value' }"
  :primary="['Normal']"
  :info="['Unknown']"
  :danger="['Issue']"
/>
```

#### 3. 分组映射数组

适合把“标签文案”和“颜色类型”都直接写在同一份映射里。

```ts
const options = [
  { danger: [{ Issue: '问题' }, { OutOfService: '未激活' }] },
  { warning: [{ Loading: '激活中' }, { Standby: '备用' }] },
  { info: [{ Unknown: '未知' }] },
  { primary: [{ InService: '已激活' }] },
]
```

```vue
<s-tag :value="status" :options="options" />
```

### 颜色使用原则

|  淡蓝色(primary)   | 橙色(warning)                         | 红色(danger)    | 灰色(info)       |
| :----------------: | ------------------------------------- | --------------- | ---------------- |
| 消息/运行中/已激活 | 警告/紧张/停止中/启动中/激活中/停服中 | 错误/问题/ISSUE | 未知/停止/未激活 |

### 说明

- 未传 `options` 时，组件会优先使用 `type`，否则再按 `primary/info/warning/danger` 规则匹配颜色。
- `primary/info/warning/danger` 支持三种常见写法：
  - 传数组：命中某些值时使用对应类型。
  - 传单个值：当前值全等匹配时使用对应类型。
  - 传布尔值：为 `true` 时直接使用对应类型。
- 使用 `options + config` 时，标签文案来自映射项的 `label` 字段，标签颜色来自四种类型规则的匹配结果。
- 使用分组映射数组时，组件会同时从映射中解析标签文案和标签类型。
- 如果没有命中任何类型规则，会回退到 `other`，默认是 `primary`。
