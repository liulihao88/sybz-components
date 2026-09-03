export type ConfirmVariant = 'default' | 'delete' | 'warning'
export type ConfirmTarget = string | number
export type ConfirmSemanticTheme = 'default' | 'chenghua' | 'shijingshan'
export type ConfirmSemanticButtonType = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'text' | ''

export interface ConfirmSemanticOptions {
  variant?: ConfirmVariant
  target?: ConfirmTarget
  theme?: ConfirmSemanticTheme
  title?: string
  confirmButtonText?: string
  confirmButtonType?: ConfirmSemanticButtonType
}

export interface ConfirmSemanticResult {
  variant: ConfirmVariant
  target?: ConfirmTarget
  hasTarget: boolean
  title: string
  confirmButtonText: string
  confirmButtonType: ConfirmSemanticButtonType
  defaultMessage: string
  classNames: string[]
}

/**
 * 统一解析 confirm、s-dialog 和 s-popconfirm 的确认语义。
 */
export function resolveConfirmSemantic(options: ConfirmSemanticOptions = {}): ConfirmSemanticResult {
  const variant = options.variant ?? 'default'
  const hasTarget = options.target !== undefined
  const title = options.title ?? (variant === 'delete' ? '删除确认' : variant === 'warning' ? '警告' : '提示')
  const confirmButtonText = options.confirmButtonText ?? (variant === 'delete' ? '删除' : '确定')
  const confirmButtonType =
    options.confirmButtonType ?? (variant === 'delete' ? 'danger' : variant === 'warning' ? 'warning' : 'primary')
  const defaultMessage =
    variant === 'delete'
      ? hasTarget
        ? `确认要删除${String(options.target)}吗？删除后不可恢复。`
        : '删除后数据将无法恢复，确定继续吗？'
      : ''
  const theme = options.theme ?? 'default'

  return {
    variant,
    target: options.target,
    hasTarget,
    title,
    confirmButtonText,
    confirmButtonType,
    defaultMessage,
    classNames: [
      's-confirm-semantic',
      `s-confirm-semantic--${variant}`,
      theme !== 'default' ? `s-confirm-semantic--${theme}` : '',
    ].filter(Boolean),
  }
}
