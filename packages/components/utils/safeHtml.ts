import { getCurrentInstance, h, type Component, type VNode } from 'vue'
import { STYLE_PROP_MAP, resolveStyleProps } from '@/hooks/useStyleProps'
import STag from '@/components/tag/src/index.vue'
import SText from '@/components/text/src/index.vue'

/**
 * 富文本里始终可用的 sybz 组件标签。
 *
 * 其他组件会从当前实例的局部组件表和应用的全局组件表中按标签名解析，
 * 因此 `<s-button>`、`<el-button>` 等已注册组件也可以直接写在字符串里。
 *
 * 这里使用函数而不是对象常量，避免 s-text / safeHtml 循环依赖时在模块初始化阶段读取组件。
 */
const getBuiltInRichTextComponent = (tagName: string): Component | undefined => {
  if (tagName === 's-text') return SText
  if (tagName === 's-tag') return STag
}

const toPascalCase = (name: string) =>
  name.replace(/(^|[-_])([a-z])/g, (_match, _separator, letter: string) => letter.toUpperCase())

const toCamelCase = (name: string) => {
  const pascalName = toPascalCase(name)
  return pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
}

const toKebabCase = (name: string) =>
  name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .toLowerCase()

/** 同时尝试 kebab-case、PascalCase 和 camelCase，兼容 s-button / SButton 等不同注册写法 */
const getComponentCandidates = (tagName: string) => [
  ...new Set([tagName, toPascalCase(tagName), toCamelCase(tagName), toKebabCase(tagName)]),
]

const normalizeComponentTagName = (name: string) => name.replace(/[-_]/g, '').toLowerCase()

const findComponentInRegistry = (registry: Record<string, Component>, tagName: string) => {
  for (const candidate of getComponentCandidates(tagName)) {
    const component = registry[candidate]
    if (component) return component
  }

  // HTML 解析会把 <ElButton> 转成 <elbutton>，再用去掉连字符的名称兜底匹配 ElButton
  const normalizedTagName = normalizeComponentTagName(tagName)
  for (const [name, component] of Object.entries(registry)) {
    if (normalizeComponentTagName(name) === normalizedTagName) return component
  }

  return undefined
}

const resolveRichTextComponent = (tagName: string): Component | undefined => {
  const builtInComponent = getBuiltInRichTextComponent(tagName)
  if (builtInComponent) return builtInComponent

  const instance = getCurrentInstance()
  const localComponents = (instance?.type as { components?: Record<string, Component> } | undefined)?.components
  const registries = [localComponents, instance?.appContext.components]

  for (const registry of registries) {
    if (!registry) continue
    const component = findComponentInRegistry(registry, tagName)
    if (component) return component
  }

  return undefined
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
const COMPONENT_URL_ATTRIBUTES = new Set([
  'action',
  'background',
  'cite',
  'data',
  'formaction',
  'href',
  'poster',
  'src',
  'xlink:href',
])
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

/** 组件标签：已声明的 prop 按类型转换，未声明的属性作为透传属性保留 */
const buildComponentProps = (element: HTMLElement, component: Component, theme?: string) => {
  const propMap = getComponentPropMap(component)
  const props: Record<string, any> = {}

  Array.from(element.attributes).forEach((attribute) => {
    const name = attribute.name.toLowerCase()
    const value = attribute.value

    // 事件、原生 style、Vue 指令和 ref 不允许从字符串注入
    if (
      name.startsWith('on') ||
      name.startsWith('@') ||
      name.startsWith(':') ||
      name.startsWith('v-') ||
      name === 'style' ||
      name === 'ref' ||
      name === 'is'
    ) {
      return
    }

    if (name === 'class' || name === 'title') {
      props[name] = value
      return
    }

    const entry = propMap.get(normalizeName(name))

    if (entry) {
      // s-text 的根元素不允许被字符串改成 script / iframe 等
      if (entry.key === 'component' && !SAFE_TEXT_COMPONENT_TAGS.has(value.toLowerCase())) return

      const coercedValue = coerceComponentProp(entry.key, value, entry.def)
      if (coercedValue === undefined) return
      props[entry.key] = coercedValue
      return
    }

    // 未声明的属性继续透传，兼容把 Element Plus 属性放在 $attrs 里的组件（如 s-button 的 type）
    if (name === 'srcdoc') return
    if (COMPONENT_URL_ATTRIBUTES.has(name) && !isSafeUrl(value)) return
    props[name] = value
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

    // 原生白名单标签优先，避免全局注册的 Button / Code 等组件抢占原生标签
    if (ALLOWED_HTML_TAGS.has(tagName)) {
      nodes.push(h(tagName, buildNativeProps(element, tagName, theme), convertChildren(element, theme)))
      return
    }

    const component = resolveRichTextComponent(tagName)

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

    const text = element.textContent ?? ''
    if (text) nodes.push(text)
  })

  return nodes
}

/**
 * 把受信任的白名单 HTML 字符串转换成 VNode。
 *
 * 原生标签按白名单保留；`<s-text>`、`<s-tag>` 内置可用，
 * `<s-button>`、`<el-button>` 等已注册组件会从当前实例和应用的组件表中解析成真实组件，
 * 组件属性（含样式简写）在 title / append / subTitle 字符串里同样生效。
 */
export const createRichTextNodes = (content: string, options: { theme?: string } = {}): (VNode | string)[] | string => {
  if (!content) return []

  // SSR 等没有 DOM 的环境退化为纯文本，避免输出未转义的 HTML
  if (typeof DOMParser === 'undefined' || typeof document === 'undefined') return content

  const parsedDocument = new DOMParser().parseFromString(content, 'text/html')
  return convertChildren(parsedDocument.body, options.theme)
}
