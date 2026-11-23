import { h, type Component, type VNode } from 'vue'
import { STYLE_PROP_MAP, resolveStyleProps } from '@/hooks/useStyleProps'
import STag from '@/components/tag/src/index.vue'
import SText from '@/components/text/src/index.vue'

/**
 * 富文本里允许直接书写的 sybz 组件标签。
 *
 * 写成 `<s-text type="danger">你好</s-text>` 时会渲染真实的 s-text 组件，
 * 属性按组件 prop 解析，`c / bg / fs / p` 等样式简写继续由 useStyleProps 生效。
 */
const getRichTextComponent = (tagName: string): Component | undefined => {
  if (tagName === 's-text') return SText
  if (tagName === 's-tag') return STag
}

const ALLOWED_HTML_TAGS = new Set([
  'a',
  'b',
  'blue',
  'br',
  'button',
  'code',
  'div',
  'em',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'hr',
  'i',
  'img',
  'li',
  'mark',
  'ol',
  'p',
  'pre',
  's',
  'span',
  'strong',
  'u',
  'ul',
])

const ALLOWED_GLOBAL_ATTRIBUTES = new Set(['class', 'title'])
const ALLOWED_ATTRIBUTES_BY_TAG: Record<string, Set<string>> = {
  button: new Set(['type']),
  code: new Set(['type', 'v-pre']),
  mark: new Set(['type']),
  a: new Set(['href', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height']),
  pre: new Set(['v-pre']),
}

/** s-text 的 component 属性只允许这些安全标签，避免通过字符串插入 script 等元素 */
const SAFE_TEXT_COMPONENT_TAGS = new Set([
  'span',
  'p',
  'div',
  'strong',
  'small',
  'code',
  'mark',
  'b',
  'i',
  'em',
  'u',
  's',
])

/** 裸写时等价于 true 的样式简写（与 useStyleProps 的取值规则保持一致） */
const BOOLEAN_STYLE_PROP_KEYS = new Set([
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
  'cursor',
])

const normalizeName = (name: string) => name.replace(/[-_]/g, '').toLowerCase()

const STYLE_PROP_BY_NORMALIZED_NAME = new Map(
  (Object.keys(STYLE_PROP_MAP) as (keyof typeof STYLE_PROP_MAP)[]).map((key) => [normalizeName(key), key]),
)

const PROP_MAP_CACHE = new WeakMap<Component, Map<string, { key: string; def: any }>>()

/** 组件的 prop 名（lineClamp / line-clamp / lineclamp 都能命中），并补上全局样式简写 */
const getComponentPropMap = (component: Component) => {
  const cached = PROP_MAP_CACHE.get(component)
  if (cached) return cached

  const map = new Map<string, { key: string; def: any }>()
  const props = (component as any).props ?? {}

  Object.entries(props).forEach(([key, def]) => {
    map.set(normalizeName(key), { key, def })
  })

  Object.keys(STYLE_PROP_MAP).forEach((key) => {
    const normalized = normalizeName(key)
    if (!map.has(normalized)) map.set(normalized, { key, def: null })
  })

  PROP_MAP_CACHE.set(component, map)
  return map
}

const coerceComponentProp = (key: string, value: string, def: any) => {
  // 样式简写：保留字符串，裸写时按 useStyleProps 的规则转成 true
  if (!def) {
    if (value !== '') return value
    return BOOLEAN_STYLE_PROP_KEYS.has(key) ? true : ''
  }

  const type = def.type
  const types = (Array.isArray(type) ? type : [type]).filter(Boolean) as unknown[]
  if (!types.length) return value

  const lowerValue = value.toLowerCase()

  // 只有对象 / 数组类型（如 options、config）无法从字符串安全还原，交给插槽写法
  if (!types.includes(String) && !types.includes(Boolean) && !types.includes(Number)) return undefined

  if (types.includes(String) && value !== '' && lowerValue !== 'true' && lowerValue !== 'false') return value

  if (types.includes(Boolean)) {
    if (value === '' || lowerValue === 'true') return true
    if (lowerValue === 'false') return false
    if (!types.includes(String)) return true
  }

  if (!types.includes(String) && types.includes(Number)) {
    const number = Number(value)
    return Number.isNaN(number) ? value : number
  }

  return value
}

const isSafeUrl = (value: string) => {
  const trimmedValue = value.trim()

  if (!trimmedValue) return false
  if (trimmedValue.startsWith('#') || trimmedValue.startsWith('/')) return true

  return /^(https?:|mailto:|tel:)/i.test(trimmedValue)
}

const isAllowedAttribute = (tagName: string, attributeName: string) => {
  return (
    attributeName.startsWith('data-') ||
    ALLOWED_GLOBAL_ATTRIBUTES.has(attributeName) ||
    ALLOWED_ATTRIBUTES_BY_TAG[tagName]?.has(attributeName)
  )
}

/** 原生标签：保留白名单属性，code / mark 额外把样式简写编译成 style */
const buildNativeProps = (element: HTMLElement, tagName: string, theme?: string) => {
  const props: Record<string, any> = {}
  const styleProps: Record<string, unknown> = {}

  Array.from(element.attributes).forEach((attribute) => {
    const name = attribute.name.toLowerCase()
    const value = attribute.value

    if (tagName === 'code' || tagName === 'mark') {
      const styleKey = STYLE_PROP_BY_NORMALIZED_NAME.get(normalizeName(name))
      if (styleKey) {
        styleProps[styleKey] = value
        return
      }
    }

    if (name === 'v-pre' || !isAllowedAttribute(tagName, name)) return
    if ((name === 'href' || name === 'src') && !isSafeUrl(value)) return

    if (name === 'target' && value === '_blank') props.rel = 'noopener noreferrer'
    props[name] = value
  })

  const style = resolveStyleProps(styleProps, { theme })
  if (Object.keys(style).length) props.style = style

  if (tagName === 'mark') {
    const classes = new Set(
      String(props.class ?? '')
        .split(/\s+/)
        .filter(Boolean),
    )
    classes.add('s-mark')
    if (theme && theme !== 'default') classes.add(`s-mark--${theme}`)
    props.class = [...classes].join(' ')
  }

  return props
}

/** 组件标签：只把组件认识的 prop、样式简写和 class / title 传下去 */
const buildComponentProps = (element: HTMLElement, component: Component, theme?: string) => {
  const propMap = getComponentPropMap(component)
  const props: Record<string, any> = {}

  Array.from(element.attributes).forEach((attribute) => {
    const name = attribute.name.toLowerCase()
    const value = attribute.value

    // 事件、原生 style、v-pre 不允许从字符串注入
    if (name.startsWith('on') || name === 'style' || name === 'v-pre') return

    if (name === 'class' || name === 'title') {
      props[name] = value
      return
    }

    const entry = propMap.get(normalizeName(name))
    if (!entry) return

    // s-text 的根元素不允许被字符串改成 script / iframe 等
    if (entry.key === 'component' && !SAFE_TEXT_COMPONENT_TAGS.has(value.toLowerCase())) return

    const coercedValue = coerceComponentProp(entry.key, value, entry.def)
    if (coercedValue === undefined) return
    props[entry.key] = coercedValue
  })

  // 未显式写 theme 时跟随标题主题，保证字符串里的组件和标题同一套颜色
  if (theme && theme !== 'default' && props.theme === undefined && propMap.has('theme')) {
    props.theme = theme
  }

  return props
}

const convertChildren = (parent: Node, theme?: string): (VNode | string)[] => {
  const nodes: (VNode | string)[] = []

  parent.childNodes.forEach((child) => {
    if (child.nodeType === Node.COMMENT_NODE) return

    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.nodeValue ?? ''
      if (text) nodes.push(text)
      return
    }

    if (child.nodeType !== Node.ELEMENT_NODE) return

    const element = child as HTMLElement
    const tagName = element.tagName.toLowerCase()
    const component = getRichTextComponent(tagName)

    if (component) {
      const children = convertChildren(element, theme)
      nodes.push(
        h(
          component,
          buildComponentProps(element, component, theme),
          children.length ? { default: () => children } : undefined,
        ),
      )
      return
    }

    if (!ALLOWED_HTML_TAGS.has(tagName)) {
      const text = element.textContent ?? ''
      if (text) nodes.push(text)
      return
    }

    nodes.push(h(tagName, buildNativeProps(element, tagName, theme), convertChildren(element, theme)))
  })

  return nodes
}

/**
 * 把受信任的白名单 HTML 字符串转换成 VNode。
 *
 * 与直接 v-html 的区别：`<s-text>` / `<s-tag>` 会渲染成真实组件，
 * 因此组件属性（含样式简写）在 title / append / subTitle 字符串里同样生效。
 */
export const createRichTextNodes = (content: string, options: { theme?: string } = {}): (VNode | string)[] | string => {
  if (!content) return []

  // SSR 等没有 DOM 的环境退化为纯文本，避免输出未转义的 HTML
  if (typeof DOMParser === 'undefined' || typeof document === 'undefined') return content

  const parsedDocument = new DOMParser().parseFromString(content, 'text/html')
  return convertChildren(parsedDocument.body, options.theme)
}
