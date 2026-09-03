import type { SybzComponentTheme, SybzThemeColorConfig, SybzThemeColorsConfig, SybzThemeName } from './types/index.ts'

const THEME_PREFIX: Record<SybzThemeName, string> = {
  chenghua: '--s-ch-',
  shijingshan: '--s-sjs-',
}

const COLOR_TOKEN_MAP: Record<keyof SybzThemeColorConfig, string> = {
  primary: 'primary',
  primaryHover: 'primary-hover',
  primaryActive: 'primary-active',
  primaryRgb: 'primary-rgb',
  primaryHoverRgb: 'primary-hover-rgb',
  accent: 'accent',
  accentHover: 'accent-hover',
  accentActive: 'accent-active',
  accentRgb: 'accent-rgb',
  success: 'success',
  successRgb: 'success-rgb',
  warning: 'warning',
  warningRgb: 'warning-rgb',
  danger: 'danger',
  dangerRgb: 'danger-rgb',
  info: 'info',
  infoRgb: 'info-rgb',
  background: 'bg',
  backgroundSoft: 'bg-soft',
  backgroundMobile: 'bg-mobile',
  backgroundWeb: 'bg-web',
  cardBackground: 'card-bg',
  navigationBackground: 'nav-bg',
  fill: 'fill',
  fillMobile: 'fill-mobile',
  fillWeb: 'fill-web',
  rowAlternate: 'row-alt',
  rowHover: 'row-hover',
  disabledBackground: 'disabled-bg',
  text: 'text',
  textRegular: 'text-regular',
  textRegularMobile: 'text-regular-mobile',
  textRegularWeb: 'text-regular-web',
  textMuted: 'text-muted',
  textSecondary: 'text-secondary',
  divider: 'divider',
  dividerMobile: 'divider-mobile',
  dividerWeb: 'divider-web',
  tagBackground: 'tag-bg',
  tagText: 'tag-text',
  headerBackground: 'header-bg',
  controlBackground: 'control-bg',
  tableLine: 'table-line',
  tableLineSoft: 'table-line-soft',
  tableHeaderBackground: 'table-header-bg',
  tableRowBackground: 'table-row-bg',
  tableRowAlternate: 'table-row-alt',
  tablePaginationBackground: 'table-page-bg',
}

const RGB_COLOR_KEYS = ['primary', 'accent', 'success', 'warning', 'danger', 'info'] as const
const appliedThemeTokens = new WeakMap<HTMLElement, Partial<Record<SybzThemeName, Set<string>>>>()

const isRecord = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value)

const getDefaultTarget = () => (typeof document === 'undefined' ? null : document.documentElement)

const parseRgb = (color: string) => {
  const value = color.trim()
  const hex = value.match(/^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i)?.[1]

  if (hex) {
    const normalized = hex.length <= 4 ? hex.slice(0, 3).replace(/(.)/g, '$1$1') : hex.slice(0, 6)
    return [0, 2, 4].map((index) => Number.parseInt(normalized.slice(index, index + 2), 16))
  }

  const rgb = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i)
  if (!rgb) return null

  return rgb.slice(1, 4).map((channel) => Math.min(255, Math.max(0, Math.round(Number(channel)))))
}

const mixRgb = (rgb: number[], target: number, weight: number) =>
  `rgb(${rgb.map((channel) => Math.round(channel * (1 - weight) + target * weight)).join(', ')})`

