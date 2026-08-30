# 业务日历

## Hidden Title {.md-hidden}

<DocBasicUsage code='<s-schedule-calendar v-model="currentMonth" v-model:view="view" :tasks="tasks" />' />

### 基础用法（`view` 默认值：`month`，`tasks` 默认值：`[]`，`maxTasksPerDay` 默认值：`3`）

使用 `v-model` 控制当前月份，使用 `v-model:view` 在月历和日程间切换。筛选条件通过 `filters` 插槽传入；点击日期触发 `day-click`，点击任务触发 `task-click`。单日任务超过 `maxTasksPerDay` 时，日期格右上角显示“更多”，点击后以下拉层展示剩余任务；下拉任务与直接展示的任务触发相同事件。

:::demo 展示月份联动、视图切换、筛选插槽和点击事件。基础写法：`<s-schedule-calendar v-model="currentMonth" v-model:view="view" :tasks="tasks" />`。属性：`modelValue` 类型 `string / number / Date`，默认值为当前日期；`view` 可选值 `month / schedule`，默认值 `month`；`tasks` 类型 `ScheduleCalendarTask[]`，默认值 `[]`；`maxTasksPerDay` 类型 `number`，默认值 `3`。
company/scheduleCalendar/base
:::

### 属性

| 属性名               | 说明                                                       | 类型                     | 可选值             | 默认值     |
| -------------------- | ---------------------------------------------------------- | ------------------------ | ------------------ | ---------- |
| modelValue / v-model | 当前展示月份，切换上月、下月或今天时自动更新               | `string / number / Date` | —                  | 当前日期   |
| view / v-model:view  | 当前展示模式                                               | `'month' / 'schedule'`   | `month / schedule` | `month`    |
| tasks                | 任务列表                                                   | `ScheduleCalendarTask[]` | —                  | `[]`       |
| maxTasksPerDay       | 月历单日直接显示的最大任务数，超出部分通过右上角“更多”展开 | `number`                 | —                  | `3`        |
| emptyText            | 日程模式无任务时的提示                                     | `string`                 | —                  | `暂无日程` |

### ScheduleCalendarTask

| 字段            | 说明               | 类型                     | 默认值    |
| --------------- | ------------------ | ------------------------ | --------- |
| id              | 任务唯一标识       | `string / number`        | —         |
| title           | 任务标题           | `string`                 | —         |
| date            | 任务日期           | `string / number / Date` | —         |
| color           | 文字和左侧标记颜色 | `string`                 | `#2761a5` |
| backgroundColor | 任务背景色         | `string`                 | `#eaf2ff` |

### 插槽

| 插槽名  | 说明                               | 插槽参数                |
| ------- | ---------------------------------- | ----------------------- |
| filters | 工具栏右侧的搜索、选择等业务筛选项 | `{ currentDate, view }` |
| day     | 自定义月历日期内容                 | `{ day }`               |
| task    | 自定义月历和日程中的任务内容       | `{ task, day }`         |
| empty   | 自定义日程空状态                   | —                       |

### 事件

| 事件名       | 说明                                     | 参数                           |
| ------------ | ---------------------------------------- | ------------------------------ |
| month-change | 月份变化时触发                           | `(date: Date)`                 |
| view-change  | 月历/日程切换时触发                      | `(view: 'month' / 'schedule')` |
| day-click    | 点击任意日期格或日程日期时触发           | `(day: ScheduleCalendarDay)`   |
| task-click   | 点击任务时触发，不会继续触发 `day-click` | `(task, day, event)`           |
