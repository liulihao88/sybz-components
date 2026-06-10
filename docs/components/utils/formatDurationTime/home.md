# formatDurationTime持续时间

## Hidden Title {.md-hidden}

### 基础用法

:::demo
utils/formatDurationTime/base
:::

### 说明

`formatDurationTime` 用于把毫秒级持续时间格式化成中文时长文本，例如 `1162821` 会展示为分钟和秒。它会根据模板和数值自动省略前面为 `0` 的较大单位。

### 调用形式

```ts
formatDurationTime(timestamp)
formatDurationTime(timestamp, format)
```

### 参数说明

| 参数        | 类型     | 必填 | 默认值                   | 说明                                                        |
| ----------- | -------- | ---- | ------------------------ | ----------------------------------------------------------- |
| `timestamp` | `number` | 是   | -                        | 持续时间，单位是毫秒。                                      |
| `format`    | `string` | 否   | `'{d}天{h}时{i}分{s}秒'` | 输出模板。支持 `{d}` 天、`{h}` 小时、`{i}` 分钟、`{s}` 秒。 |

### 返回值

返回格式化后的字符串。当前面单位为 `0` 时，会从第一个非零单位开始展示；如果全为 `0`，会按模板中可用的最小单位显示 `00`。

### 常用场景

```ts
formatDurationTime(1162821)
// '19分22秒'

formatDurationTime(5 * 60 * 1000, '{i}分{s}秒')
// '05分00秒'

formatDurationTime(999999999, '{d}天{h}时{i}分{s}秒')
// '11天13时46分39秒'
```

### 注意事项

入参单位是毫秒，不是秒。模板中不写 `{d}` 时不会按天拆分，较长时间会继续累计到小时里。
