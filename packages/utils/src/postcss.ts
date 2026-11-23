import { createRequire } from 'node:module'
import type { Plugin } from 'postcss'

const require = createRequire(import.meta.url)
// postcss-preset-env v11 的类型声明使用了较新的 TypeScript 语法，
// 这里用 require 取值，避免旧版 TS 在 skipLibCheck 下仍解析失败。
const postcssPresetEnv = require('postcss-preset-env') as (options: Record<string, unknown>) => Plugin

/** 与组件库、`scripts/build-compat.mjs` 保持一致。 */
export const SYBZ_COMPAT_BROWSERS = ['chrome >= 60', 'safari >= 12', 'firefox >= 60', 'edge >= 79']

export interface SybzCompatPostcssOptions {
  /** PostCSS 的目标浏览器，默认 Chrome 60+。 */
  browsers?: string[]
}

/**
 * `dvh` / `dvw` 等动态视口单位在 Chrome 60 中不合法，会让整条声明被丢弃。
 * 这里先补一条等值的 `vh` / `vw` 声明，现代浏览器继续使用后面的动态单位。
 */
const viewportUnitFallbacks = (): Plugin => ({
  postcssPlugin: 'sybz-viewport-unit-fallbacks',
  Declaration(decl) {
    if (decl.prop.startsWith('--')) return
    if (!/\d(?:dvh|dvw|svh|svw|lvh|lvw)\b/.test(decl.value)) return

    const fallback = decl.value.replace(
      /(\d*\.?\d+)(dvh|dvw|svh|svw|lvh|lvw)\b/g,
      (_match, value, unit) => `${value}${unit.endsWith('h') ? 'vh' : 'vw'}`,
    )
    if (fallback === decl.value) return

    decl.cloneBefore({ value: fallback })
  },
})

/** 等价的 `inset: 0` 在 Chrome 60 中同样不支持，这里展开成四方向属性。 */
const insetFallbacks = (): Plugin => ({
  postcssPlugin: 'sybz-inset-fallbacks',
  Declaration(decl) {
    if (decl.prop !== 'inset') return

    const values = decl.value.trim().split(/\s+(?![^(]*\))/)
    if (!values.length || values.length > 4) return

    const [top, right = top, bottom = top, left = right] = values
    decl.cloneBefore({ prop: 'top', value: top })
    decl.cloneBefore({ prop: 'right', value: right })
    decl.cloneBefore({ prop: 'bottom', value: bottom })
    decl.cloneBefore({ prop: 'left', value: left })
  },
})

const UNSUPPORTED_SELECTOR_RE = /:(?:focus-visible|where|has)\b/i

/** 拆分选择器列表，逗号在括号/方括号/引号内时不拆分。 */
const splitSelectorList = (selector: string): string[] => {
  const selectors: string[] = []
  let start = 0
  let depth = 0
  let quote = ''

  for (let index = 0; index < selector.length; index += 1) {
    const char = selector[index]

    if (quote) {
      if (char === '\\') index += 1
      else if (char === quote) quote = ''
      continue
    }

    if (char === '"' || char === "'") {
      quote = char
      continue
    }
    if (char === '\\') {
      index += 1
      continue
    }
    if (char === '(' || char === '[') {
      depth += 1
      continue
    }
    if (char === ')' || char === ']') {
      depth = Math.max(0, depth - 1)
      continue
    }
    if (char === ',' && depth === 0) {
      selectors.push(selector.slice(start, index).trim())
      start = index + 1
    }
  }

  selectors.push(selector.slice(start).trim())
  return selectors.filter(Boolean)
}

/**
 * `.a:hover, .a:focus-visible` 在 Chrome 60 中会因为一个不支持的选择器而整条规则失效。
 * 拆成独立规则后，旧浏览器至少保留 `.a:hover`，新浏览器两条都生效。
 */
const selectorListFallbacks = (): Plugin => ({
  postcssPlugin: 'sybz-selector-list-fallbacks',
  Rule(rule) {
    if (!UNSUPPORTED_SELECTOR_RE.test(rule.selector)) return

    const selectors = splitSelectorList(rule.selector)
    if (selectors.length < 2) return

    rule.replaceWith(...selectors.map((selector) => rule.clone({ selector })))
  },
})

/**
 * 业务项目使用 `sybzVitePlugins({ compat: true })` 时自动注入的 PostCSS 兼容插件。
 * 单独导出是为了兼容已有 postcss.config 的项目手动合并。
 */
export const createSybzCompatPostcssPlugins = (options: SybzCompatPostcssOptions = {}): Plugin[] => [
  postcssPresetEnv({
    stage: 2,
    browsers: options.browsers ?? SYBZ_COMPAT_BROWSERS,
    features: {
      'nesting-rules': false,
      'custom-properties': false,
    },
  }),
  selectorListFallbacks(),
  viewportUnitFallbacks(),
  insetFallbacks(),
]
