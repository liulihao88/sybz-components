# 容量单位组件

## Hidden Title {.md-hidden}

### 基础用法

:::demo 基础写法：`<SQuotaUnit v-model="form.quota" v-model:unit="form.unit" :validator="validateQuota">...</SQuotaUnit>`。属性说明：`v-model` 示例值：`form.quota`，类型由绑定值决定，默认值由绑定变量初始值决定；`v-model:unit` 示例值：`form.unit`，类型/可选值/默认值按内部组件或 Element Plus 对应属性；`validator` 示例值：`validateQuota`，类型/可选值/默认值按内部组件或 Element Plus 对应属性。本示例展示基础渲染和最小配置，可以直接复制基础写法后按业务替换数据。
company/quotaUnit/base
:::

### form用法

:::demo 基础写法：`<s-basic-layout class="h-block">...</s-basic-layout>`。属性说明：`title` 示例值：`metaTitle`，类型：string，默认值：`""`。本示例展示表单场景，可以直接复制基础写法后按业务替换数据。
company/quotaUnit/form
:::

### 说明

- 用于在容量数值和单位之间做统一展示或输入处理。
