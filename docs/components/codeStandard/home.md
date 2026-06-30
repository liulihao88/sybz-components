# 前端代码统一规范

## Hidden Title {.md-hidden}

### 说明

公司前端项目统一使用 `Prettier + ESLint + lint-staged + Husky + EditorConfig` 管理代码风格和提交质量。

- `Prettier` 负责格式化代码，统一引号、分号、换行、每行长度等风格。
- `ESLint` 负责检查 JavaScript、TypeScript、Vue 代码里的潜在问题。
- `eslint-config-prettier` 负责关闭和 Prettier 冲突的 ESLint 规则。
- `EditorConfig` 负责统一不同编辑器里的缩进、换行符和文件末尾换行。
- `lint-staged` 只处理本次提交改动过的文件，避免每次提交都扫描整个项目。
- `Husky` 负责在 `git commit` 前自动执行 `lint-staged`。

## 1. 安装依赖

Vue3 + TypeScript 项目推荐安装下面这些依赖。

```sh
pnpm add -D prettier eslint @eslint/js eslint-plugin-vue vue-eslint-parser @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier globals husky lint-staged
```

推荐版本如下，项目里可以根据实际包管理策略锁定版本。

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

## 2. Prettier 配置

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

## 3. EditorConfig 配置

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

## 4. ESLint 配置

ESLint 9 推荐使用 flat config。公司项目统一在根目录使用 `eslint.config.js`。

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
  ...vue.configs['flat/recommended'],
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
      'no-console': 'off',
      'no-unused-vars': 'off',
      'vue/no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-template-shadow': 'off',
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

说明：

- `js.configs.recommended` 提供 JavaScript 基础规则。
- `tsPlugin.configs['flat/base']` 提供 TypeScript 基础解析能力。
- `vue.configs['flat/recommended']` 提供 Vue 推荐规则。
- `prettier` 必须放在最后，用来关闭和 Prettier 冲突的规则。
- `no-unused-vars` 默认关闭，避免 Vue 模板、类型声明、演示代码里产生过多噪音；业务项目可以按团队要求再收紧。

## 5. package.json 脚本

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

## 6. lint-staged 配置

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

## 7. Husky 配置

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

## 8. 推荐执行流程

新项目接入时，按下面顺序处理。

1. 安装 Prettier、ESLint、Husky、lint-staged 相关依赖。
2. 新增 `.prettierrc.js`、`.editorconfig`、`eslint.config.js`。
3. 在 `package.json` 中补充 `scripts` 和 `lint-staged`。
4. 执行 `pnpm exec husky init`，配置 `.husky/pre-commit`。
5. 首次接入时执行 `pnpm lint:prettier` 和 `pnpm lint`，统一存量代码风格。
6. 后续每次提交由 Husky 自动检查 staged 文件。

## 9. 团队约定

- 不建议在业务代码里随意关闭 ESLint 规则
- 新增项目时，优先复制公司模板里的配置，不要每个项目单独发明一套风格。
- 如果某条 ESLint 规则影响开发效率，优先团队讨论后统一修改配置。
- CI 中建议至少执行 `pnpm lint:check` 和 `pnpm lint:prettier:check`，避免跳过本地 hook 后直接合入。
- 自动格式化产生的大范围 diff 建议单独提交，避免和业务逻辑混在一个 commit 里。
