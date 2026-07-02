# validate用法

## Hidden Title {.md-hidden}

<DocBasicUsage code='validate()' />

### 基础用法

:::demo
utils/validate/base
:::

### 结合sForm组件

:::demo
utils/validate/sForm
:::

### 高阶用法

:::demo
utils/validate/same
:::

### 不触发校验

:::demo `validateOnSubmit` 只有提交或手动调用表单校验时触发校验；`validate-on-rule-change` 用来控制 rules 属性改变后是否立即触发一次验证，默认 `true`，可设为 `false`。
utils/validate/noValid
:::

### 提交时校验

:::demo `validate` 默认会在 `change` 和 `blur` 时触发校验；如果只希望提交或手动调用表单校验时触发，可以使用 `validateOnSubmit`。
utils/validate/validateOnSubmit
:::

### 说明

`validate` 用于生成 Element Plus 表单校验规则，也可以在 `pureValid=true` 时直接返回布尔校验结果。它内置常见校验类型，适合统一维护表单必填、手机号、邮箱、IP、端口、长度、范围、自定义正则等规则。

### 调用形式

```ts
validate()
validate(type)
validate(type, rules)
validate(type, value, true)
validate('custom', { value, reg }, true)
validate({ type, ...rules })
validateOnSubmit(type, rules)
```

### 参数说明

| 参数        | 类型                                                         | 必填 | 默认值       | 说明                                                                                                      |
| ----------- | ------------------------------------------------------------ | ---- | ------------ | --------------------------------------------------------------------------------------------------------- |
| `type`      | `string \| object`                                           | 否   | `'required'` | 校验类型或规则对象。如果不是内置字符串类型，会把 `type` 当成错误提示文案，返回必填规则。                  |
| `rules`     | `object \| string \| number \| boolean \| null \| undefined` | 否   | `{}`         | 校验配置。`type` 是对象时，此参数作为 `pureValid` 使用；`pureValid=true` 时，部分类型会把它当成待校验值。 |
| `pureValid` | `boolean`                                                    | 否   | `false`      | 是否直接执行校验并返回布尔值。默认返回 Element Plus 规则对象。                                            |

`rules` 常用字段：

| 字段       | 类型                        | 默认值               | 说明                                            |
| ---------- | --------------------------- | -------------------- | ----------------------------------------------- |
| `message`  | `string`                    | 内置提示             | 校验失败提示文案。                              |
| `min`      | `number`                    | -                    | `between` 的最小值，或 `length` 的最小长度。    |
| `max`      | `number`                    | -                    | `between` 的最大值，或 `length` 的最大长度。    |
| `value`    | `any`                       | -                    | `same` 对比值，或 `custom` 纯校验时的待校验值。 |
| `reg`      | `RegExp`                    | -                    | `custom` 自定义正则。                           |
| `required` | `boolean`                   | `true`               | 是否必填。                                      |
| `trigger`  | `Array<'blur' \| 'change'>` | `['blur', 'change']` | Element Plus 表单触发时机。                     |

### 内置类型

| 类型                  | 作用                                      |
| --------------------- | ----------------------------------------- |
| `required`            | 必填校验。                                |
| `change`              | 选择类必填校验，默认提示文案为 `请选择`。 |
| `password`            | 只能包含英文、数字、下划线、中划线。      |
| `number` / `positive` | 正整数。                                  |
| `zeroPositive`        | 非负整数，包含 `0`。                      |
| `integer`             | 整数，包含负数和 `0`。                    |
| `decimal`             | 非负数字，最多 2 位小数。                 |
| `mobile`              | 11 位手机号。                             |
| `email`               | 邮箱格式。                                |
| `ip`                  | IPv4 地址。                               |
| `port`                | `1-65535` 端口号。                        |
| `between`             | 数值范围校验，配合 `min`、`max`。         |
| `length`              | 字符长度校验，配合 `min`、`max`。         |
| `same`                | 和 `rules.value` 保持一致。               |
| `custom`              | 使用 `rules.reg` 自定义正则。             |

### 返回值

`pureValid=false` 时返回 Element Plus 表单规则对象；`pureValid=true` 时返回 `boolean`。校验规则对象可直接放入 `el-form` 或 `s-form` 的 `rules` 中。

### 常用场景

```ts
rules: {
  name: [validate()],
  category: [validate('change')],
  phone: [validate('mobile', { message: '请输入手机号' })],
  email: [validate({ type: 'email', message: '请输入邮箱' })],
  age: [validate('between', { min: 1, max: 120 })],
  confirmPwd: [validate('same', { value: form.password })],
  submitOnly: [validateOnSubmit()],
}

validate('ip', '192.168.1.1', true)
// true

validate('custom', { value: '22.1', reg: /^\d+\.?\d{0,2}$/ }, true)
// true
```

### `validateOnSubmit`

`validateOnSubmit(type, rules, pureValid)` 是 `validate` 的快捷包装，会默认合并 `trigger: []`。适合只希望提交或手动调用表单校验时触发的场景。

旧的 `validateTrigger` 仍保留为兼容别名，新代码建议使用 `validateOnSubmit`。

### 注意事项

`same` 依赖传入时的 `rules.value`，如果对比值来自响应式表单，通常需要用 `computed` 重新生成规则，确保拿到最新值。`pureValid=true` 更适合简单正则判断，不会返回 Element Plus 规则对象。

:::utils-source validate validateOnSubmit
:::
