# 组件选择与迁移

保留业务语义，删除只服务旧写法的 class、插槽、计算属性和 import。API 细节优先检索组件源码、类型与 `docs/components/<name>/home.md`。

## 映射

| 原写法                                                | 使用                                                   |
| ----------------------------------------------------- | ------------------------------------------------------ |
| `button/el-button`                                    | `s-button`                                             |
| `input/el-input`、`el-input-number`                   | `s-input`、`s-input-number`                            |
| `el-select` + `el-option`                             | `s-select :options`                                    |
| checkbox/radio/switch/date-picker                     | `s-checkbox`/`s-radio`/`s-switch`/`s-date-picker`      |
| table + column + pagination                           | `s-table :columns`                                     |
| descriptions + item                                   | `s-descriptions :options`                              |
| dialog/drawer                                         | `s-dialog`                                             |
| empty/image/icon/tooltip/popconfirm/progress/tabs/tag | 对应 `s-*`                                             |
| 标题/卡片/布局                                        | `s-title`、`s-comp-title`、`s-card`、`s-flex`、`s-row` |
| form                                                  | `s-form :field-list`                                   |

星标组件见仓库 `skills/star-skill.md`。主题场景传 `theme="chenghua|shijingshan"`。

## 最小用法

```vue
<s-button type="primary" icon="plus">新增</s-button>
<s-input v-model="name" width="300" />
<s-input-number v-model="count" :min="0" :max="10" />
<s-select v-model="status" :options="statusOptions" />
<s-checkbox v-model="checked" :options="options" />
<s-radio v-model="value" :options="options" show-type="button" />
<s-switch v-model="enabled" active-text="启用" inactive-text="停用" />
<s-date-picker v-model="date" />
<s-descriptions :options="infoOptions" />
<s-empty title="暂无数据" />
<s-image src="tenant/a.png" width="240" height="150" fit="cover" />
<s-tooltip width="120" content="完整提示" />
<s-title title="企业经营数据" />
<s-card title="基础信息"><s-descriptions :options="infoOptions" /></s-card>
<s-flex gap="12" align="center"><s-button>取消</s-button><s-button type="primary">保存</s-button></s-flex>
<s-row :col="6" :gutter="16"><div v-for="item in 4" :key="item" /></s-row>
<s-tabs v-model="tab" :options="tabs" />
```

- `s-select` 自定义字段：`<s-select v-model="ids" multiple value="id" label="name" :options="users" />`。
- `s-image`：public 路径配置 `image.basePath`；assets 路径配置 `createImageResolver(import.meta.glob(...))` 的 `image.resolver`。
- `s-item` 默认有边框；无边框传 `:border="false"`；`border` 接受 CSS 边框，`background` 接受纯色/渐变。
- `s-card` 无背景传 `transparent`。复杂表单才传 `column`、`align`、`formItemAttrs`。
- `s-table` 通常只需 `data/columns/total/@page-change`，不要重复 `showPage`、`pageSize`、`width="100%"`。

## 语义确认

```vue
<s-dialog v-model="visible" title="详情" mode="drawer">内容</s-dialog>
<s-dialog v-model="visible" variant="delete" target="该数据" theme="shijingshan" />
<s-popconfirm variant="delete" target="该数据" @confirm="remove"><s-button type="danger">删除</s-button></s-popconfirm>
```

- `s-dialog` 抽屉用 `mode="drawer"`，不用旧 `type="drawer"`。
- `variant`: `default|delete|warning`（默认 `default`）；`target` 生成标准删除正文。三种确认组件语义应一致。
- 显式标题、正文、按钮文案/类型/attrs 覆盖语义默认值；默认插槽优先于自动正文。

## 配置化示例

```ts
const fieldList = [
  { label: '账号', prop: 'account' },
  {
    label: '爱好',
    prop: 'hobby',
    comp: 's-select',
    rules: [validate('请选择爱好')],
    attrs: { multiple: true, options },
  },
]
const columns = [
  { label: '名称', prop: 'name' },
  {
    label: '操作',
    btns: [
      {
        content: '删除',
        type: 'danger',
        comp: 's-icon',
        attrs: { icon: 'delete', content: '删除' },
        reConfirm: true,
        handler: remove,
      },
    ],
  },
]
```
