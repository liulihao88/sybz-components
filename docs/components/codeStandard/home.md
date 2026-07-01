# 前端代码统一规范

## Hidden Title {.md-hidden}

> 注意：前端项目默认使用 `Prettier` 代码格式化规则，强烈建议将 `Prettier` 设置为编辑器默认格式化工具。

公司前端项目(`chenghua_agent/sybz-components`)统一使用 `Prettier + ESLint + lint-staged + Husky + EditorConfig` 管理代码风格和提交质量。

- `Prettier` 负责格式化代码，统一引号、分号、换行、每行长度等风格。
- `ESLint` 负责检查 JavaScript、TypeScript、Vue 代码里的潜在问题。
- `eslint-config-prettier` 负责关闭和 Prettier 冲突的 ESLint 规则。
- `EditorConfig` 负责统一不同编辑器里的缩进、换行符和文件末尾换行。
- `lint-staged` 只处理本次提交改动过的文件，避免每次提交都扫描整个项目。
- `Husky` 负责在 `git commit` 前自动执行 `lint-staged`。

### 技术说明

本规范主要基于 `Prettier + ESLint + lint-staged + Husky + EditorConfig` 这 5 项技术组合实现，目标不是只做“格式化”，而是把编辑器、命令行、Git 提交、CI 检查几个环节串成一套统一机制。

技术分工如下：

- `Prettier` 负责统一代码排版，让引号、分号、换行、尾逗号、单行宽度等格式保持一致。
- `ESLint` 负责做代码质量校验，发现常见语法问题、不合理写法和部分潜在风险。
- `eslint-config-prettier` 负责关闭和 `Prettier` 冲突的 ESLint 规则，避免两个工具互相打架。
- `EditorConfig` 负责约束不同编辑器的基础行为，例如缩进、换行符、文件末尾换行。
- `lint-staged` 负责只检查本次提交改动过的文件，减少无关文件扫描，保证提交流程足够轻量。
- `Husky` 负责把检查流程接入 Git 提交钩子，在提交前自动执行规范校验。

实现效果：

- 编辑器保存、命令行执行、Git 提交、CI 检查使用同一套规则，避免“本地正常、别人机器格式不一致”的问题。
- 团队成员不需要手动记忆排版细节，大部分格式问题都可以自动修复。
- 低级格式问题和一部分明显代码问题会在提交前被拦住，减少无效 review。
- 只检查暂存区文件，保证规范接入后不会明显拖慢日常提交流程。
- 新项目可以直接复用这套配置，老项目也可以按步骤平滑接入，逐步完成统一。

### 1. 安装依赖

Vue3 + TypeScript 项目推荐安装下面这些依赖。

推荐版本如下，项目里可以根据实际包管理策略锁定版本。(为了保证前端插件的一致性, 版本是锁死的)

```json
{
  "prettier": "3.8.4",
  "eslint": "9.39.4",
  "@eslint/js": "9.39.4",
  "eslint-plugin-vue": "10.9.2",
  "vue-eslint-parser": "10.4.1",
  "@typescript-eslint/parser": "8.62.0",
  "@typescript-eslint/eslint-plugin": "8.62.0",
  "eslint-config-prettier": "9.1.2",
  "globals": "16.5.0",
  "husky": "9.1.7",
  "lint-staged": "15.5.2"
}
```

### 2. Prettier 配置

在项目根目录新增 `.prettierrc.js`。

```js
export default {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  printWidth: 120,
  endOfLine: 'lf',
}
```

配置说明：

- `singleQuote: true`：统一使用单引号。
- `semi: false`：语句末尾不加分号。
- `trailingComma: 'all'`：多行对象、数组、参数保留尾逗号，减少 diff。
- `printWidth: 120`：每行最大宽度 120。
- `endOfLine: 'lf'`：统一使用 LF 换行，避免 Windows/macOS 换行差异。

### 3. EditorConfig 配置

在项目根目录新增 `.editorconfig`。

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true
max_line_length = 120

[*.md]
trim_trailing_whitespace = false
```

说明：

- 所有项目统一使用 `2` 个空格缩进。
- 所有文件统一保留文件末尾换行。
- Markdown 保留行尾空格，避免影响手动换行语法。

### 4. ESLint 配置

ESLint 9 推荐使用 flat config。本节默认展示 `chenghua_agent` 当前实际使用的配置，因为它更接近公司业务前端项目的落地方式。

这套配置的特点是：

- 结构简单，接入成本低，适合页面型业务项目快速统一规范。
- 以 `js.configs.recommended`、`tsPlugin.configs['flat/base']`、`vue.configs['flat/base']` 为主，默认不过度增加规则负担。
- 只保留必要的基础校验，避免一开始就让业务开发被大量 ESLint 报错打断。

示例配置如下：

```js
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import vueParser from 'vue-eslint-parser'

