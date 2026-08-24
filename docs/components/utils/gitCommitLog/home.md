# gitCommitLog Git 提交记录

## Hidden Title {.md-hidden}

<DocBasicUsage code="gitCommitLog()" />

### 基础用法

在业务项目的 `vite.config.ts` 中注册插件。默认读取当前项目最近 `20` 条提交，页面打开后自动展开并打印最近 `10` 条，同时注册全局方法 `b()` 供再次查看。

```ts
import { defineConfig } from 'vite'
import { gitCommitLog } from '@sybz-components/utils/gitCommitLog'

export default defineConfig({
  plugins: [gitCommitLog()],
})
```

页面打开后会自动显示包含构建时间、短哈希、作者和最新提交说明的摘要，例如：

```text
[build git info] · 2026/8/24 10:30:00 · a1b2c3d · 张三 · feat: 新增图片预览
```

即使控制台分组处于收起状态，也能直接看到最新提交。需要再次查看或改变条数时调用：

```ts
b() // 打印默认 10 条
b(3) // 打印最近 3 条
```

### 自动打印

`autoPrint` 默认值为 `true`。传入正整数时，页面打开后直接打印指定条数；不希望自动打印时设置为 `false`。

```ts
plugins: [gitCommitLog({ autoPrint: true })]

plugins: [gitCommitLog({ autoPrint: 5 })]

plugins: [gitCommitLog({ autoPrint: false })]
```

### 展开详情

控制台分组默认收起，只显示包含最新提交的摘要。希望页面打开后直接展开完整详情时，设置 `expanded: true`。

```ts
plugins: [gitCommitLog({ expanded: true })]
```

### 配置项

| 属性名称       | 类型                | 可选值              | 默认值          | 说明                                     |
| -------------- | ------------------- | ------------------- | --------------- | ---------------------------------------- |
| `cwd`          | `string`            | 有效的 Git 目录     | Vite 项目根目录 | 指定读取提交记录的项目目录。             |
| `maxCommits`   | `number`            | 正整数              | `20`            | 构建时最多注入到页面的提交数量。         |
| `defaultLimit` | `number`            | 正整数              | `10`            | 调用 `b()` 且不传参数时的默认打印数量。  |
| `autoPrint`    | `boolean \| number` | `false/true/正整数` | `true`          | 是否在页面加载后自动打印，以及打印条数。 |
| `expanded`     | `boolean`           | `false/true`        | `false`         | 控制台分组打印后是否默认展开。           |

### 返回值与全局数据

`b()` 使用纵向表格显示构建与 Git 状态，并在表格下显示仓库地址、最新提交正文和 recentCommits。recentCommits 按最新到最旧排列，每行包含索引、提交时间、`shortHash`、作者和提交说明。

打印后会返回完整的项目信息，也可以通过 `window.__SYBZ_GIT_COMMIT_LOG__` 直接读取。

```ts
const info = b(5)
console.log(info.branch, info.commits)
```

### 注意事项

- Git 信息在 Vite 启动或构建时读取，新增提交后需要重新启动开发服务或重新构建。
- 提交记录来自业务项目自身，不是 `sybz-components` 的提交记录。
- 未安装 Git、目录不是 Git 仓库或不存在提交时，插件仍可正常运行，提交列表为空。

:::utils-source gitCommitLog
:::
