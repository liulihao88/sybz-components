/** 内置主题注册表：新增主题名称和颜色前缀只在这里维护。 */
export const SYBZ_THEME_PREFIX = {
  chenghua: '--s-ch-',
  shijingshan: '--s-sjs-',
  sybz: '--s-sybz-',
  // 鼓楼是石景山布局主题的换色预设，共用组件结构和 token 前缀。
  gulou: '--s-sjs-',
} as const

export type SybzThemeName = keyof typeof SYBZ_THEME_PREFIX
export type SybzComponentTheme = 'default' | SybzThemeName

export const isSybzTheme = (theme: unknown): theme is SybzThemeName =>
  typeof theme === 'string' && Object.prototype.hasOwnProperty.call(SYBZ_THEME_PREFIX, theme)

/** 颜色预设对应的基础组件主题。新增同结构换色主题时只需在这里登记。 */
export function resolveSybzComponentTheme(theme: SybzComponentTheme): SybzComponentTheme
export function resolveSybzComponentTheme(theme: unknown): unknown
export function resolveSybzComponentTheme(theme: unknown) {
  return theme === 'gulou' ? 'shijingshan' : theme
}