export default [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      'dist-ssr/**',
      'coverage/**',
      'docs/.vitepress/cache/**',
      'docs/.vitepress/dist/**',
      'packages/*/dist/**',
      '.vitepress/**',
      '.codex-types-temp/**',
      '*.tsbuildinfo',
      '*.local',
    ],
  },
  js.configs.recommended,
  tsPlugin.configs['flat/base'],
  ...vue.configs['flat/base'],
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs,vue}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      'no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,vue}'],
    rules: {
      'no-undef': 'off',
      'no-redeclare': 'off',
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
      },
    },
  },
  prettier,
]
```

配置说明：

- `js.configs.recommended` 提供 JavaScript 基础规则。
- `tsPlugin.configs['flat/base']` 提供 TypeScript 基础解析能力。
- `vue.configs['flat/base']` 提供 Vue 的基础解析和最小可用配置，更适合业务项目先落地。
- `prettier` 必须放在最后，用来关闭和 Prettier 冲突的规则。
- `no-unused-vars` 默认关闭，避免页面联调、临时变量、草稿代码阶段产生过多噪音。

#### 4.1 chenghua_agent、sybz-components、flat/recommended 的区别

可以把这三套方案理解成不同的使用场景：

- `chenghua_agent`：当前业务项目实际配置，基于 `vue.configs['flat/base']`，规则最轻，适合先把规范接起来。
- `sybz-components`：在 `flat/recommended` 基础上，主动关闭了一些高频干扰规则，比如未使用变量、多单词组件名、模板变量遮蔽，更适合作为公司前端业务项目的统一配置。
- 纯 `flat/recommended`：规则更完整、更严格，适合基础组件库、公共工具库、SDK、底层能力库。

主要差异：

- `chenghua_agent` 偏“先落地”，目标是先统一工程规范，不给业务开发增加太多阻力。
- `sybz-components` 偏“平衡型”，既保留较多推荐规则，又主动关掉最影响协作效率的几条规则。
- `flat/recommended` 偏“严格型”，更强调代码约束和一致性，适合复用层代码质量控制。

如果只给一个建议：

- 普通业务前端项目：可以先参考 `chenghua_agent`。
- 公司通用业务项目模板：更推荐参考 `sybz-components`。
- 基础组件库或公共库：优先使用 `flat/recommended`，再按需要做局部放宽。

### 5. package.json 脚本

在 `package.json` 中统一保留下面几个脚本。

```json
{
  "scripts": {
    "lint": "eslint . --fix",
    "lint:check": "eslint .",
    "lint:prettier": "prettier --write .",
    "lint:prettier:check": "prettier --check ."
  }
}
```

使用方式：

```sh
pnpm lint
pnpm lint:check
pnpm lint:prettier
pnpm lint:prettier:check
```

- 本地开发时可以用 `pnpm lint` 自动修复 ESLint 问题。
- 提交前或 CI 中建议使用 `pnpm lint:check` 做只检查不修改。
- 大范围统一格式时使用 `pnpm lint:prettier`。

### 6. lint-staged 配置

在 `package.json` 中新增 `lint-staged`。

```json
{
  "lint-staged": {
    "**/*.{js,jsx,ts,tsx,vue,mjs,cjs}": ["prettier --write", "eslint --fix --max-warnings=0"],
    "**/*.{css,scss,json,md,yaml,yml,html}": ["prettier --write"]
  }
}
```

说明：

- 代码文件先执行 `prettier --write`，再执行 `eslint --fix`。
- 样式、JSON、Markdown、YAML、HTML 只执行 Prettier。
- `--max-warnings=0` 表示 ESLint warning 也会阻止提交，避免问题长期堆积。

### 7. Husky 配置

初始化 Husky。

```sh
pnpm exec husky init
```

然后把 `.husky/pre-commit` 内容改为：

```sh
pnpm exec lint-staged
```

提交代码时，Git 会自动执行：

```txt
git commit
  -> .husky/pre-commit
  -> pnpm exec lint-staged
  -> prettier / eslint
```

只要检查失败，本次 commit 就会被中断，需要修复后重新提交。

### 8. 推荐执行流程

新项目接入时，按下面顺序处理。

1. 安装 Prettier、ESLint、Husky、lint-staged 相关依赖。
2. 新增 `.prettierrc.js`、`.editorconfig`、`eslint.config.js`。
3. 在 `package.json` 中补充 `scripts` 和 `lint-staged`。
4. 执行 `pnpm exec husky init`，配置 `.husky/pre-commit`。
5. 首次接入时执行 `pnpm lint:prettier` 和 `pnpm lint`，统一存量代码风格。
6. 后续每次提交由 Husky 自动检查 staged 文件。

### 9. 团队约定

- 规则可能会根据实际情况做调整, 不同项目调整后尽量同步更新, 保持一致.
- 不建议在业务代码里随意关闭 ESLint 规则
- 新增项目时，优先复制公司模板里的配置，尽量不要每个项目单独发明一套风格。
- 如果某条 ESLint 规则影响开发效率，优先团队讨论后统一修改配置。
- CI 中建议至少执行 `pnpm lint:check` 和 `pnpm lint:prettier:check`，避免跳过本地 hook 后直接合入。
- 自动格式化产生的大范围 diff 建议单独提交，避免和业务逻辑混在一个 commit 里。
