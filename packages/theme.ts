import { SYBZ_THEME_PREFIX, isSybzTheme } from './utils/src/theme'
import type { SybzComponentTheme, SybzThemeColorConfig, SybzThemeColorsConfig, SybzThemeName } from './types/index.ts'

const THEME_PREFIX = SYBZ_THEME_PREFIX
const themeNames = Object.keys(THEME_PREFIX) as SybzThemeName[]

/** 只换色、不新增组件结构的内置主题预设。 */
const THEME_COLOR_PRESETS: Partial<Record<SybzThemeName, SybzThemeColorConfig>> = {
  gulou: {
    primary: '#2477f3',
    primaryHover: '#1661e8',
    primaryActive: '#0d4fcb',
    primaryRgb: '36, 119, 243',
    primaryHoverRgb: '22, 97, 232',
    accent: '#2fb7e8',
    accentHover: '#1da5d8',
    accentActive: '#168dbb',
    accentRgb: '47, 183, 232',
    success: '#23b777',
    successRgb: '35, 183, 119',
    warning: '#f0a020',
    warningRgb: '240, 160, 32',
    danger: '#e65b5b',
    dangerRgb: '230, 91, 91',
    info: '#2477f3',
    infoRgb: '36, 119, 243',
    background: '#f4f9ff',
    backgroundSoft: '#f7fbff',
    backgroundMobile: '#f4f9ff',
    backgroundWeb: '#f4f9ff',
    cardBackground: '#ffffff',
    navigationBackground: '#ffffff',
    fill: '#f4f9ff',
    fillMobile: '#f4f9ff',
    fillWeb: '#f4f9ff',
    rowAlternate: '#f7fbff',
    rowHover: '#eaf4ff',
    disabledBackground: '#f4f9ff',
    text: '#071949',
    textRegular: '#1d2b4f',
    textRegularMobile: '#1d2b4f',
    textRegularWeb: '#1d2b4f',
    textMuted: '#667694',
    textSecondary: '#99a8bf',
    divider: '#dce8f7',
    dividerMobile: '#dce8f7',
    dividerWeb: '#dce8f7',
    tagBackground: '#eef8ff',
    tagText: '#2372ad',
    headerBackground: '#eef6ff',
    controlBackground: '#ffffff',
    tableLine: '#dce8f7',
    tableLineSoft: '#e5eff9',
    tableHeaderBackground: '#eef6ff',
    tableRowBackground: '#ffffff',
    tableRowAlternate: '#f7fbff',
    tablePaginationBackground: '#f4f9ff',
  },
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
  if (isSybzTheme(theme) && THEME_COLOR_PRESETS[theme]) {
    const nestedConfig = isRecord(config) ? config[theme] : undefined
    const presetOverrides = isRecord(nestedConfig) ? nestedConfig : isRecord(config) ? config : {}
    setSybzThemeColors(theme, {
      ...THEME_COLOR_PRESETS[theme],
      ...presetOverrides,
    })
    return
  }

  // 未传主题时属于无主题配置的插件安装，不应清除主插件已经应用的颜色预设。
  if (theme !== undefined && theme !== 'gulou') {
    resetSybzThemeColors('gulou')
  }

  if (!config || !isRecord(config)) return

  const nestedConfig = config as Partial<Record<SybzThemeName, SybzThemeColorConfig>>
  const hasNestedConfig = themeNames.some((name) => isRecord(nestedConfig[name]))

  if (hasNestedConfig) {
    themeNames.forEach((name) => {
      if (nestedConfig[name]) setSybzThemeColors(name, nestedConfig[name])
    })
    return
  }

  if (isSybzTheme(theme)) {
    setSybzThemeColors(theme, config as SybzThemeColorConfig)
  }
}
