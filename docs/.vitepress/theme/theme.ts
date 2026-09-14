import { reactive } from 'vue'
import type { SybzComponentTheme } from '@/types/index.ts'

export const DOC_THEME_KEY = 'sybz-doc-theme'
export const docThemeOptions: SybzComponentTheme[] = ['default', 'chenghua', 'shijingshan', 'sybz']

const getStoredTheme = (): SybzComponentTheme => {
  if (typeof window === 'undefined') return 'default'
  const theme = window.localStorage.getItem(DOC_THEME_KEY)
  return docThemeOptions.includes(theme as SybzComponentTheme) ? (theme as SybzComponentTheme) : 'default'
}

export const docThemeState = reactive<{ theme: SybzComponentTheme }>({ theme: getStoredTheme() })

export const setDocTheme = (theme: SybzComponentTheme) => {
  docThemeState.theme = theme
  window.localStorage.setItem(DOC_THEME_KEY, theme)
}
