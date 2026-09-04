# 前端代码统一规范

## Hidden Title {.md-hidden}

公司前端项目统一使用 `Prettier + ESLint + lint-staged + Husky + EditorConfig`。规则集中维护在 `@sybz-components/utils`，业务项目无需逐项安装、复制或维护配置。

### 一键接入

```sh
pnpm add -D @sybz-components/utils
pnpm exec sybz-code-standard init
```

初始化会自动完成：

- 创建 `eslint.config.js`、`.prettierrc.js`、`lint-staged.config.js` 和 `.editorconfig`。
- 补充 `lint`、`lint:check`、`lint:prettier`、`lint:prettier:check` scripts。
- 初始化 Husky，并让 pre-commit 自动检查暂存文件。
- 保留已有的自定义配置并给出提示，不静默覆盖。

后续统一规范只需升级 utils：

```sh
pnpm update @sybz-components/utils --latest
```

### 使用命令

```sh
pnpm lint                 # ESLint 检查并修复
pnpm lint:check           # ESLint 只检查
pnpm lint:prettier        # Prettier 格式化
pnpm lint:prettier:check  # Prettier 只检查
```

提交代码时会自动执行 lint-staged，无需手动运行。

### 默认配置

| 配置项            | 可选值/执行内容                   | 默认值       |
| ----------------- | --------------------------------- | ------------ |
| `singleQuote`     | `true` / `false`                  | `true`       |
| `semi`            | `true` / `false`                  | `false`      |
| `trailingComma`   | `all` / `es5` / `none`            | `all`        |
| `printWidth`      | 正整数                            | `120`        |
| `endOfLine`       | `lf` / `crlf` / `cr` / `auto`     | `lf`         |
| ESLint Vue 规则   | `flat/recommended` 及统一放宽项   | 统一预设     |
| pre-commit        | 对暂存代码执行 Prettier 和 ESLint | 自动启用     |
| EditorConfig 缩进 | `space` / `tab`，以及缩进宽度     | `space`、`2` |

### 项目级 ESLint 扩展

只有项目确实存在特殊规则时才修改 `eslint.config.js`：

```js
import { createSybzEslintConfig } from '@sybz-components/utils/codeStandard'

export default createSybzEslintConfig({
  rules: {
    'no-console': 'warn',
  },
})
```

通用规则应回到 utils 统一修改，避免项目之间再次分叉。CI 推荐执行 `pnpm lint:check` 和 `pnpm lint:prettier:check`。
