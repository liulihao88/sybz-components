# 前端代码统一规范

## Hidden Title {.md-hidden}

> 注意：前端项目默认使用 `Prettier` 代码格式化规则，强烈建议将 `Prettier` 设置为编辑器默认格式化工具。

公司前端项目(`chenghua_agent/sybz-components`)统一使用 `Prettier + ESLint + lint-staged + Husky + EditorConfig` 管理代码风格和提交质量。

ESLint、Prettier 和 lint-staged 的具体规则统一维护在 `@sybz-components/utils/codeStandard`。业务项目不要复制规则内容，升级 `@sybz-components/utils` 即可同步规范。Husky 钩子和 EditorConfig 属于项目/编辑器入口，首次接入时仍需创建一次。

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

业务项目先安装 `@sybz-components/utils`，统一配置所需的 ESLint 插件和解析器会随工具包安装。项目仍需直接安装下面这些命令行工具，确保 pnpm 等严格依赖模式下 scripts 和 Git hook 可以找到对应命令：

```sh
pnpm add -D eslint@9.39.4 prettier@3.8.4 husky@9.1.7 lint-staged@15.5.2
```

统一预设内部锁定下面这些版本，业务项目不再分别声明和维护：

```json
{
  "@eslint/js": "9.39.4",
  "eslint-plugin-vue": "10.9.2",
  "vue-eslint-parser": "10.4.1",
  "@typescript-eslint/parser": "8.62.0",
  "@typescript-eslint/eslint-plugin": "8.62.0",
  "eslint-config-prettier": "9.1.2",
  "globals": "16.5.0"
}
```

### 2. Prettier 配置

在项目根目录新增 `.prettierrc.js`，直接复用统一预设：

```js
export { sybzPrettierConfig as default } from '@sybz-components/utils/codeStandard'
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

ESLint 9 使用 flat config。统一预设采用 `sybz-components` 的平衡型规则，适合公司业务项目直接复用。

这套配置的特点是：

- 业务项目配置只有一行，规则升级由 `@sybz-components/utils` 统一完成。
- 以 `js.configs.recommended`、`tsPlugin.configs['flat/base']`、`vue.configs['flat/recommended']` 为主。
- 主动关闭未使用变量、多单词组件名等高频干扰规则，在质量和业务开发效率之间保持平衡。

项目只保留下面这一行配置：

```js
export { sybzEslintConfig as default } from '@sybz-components/utils/codeStandard'
```

确有项目级例外时，将扩展规则放在统一配置之后；Prettier 兼容配置仍会保持在最后：

```js
import { createSybzEslintConfig } from '@sybz-components/utils/codeStandard'

export default createSybzEslintConfig({
  rules: {
    'no-console': 'warn',
  },
})
```

配置说明：

- `js.configs.recommended` 提供 JavaScript 基础规则。
- `tsPlugin.configs['flat/base']` 提供 TypeScript 基础解析能力。
- `vue.configs['flat/recommended']` 提供 Vue 推荐规则，再由统一预设关闭高频干扰项。
- `prettier` 必须放在最后，用来关闭和 Prettier 冲突的规则。
- `no-unused-vars` 默认关闭，避免页面联调、临时变量、草稿代码阶段产生过多噪音。

#### 4.1 默认规则与项目扩展

普通业务项目直接导出 `sybzEslintConfig`。只有确实存在框架、运行环境或遗留代码差异时才调用 `createSybzEslintConfig()` 添加项目扩展；通用规则的调整应回到工具包统一修改，避免项目之间再次分叉。

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

在项目根目录新增 `lint-staged.config.js`：

```js
export { sybzLintStagedConfig as default } from '@sybz-components/utils/codeStandard'
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

1. 安装 `@sybz-components/utils` 以及 Prettier、ESLint、Husky、lint-staged 命令行依赖。
2. 新增只导入统一预设的 `.prettierrc.js`、`eslint.config.js`、`lint-staged.config.js`，并新增 `.editorconfig`。
3. 在 `package.json` 中补充 scripts。
4. 执行 `pnpm exec husky init`，配置 `.husky/pre-commit`。
5. 首次接入时执行 `pnpm lint:prettier` 和 `pnpm lint`，统一存量代码风格。
6. 后续每次提交由 Husky 自动检查 staged 文件。

### 9. 团队约定

- 通用规则统一在 `@sybz-components/utils/codeStandard` 调整，业务项目通过升级工具包同步，不复制修改。
- 不建议在业务代码里随意关闭 ESLint 规则
- 新增项目时，优先复制公司模板里的配置，尽量不要每个项目单独发明一套风格。
- 如果某条 ESLint 规则影响开发效率，优先团队讨论后统一修改配置。
- CI 中建议至少执行 `pnpm lint:check` 和 `pnpm lint:prettier:check`，避免跳过本地 hook 后直接合入。
- 自动格式化产生的大范围 diff 建议单独提交，避免和业务逻辑混在一个 commit 里。
