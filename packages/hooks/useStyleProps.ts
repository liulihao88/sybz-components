import { computed, getCurrentInstance } from 'vue'
import type { CSSProperties, ComputedRef } from 'vue'
import { processWidth } from '@sybz-components/utils'

/**
 * Mantine 风格的「样式简写属性」(Style Props)。
 *
 * 所有 sybz 组件都通过全局 mixin（见 packages/index.ts）自动接受这些属性，
 * 组件无需逐个声明；在组件内部通过 `useStyleProps()` 或模板中的 `$styleProps`
 * 得到解析后的 CSS 样式对象，绑定到根元素即可。
 *
 * 数值会自动补全为 `px`（长度类属性），例如 `m={10}` → `margin: 10px`；
 * 关键词类属性（如 `ta`、`pos`、`bg`、`c`）原样透传。
 */

// 简写属性 → CSS 属性（值为数组表示一个简写同时设置多个 CSS 属性）
export const STYLE_PROP_MAP = {
  // 内边距与外边距
  m: 'margin',
  mt: 'margin-top',
  mb: 'margin-bottom',
  ml: 'margin-left',
  mr: 'margin-right',
  mx: ['margin-left', 'margin-right'],
  my: ['margin-top', 'margin-bottom'],
  p: 'padding',
  pt: 'padding-top',
  pb: 'padding-bottom',
  pl: 'padding-left',
  pr: 'padding-right',
  px: ['padding-left', 'padding-right'],
  py: ['padding-top', 'padding-bottom'],
  // 字体与文本
  fs: 'font-size',
  fw: 'font-weight',
  lh: 'line-height',
  ta: 'text-align',
  tt: 'text-transform',
  td: 'text-decoration',
  ff: 'font-family',
  lts: 'letter-spacing',
  // 尺寸与定位
  w: 'width',
  h: 'height',
  miw: 'min-width',
  maw: 'max-width',
  mih: 'min-height',
  mah: 'max-height',
  pos: 'position',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  inset: 'inset',
  z: 'z-index',
  // 弹性盒子
  flex: 'flex',
  // 背景与边框
  bg: 'background',
  c: 'color',
  opacity: 'opacity',
  bd: 'border',
  bdr: 'border-right',
  bdl: 'border-left',
  bdt: 'border-top',
  bdb: 'border-bottom',
} as const

export type SybzStylePropKey = keyof typeof STYLE_PROP_MAP

/** 数值需要自动补全为 `px` 的长度类属性（字符串走 processWidth：`'14'` → `'14px'`，`'1rem'` 原样保留） */
const LENGTH_PROP_KEYS = new Set<SybzStylePropKey>([
  'm',
  'mt',
  'mb',
  'ml',
  'mr',
  'mx',
  'my',
  'p',
  'pt',
  'pb',
  'pl',
  'pr',
  'px',
  'py',
  'w',
  'h',
  'miw',
  'maw',
  'mih',
  'mah',
  'fs',
  'lts',
  'top',
  'bottom',
  'left',
  'right',
])

const toStyleValue = (key: SybzStylePropKey, value: unknown): unknown => {
  if (typeof value === 'number') {
    // inset 也按四边长度处理：数字补全为 px，多值字符串原样透传
    return LENGTH_PROP_KEYS.has(key) || key === 'inset' ? `${value}px` : value
  }

  if (typeof value === 'string' && LENGTH_PROP_KEYS.has(key)) {
    return processWidth(value, true)
  }

  return value
}

/** 组件自身声明的 prop 名（用于跳过，避免与组件已有同名 prop 重复应用） */
const getOwnPropKeys = (type: any): string[] => {
  const raw = type?.props
  if (Array.isArray(raw)) return raw
  if (raw && typeof raw === 'object') return Object.keys(raw)
  return []
}

export const resolveStyleProps = (
  source: Record<string, unknown>,
  options: { exclude?: Iterable<string> } = {},
): CSSProperties => {
  const exclude = new Set(options.exclude ?? [])
  const style: Record<string, unknown> = {}

  for (const key of Object.keys(STYLE_PROP_MAP) as SybzStylePropKey[]) {
    if (exclude.has(key)) continue
    const value = source[key]
    if (value === undefined || value === null || value === false || value === '') continue

    const css = STYLE_PROP_MAP[key]
    const targets: string[] = typeof css === 'string' ? [css] : [...css]
    for (const target of targets) {
      style[target] = toStyleValue(key, value)
    }
  }

  return style as CSSProperties
}

/**
 * 在组件内部解析样式简写属性。
 *
 * 返回的 `style` 直接绑定到根元素：`:style="[ownStyle, style]"`。
 * 已自动跳过组件自身声明的同名 prop（如 s-flex 的 w/h/flex/gap），避免重复应用。
 */
export function useStyleProps(): { style: ComputedRef<CSSProperties> } {
  const instance = getCurrentInstance()

  const style = computed<CSSProperties>(() => {
    // 优先取 props（全局 mixin 会把样式简写声明为 prop），attrs 作为兜底
    const source = {
      ...(instance?.attrs ?? {}),
      ...(instance?.props ?? {}),
    }
    return resolveStyleProps(source, { exclude: getOwnPropKeys(instance?.type) })
  })

  return { style }
}

/** 供 app.mixin 使用的全局样式属性声明 */
export const styleProps = Object.fromEntries(
  (Object.keys(STYLE_PROP_MAP) as SybzStylePropKey[]).map((key) => [key, { type: [String, Number] }]),
) as Record<SybzStylePropKey, { type: unknown }>

/**
 * 全局 mixin：让所有 sybz 组件自动接受样式简写属性，并暴露 `$styleProps` 计算属性。
 * 在 packages/index.ts 的 install 中通过 app.mixin(stylePropsMixin) 注册。
 */
export const stylePropsMixin = {
  props: styleProps,
  computed: {
    $styleProps(): CSSProperties {
      const instance = (this as any).$
      return resolveStyleProps(this.$props, { exclude: getOwnPropKeys(instance?.type) })
    },
  },
}
