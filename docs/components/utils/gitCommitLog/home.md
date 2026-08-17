# gitCommitLog Git 提交记录

## Hidden Title {.md-hidden}

<DocBasicUsage code="gitCommitLog()" />

### 基础用法

在业务项目的 `vite.config.ts` 中注册插件。默认读取当前项目最近 `20` 条提交，并注册全局方法 `b()`；在浏览器控制台调用 `b()` 时，默认打印最近 `8` 条。

```ts
import { defineConfig } from 'vite'
import { gitCommitLog } from '@sybz-components/utils/gitCommitLog'

export default defineConfig({
  plugins: [gitCommitLog()],
})
```

页面打开后，在浏览器控制台调用：

```ts
b() // 打印默认 8 条
b(3) // 打印最近 3 条
```

### 自动打印

`autoPrint` 默认值为 `false`。设置为 `true` 时，页面打开后直接打印默认条数；传入正整数时，页面打开后直接打印指定条数。

```ts
plugins: [gitCommitLog({ autoPrint: true })]

plugins: [gitCommitLog({ autoPrint: 5 })]
```

### 配置项

| 属性名称       | 类型                | 可选值              | 默认值          | 说明                                     |
| -------------- | ------------------- | ------------------- | --------------- | ---------------------------------------- |
| `cwd`          | `string`            | 有效的 Git 目录     | Vite 项目根目录 | 指定读取提交记录的项目目录。             |
| `maxCommits`   | `number`            | 正整数              | `20`            | 构建时最多注入到页面的提交数量。         |
| `defaultLimit` | `number`            | 正整数              | `8`             | 调用 `b()` 且不传参数时的默认打印数量。  |
| `autoPrint`    | `boolean \| number` | `false/true/正整数` | `false`         | 是否在页面加载后自动打印，以及打印条数。 |

### 返回值与全局数据

`b()` 在打印后返回完整的项目信息，也可以通过 `window.__SYBZ_GIT_COMMIT_LOG__` 直接读取。数据包含项目名、版本、分支、仓库地址、构建时间和提交记录。

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
