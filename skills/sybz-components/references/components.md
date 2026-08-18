# sybz-components 组件参考

用于把 Element Plus 或手写 UI 替换为 `sybz-components`。替换时优先保留业务语义，删除只服务旧组件写法的多余 class、插槽和计算属性。

## 替换方向

| 原写法                                    | 优先替换                  |
| ----------------------------------------- | ------------------------- |
| `el-button`、`button`                     | `s-button`                |
| `el-input`、`input`                       | `s-input`                 |
| `el-input-number`                         | `s-input-number`          |
| `el-select`、手写 `el-option` 循环        | `s-select`                |
| `el-checkbox-group`                       | `s-checkbox`              |
| `el-radio-group`、`el-radio`              | `s-radio`                 |
| `el-switch`                               | `s-switch`                |
| `el-date-picker`、 `日期或时间选择框`     | `s-date-picker`           |
| `el-table`、`el-table-column`、分页组合   | `s-table`                 |
| `el-descriptions`、`el-descriptions-item` | `s-descriptions`          |
| `el-dialog`、`el-drawer`                  | `s-dialog`                |
| `el-empty`                                | `s-empty`                 |
| `el-tooltip`                              | `s-tooltip`               |
| `el-popconfirm`                           | `s-popconfirm`            |
| `el-progress`                             | `s-progress`              |
| `el-tabs`                                 | `s-tabs`                  |
| `el-tag`                                  | `s-tag`                   |
| 页面标题、自定义标题块                    | `s-title`、`s-comp-title` |
| 卡片容器、区域面板                        | `s-card`                  |
| 页面切换标题                              | `s-tabs`                  |
| flex/row 布局包装                         | `s-flex`、`s-row`         |

## 使用规则

- 简单组件只传业务必要属性，不重复传组件默认值。
- 表单、表格优先使用配置化写法，避免继续堆大量模板。
- 只有业务确实需要自定义渲染时才写插槽、`render` 或额外 class。
- 主题场景优先传 `theme="chenghua"` 或 `theme="shijingshan"`。

## 星标组件基础用法

星标组件来自 `skills/star-skill.md` 的组件清单。迁移页面时优先使用这些组件。

### s-button

```vue
<s-button type="primary" icon="plus" content="新增数据">
  新增
</s-button>
```

### s-checkbox

```vue
<script setup lang="ts">
const checkedList = ref([])

const options = [
  { label: '小月月', value: 'xyy' },
  { label: '小鑫鑫', value: 'xxx' },
  { label: '小瑞瑞', value: 'xrr' },
]
</script>

<template>
  <s-checkbox v-model="checkedList" :options="options" />
</template>
```

### s-date-picker

```vue
<script setup lang="ts">
const dateValue = ref('')
</script>

<template>
  <s-date-picker v-model="dateValue" />
</template>
```

### s-descriptions

```vue
<script setup lang="ts">
const options = [
  { label: '名字', value: 'andy' },
  { label: '年龄', value: '18' },
  { label: '身高', value: '1.88' },
]
</script>

<template>
  <s-descriptions :options="options" />
</template>
```

### s-dialog

```vue
<script setup lang="ts">
const isShow = ref(false)
</script>

<template>
  <s-button type="primary" @click="isShow = true">显示弹窗</s-button>
  <s-dialog v-model="isShow" title="基础弹窗" @confirm="confirm">内容</s-dialog>
</template>
```

### s-empty

```vue
<s-empty />
```

### s-input

```vue
<script setup lang="ts">
const name = ref('')
</script>

<template>
  <s-input v-model="name" width="300" placeholder="请输入名称" />
</template>
```

### s-input-number

```vue
<script setup lang="ts">
const count = ref(1)
</script>

<template>
  <s-input-number v-model="count" :min="0" :max="10" />
</template>
```

### s-popconfirm

```vue
<s-popconfirm content="确定删除这条数据吗？" @confirm="remove">
  <s-button type="danger">删除</s-button>
</s-popconfirm>
```

### s-radio

```vue
<script setup lang="ts">
const value = ref(2)

const options = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
]
</script>

<template>
  <s-radio v-model="value" :options="options" show-type="button" />
</template>
```

### s-row

```vue
<s-row :col="6" :gutter="16">
  <div>span 6</div>
  <div>span 6</div>
  <div>span 6</div>
  <div>span 6</div>
</s-row>
```

