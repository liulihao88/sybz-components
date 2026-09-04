import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import vue from 'eslint-plugin-vue'
import globals from 'globals'
import type { Linter } from 'eslint'
import type { Config as PrettierConfig } from 'prettier'
import vueParser from 'vue-eslint-parser'

export type SybzEslintConfig = Linter.Config

/** 公司前端项目统一使用的 Prettier 配置。 */
export const sybzPrettierConfig: PrettierConfig = {
  singleQuote: true,
  semi: false,
  trailingComma: 'all',
  printWidth: 120,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
}

/** 公司前端项目统一使用的 lint-staged 配置。 */
export const sybzLintStagedConfig: Record<string, string[]> = {
  '**/*.{js,jsx,ts,tsx,vue,mjs,cjs}': [
    'sybz-code-standard prettier --write',
    'sybz-code-standard eslint --fix --max-warnings=0',
  ],
  '**/*.{css,scss,json,yaml,yml,html,md}': ['sybz-code-standard prettier --write'],
}

const baseEslintConfig = [
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
      'vue/attribute-hyphenation': ['warn', 'always', { ignore: ['dangerouslyUseHTMLString'] }],
      'vue/require-default-prop': 'off',
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
        ecmaFeatures: { jsx: true },
        extraFileExtensions: ['.vue'],
      },
    },
  },
] as Linter.Config[]

/**
 * 创建公司统一的 ESLint flat config。项目级扩展会插入到 Prettier 兼容配置之前。
 */
export const createSybzEslintConfig = (...extensions: Linter.Config[]): Linter.Config[] => [
  ...baseEslintConfig,
  ...extensions,
  prettier,
]

/** 公司前端项目默认的 ESLint flat config。 */
export const sybzEslintConfig: SybzEslintConfig[] = createSybzEslintConfig()