const resolveThemeColors = (colors: SybzThemeColorConfig) => {
  const resolved = { ...colors }

  if (resolved.background) {
    resolved.backgroundMobile ??= resolved.background
    resolved.backgroundWeb ??= resolved.background
  }
  if (resolved.fill) {
    resolved.fillMobile ??= resolved.fill
    resolved.fillWeb ??= resolved.fill
    resolved.tagBackground ??= resolved.fill
  }
  if (resolved.textRegular) {
    resolved.textRegularMobile ??= resolved.textRegular
    resolved.textRegularWeb ??= resolved.textRegular
  }
  if (resolved.divider) {
    resolved.dividerMobile ??= resolved.divider
    resolved.dividerWeb ??= resolved.divider
    resolved.tableLine ??= resolved.divider
    resolved.tableLineSoft ??= resolved.divider
  }
  if (resolved.headerBackground) resolved.tableHeaderBackground ??= resolved.headerBackground
  if (resolved.cardBackground) resolved.tableRowBackground ??= resolved.cardBackground
  if (resolved.rowAlternate) resolved.tableRowAlternate ??= resolved.rowAlternate
  if (resolved.fill) resolved.tablePaginationBackground ??= resolved.fill

  RGB_COLOR_KEYS.forEach((key) => {
    const color = resolved[key]
    if (!color) return

    const rgb = parseRgb(color)
    const rgbKey = `${key}Rgb` as keyof SybzThemeColorConfig
    if (rgb && !resolved[rgbKey]) {
      resolved[rgbKey] = rgb.join(', ')
    }

    if (rgb && (key === 'primary' || key === 'accent')) {
      const hoverKey = `${key}Hover` as keyof SybzThemeColorConfig
      const activeKey = `${key}Active` as keyof SybzThemeColorConfig
      if (!resolved[hoverKey]) resolved[hoverKey] = mixRgb(rgb, 255, 0.12)
      if (!resolved[activeKey]) resolved[activeKey] = mixRgb(rgb, 0, 0.12)
    }
  })

  const primaryHoverRgb = resolved.primaryHover && parseRgb(resolved.primaryHover)
  if (primaryHoverRgb && !resolved.primaryHoverRgb) {
    resolved.primaryHoverRgb = primaryHoverRgb.join(', ')
  }

  return resolved
}

export const resetSybzThemeColors = (theme: SybzThemeName, target: HTMLElement | null = getDefaultTarget()) => {
  if (!target) return

  const targetTokens = appliedThemeTokens.get(target)
  targetTokens?.[theme]?.forEach((token) => target.style.removeProperty(token))
  if (targetTokens) delete targetTokens[theme]
}

export const setSybzThemeColors = (
  theme: SybzThemeName,
  colors: SybzThemeColorConfig,
  target: HTMLElement | null = getDefaultTarget(),
) => {
  if (!target || !isRecord(colors)) return

  resetSybzThemeColors(theme, target)
  const prefix = THEME_PREFIX[theme]
  const tokens = new Set<string>()

  Object.entries(resolveThemeColors(colors)).forEach(([key, value]) => {
    const suffix = COLOR_TOKEN_MAP[key as keyof SybzThemeColorConfig]
    if (!suffix || typeof value !== 'string' || !value.trim()) return

    const token = `${prefix}${suffix}`
    target.style.setProperty(token, value)
    tokens.add(token)
  })

  const targetTokens = appliedThemeTokens.get(target) ?? {}
  targetTokens[theme] = tokens
  appliedThemeTokens.set(target, targetTokens)
}

export const applySybzThemeColors = (
  theme: SybzComponentTheme | undefined,
  config: SybzThemeColorsConfig | undefined,
) => {
  if (!config || !isRecord(config)) return

  const nestedConfig = config as Partial<Record<SybzThemeName, SybzThemeColorConfig>>
  const hasNestedConfig = isRecord(nestedConfig.chenghua) || isRecord(nestedConfig.shijingshan)

  if (hasNestedConfig) {
    if (nestedConfig.chenghua) setSybzThemeColors('chenghua', nestedConfig.chenghua)
    if (nestedConfig.shijingshan) setSybzThemeColors('shijingshan', nestedConfig.shijingshan)
    return
  }

  if (theme === 'chenghua' || theme === 'shijingshan') {
    setSybzThemeColors(theme, config as SybzThemeColorConfig)
  }
}