### s-select

```vue
<script setup lang="ts">
const form = ref({ status: '' })

const statusOptions = [
  { label: '启用', value: 'enabled' },
  { label: '停用', value: 'disabled' },
]
</script>

<template>
  <s-select v-model="form.status" :options="statusOptions" />
</template>
```

多选或自定义字段只保留必要属性：

```vue
<s-select v-model="form.userIds" multiple value="id" label="name" :options="users" />
```

### s-switch

```vue
<script setup lang="ts">
const enabled = ref(false)
</script>

<template>
  <s-switch v-model="enabled" active-text="启用" inactive-text="停用" />
</template>
```

### s-tag

```vue
<s-tag type="primary">默认</s-tag>
<s-tag type="warning">警告</s-tag>
<s-tag type="danger">危险</s-tag>
<s-tag type="info">未知</s-tag>
```

### s-title

```vue
<s-title title="企业经营数据" />
```

### s-tooltip

```vue
<s-tooltip width="120" content="这是一段比较长的提示文本，超出宽度后鼠标移入会显示完整内容。" />
```

### s-warning

```vue
<s-warning title="提示" content="这里展示重要提示内容。" />
<s-warning type="warning" title="警告" content="请确认配置后再提交。" />
<s-warning type="error" title="错误" content="当前操作失败。" />
```

### s-card

```vue
<s-card title="基础信息" shadow="hover" hover-animation>
  <s-descriptions :options="infoOptions" />
</s-card>
```

透明背景直接使用：

```vue
<s-card transparent title="透明区域">
  内容
</s-card>
```

### s-flex

```vue
<s-flex gap="12" align="center">
  <s-button>取消</s-button>
  <s-button type="primary">保存</s-button>
</s-flex>
```

### s-form

```vue
<script setup lang="ts">
import { validate } from '@sybz-components/utils'

const model = ref({
  account: '',
  hobby: [],
})
const formRef = ref()
const rules = {
  account: [validate()],
}

const fieldList = [
  { label: '账号', prop: 'account' },
  { label: '基础信息', type: 'title' },
  {
    label: '爱好',
    prop: 'hobby',
    comp: 's-select',
    rules: [validate('请选择爱好')],
    attrs: {
      multiple: true,
      options: [
        { label: '吉他', value: '0' },
        { label: '看书', value: '1' },
      ],
    },
  },
]

async function submit() {
  await formRef.value.validate()
}
</script>

<template>
  <s-form ref="formRef" :model="model" :field-list="fieldList" :rules="rules" />
  <s-button type="primary" @click="submit">提交</s-button>
</template>
```

复杂布局才写 `column`、`align`、`formItemAttrs`；普通表单保持默认。

### s-tabs

```vue
<script setup lang="ts">
import { ref } from 'vue'
const tabsValue = ref('chenghua')
const navList = [
  {
    label: '成华',
    value: 'chenghua',
  },
  {
    label: '石景山',
    value: 'shijingshan',
  },
]
</script>

<template>
  <div>
    <s-tabs v-model="tabsValue" :options="navList"></s-tabs>
    <div v-if="tabsValue === 'chenghua'">成华内容</div>
    <div v-else>石景山内容</div>
  </div>
</template>
```

### s-table

```vue
<script setup lang="ts">
const total = 32
const tableData = [{ name: '展厅智能体', status: '运行中', createdAt: '2026-07-02' }]

const editRow = ({ row }) => {}
const deleteRow = ({ row }) => {}

const columns = [
  { label: '名称', prop: 'name' },
  { label: '状态', prop: 'status' },
  { label: '创建时间', prop: 'createdAt' },
  {
    label: '操作',
    btns: [
      {
        content: '编辑',
        comp: 's-icon',
        attrs: { name: 'edit', content: '编辑' },
        handler: editRow,
      },
      {
        content: '删除',
        type: 'danger',
        comp: 's-icon',
        attrs: { name: 'delete', content: '删除' },
        reConfirm: true,
        handler: deleteRow,
      },
    ],
  },
]

const pageChange = ({ pageNumber, pageSize }) => {
  console.log(pageNumber, pageSize)
}
</script>

<template>
  <s-table :data="tableData" :columns="columns" :total="total" @page-change="pageChange" />
</template>
```

简单表格不要额外写 `showPage`、`pageSize`、`width="100%"` 这类默认或非必要属性。
