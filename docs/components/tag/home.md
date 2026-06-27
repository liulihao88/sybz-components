# Tag 标签组件

`s-tag` 基于 Element Plus `el-tag` 封装，支持直接指定标签类型，也支持根据值自动映射标签文案和颜色。适合状态展示、枚举值翻译、表格状态列等场景。

[Element Plus Tag Documentation](https://element-plus.org/zh-CN/component/tag.html)

## Hidden Title {.md-hidden}

<DocBasicUsage code='<STag class="m-r-8" type="primary">默认</STag>' />

## 属性事件插槽简介

<ApiIntro />

### 基础用法

:::demo 基础写法：`<STag class="m-r-8" type="primary">默认</STag>`。属性说明：`type` 示例值：`primary`，类型：`primary` / `success` / `info` / `warning` / `danger`，默认值：未设置；`effect` 示例值：`dark`，类型：`dark` / `light` / `plain`，默认值：`light`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
tag/base
:::

### 成华主题

#### chenghua基础用法

:::demo 基础写法：`<s-tag theme="chenghua" type="primary">运行中</s-tag>`。属性说明：`theme` 示例值：`chenghua`，类型：`''` / `chenghua`，默认值：`''`；`type` 示例值：`primary`，类型：`primary` / `success` / `info` / `warning` / `danger`，默认值：未设置；`effect` 示例值：`dark`，类型：`dark` / `light` / `plain`，默认值：`light`；`closable` 示例值：`true`，类型：boolean，默认值：`false`。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
tag/chenghua/chenghuaBase
:::

#### chenghua映射状态

:::demo 基础写法：`<s-tag v-for="status in serviceStatus" :key="status" theme="chenghua" :value="status" :options="statusOptions" :config="{ label: 'label', value: 'value' }" :primary="['running']" :warning="['pending']" :danger="['error']" :info="['unknown']" />`。属性说明：`v-for` 示例值：`status in serviceStatus`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`theme` 示例值：`chenghua`，类型：`''` / `chenghua`，默认值：`''`；`value` 示例值：`status`，类型：string / number，默认值：未设置；`options` 示例值：`statusOptions`，类型：array，默认值：`[]`；`config` 示例值：`{ label: 'label', value: 'value' }`，类型：`{ label?: string, value?: string }`，默认值：`{}`；`primary` 示例值：`['running']`，类型：boolean / string / number / array，默认值：未设置；`warning` 示例值：`['pending']`，类型：boolean / string / number / array，默认值：未设置；`danger` 示例值：`['error']`，类型：boolean / string / number / array，默认值：未设置。本示例展示成华主题样式，可以直接复制基础写法后按业务替换数据。
tag/chenghua/chenghuaMap
:::

### 值匹配着色

:::demo 基础写法：`<s-tag :primary="[1, 2]" :value="value" :warning="[3, 4]" :danger="[5, 6]" :info="7" width="100" height="100">...</s-tag>`。属性说明：`primary` 示例值：`[1, 2]`，类型：boolean / string / number / array，默认值：未设置；`value` 示例值：`value`，类型：string / number，默认值：未设置；`warning` 示例值：`[3, 4]`，类型：boolean / string / number / array，默认值：未设置；`danger` 示例值：`[5, 6]`，类型：boolean / string / number / array，默认值：未设置；`info` 示例值：`7`，类型：boolean / string / number / array，默认值：未设置；`width` 示例值：`100`，类型：string / number，默认值：未设置；`height` 示例值：`100`，类型：string / number，默认值：未设置。本示例展示值匹配着色配置，可以直接复制基础写法后按业务替换数据。
tag/usually
:::

### options + config 配置

:::demo 基础写法：`<s-tag :primary="['Normal']" :info="['Unknown', 'PowerOff', 'Maintenance']" :warning="['Rebooting', 'Shuttingdown']" :danger="['Issue']" :options="nodeStatus" :config="{ label: 'name', }" :value="value">...</s-tag>`。属性说明：`primary` 示例值：`['Normal']`，类型：boolean / string / number / array，默认值：未设置；`info` 示例值：`['Unknown', 'PowerOff', 'Maintena...`，类型：boolean / string / number / array，默认值：未设置；`warning` 示例值：`['Rebooting', 'Shuttingdown']`，类型：boolean / string / number / array，默认值：未设置；`danger` 示例值：`['Issue']`，类型：boolean / string / number / array，默认值：未设置；`options` 示例值：`nodeStatus`，类型：array，默认值：`[]`；`config` 示例值：`{ label: 'name', }`，类型：`{ label?: string, value?: string }`，默认值：`{}`；`value` 示例值：`value`，类型：string / number，默认值：未设置。本示例展示options + config 配置配置，可以直接复制基础写法后按业务替换数据。
tag/company
:::

### 分组映射数据

:::demo 基础写法：`<STag class="m-r-8" :type="v.type">{{ v.name }}</STag>`。属性说明：`type` 示例值：`v.type`，类型：`primary` / `success` / `info` / `warning` / `danger`，默认值：未设置；`options` 示例值：`map2`，类型：array，默认值：`[]`；`value` 示例值：`row.asyncValue`，类型：string / number，默认值：未设置；`width` 示例值：`100`，类型：string / number，默认值：未设置。本示例展示分组映射数据配置，可以直接复制基础写法后按业务替换数据。
tag/map
:::

### 插槽内容

:::demo 基础写法：`<s-tag>好样的</s-tag>`。属性说明：该示例不需要额外属性，未传属性时使用组件默认值。本示例展示插槽内容定制，可以直接复制基础写法后按业务替换数据。
tag/slot
:::

### 动态切换

:::demo 基础写法：`<s-tag :options="map2" width="100" height="100" :value="value">...</s-tag>`。属性说明：`options` 示例值：`map2`，类型：array，默认值：`[]`；`width` 示例值：`100`，类型：string / number，默认值：未设置；`height` 示例值：`100`，类型：string / number，默认值：未设置；`value` 示例值：`value`，类型：string / number，默认值：未设置。本示例展示动态状态切换，可以直接复制基础写法后按业务替换数据。
tag/async
:::

### 属性

|  属性名   | 说明                                                        | 类型                                                  | 默认值    |
| :-------: | ----------------------------------------------------------- | ----------------------------------------------------- | --------- |
|  `value`  | 当前值；未传默认插槽时会作为标签内容或映射源                | string / number                                       | -         |
|  `type`   | 直接指定标签类型                                            | `primary` / `success` / `info` / `warning` / `danger` | -         |
|  `theme`  | 标签主题，支持 `chenghua`                                   | `''` / `chenghua`                                     | `''`      |
|  `size`   | 标签尺寸                                                    | `''` / `large` / `default` / `small`                  | `''`      |
| `options` | 映射数据源，支持“平铺数组 + config”和“分组映射数组”两种写法 | array                                                 | `[]`      |
| `config`  | 平铺数组模式下的字段映射配置                                | `{ label?: string, value?: string }`                  | `{}`      |
| `primary` | 匹配为主色标签的规则                                        | boolean / string / number / array                     | -         |
|  `info`   | 匹配为信息标签的规则                                        | boolean / string / number / array                     | -         |
| `warning` | 匹配为警告标签的规则                                        | boolean / string / number / array                     | -         |
| `danger`  | 匹配为危险标签的规则                                        | boolean / string / number / array                     | -         |
|  `other`  | 未命中任何规则时的兜底标签类型                              | string                                                | `primary` |
|  `width`  | 标签宽度，会经过 `handleWidthHeight` 处理                   | string / number                                       | -         |
| `height`  | 标签高度，会经过 `handleWidthHeight` 处理                   | string / number                                       | -         |

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

#### 1. 平铺数组 + `config`

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

#### 2. 分组映射数组

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
