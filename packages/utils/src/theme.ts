/** 内置主题注册表：新增主题名称和颜色前缀只在这里维护。 */
export const SYBZ_THEME_PREFIX = {
  chenghua: '--s-ch-',
  shijingshan: '--s-sjs-',
  sybz: '--s-sybz-',
} as const

export type SybzThemeName = keyof typeof SYBZ_THEME_PREFIX
export type SybzComponentTheme = 'default' | SybzThemeName

export const isSybzTheme = (theme: unknown): theme is SybzThemeName =>
  typeof theme === 'string' && Object.prototype.hasOwnProperty.call(SYBZ_THEME_PREFIX, theme)
