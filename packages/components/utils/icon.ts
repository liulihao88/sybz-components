import { h } from 'vue'
import { Icon as IconifyIcon } from '@iconify/vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { toLine } from '@sybz-components/utils'

export const isRemoteIconUrl = (icon: unknown): icon is string =>
  typeof icon === 'string' && /^(?:https?:)?\/\//i.test(icon)

export const isIconifyIconName = (icon: unknown): icon is string =>
  typeof icon === 'string' && /^(?:@[a-z\d._-]+:)?[a-z\d][a-z\d._-]*:[a-z\d][a-z\d._-]*$/i.test(icon)

export const isEmojiIcon = (icon: unknown): icon is string =>
  typeof icon === 'string' && /\p{Extended_Pictographic}/u.test(icon)

const elementPlusIconNames = new Set(Object.keys(ElementPlusIconsVue).map(toLine))

export const isElementPlusIconName = (icon: unknown): icon is string => {
  if (typeof icon !== 'string') return false
  if (icon.startsWith('el-icon-')) return elementPlusIconNames.has(icon.slice('el-icon-'.length))
  return elementPlusIconNames.has(toLine(icon))
}

export const resolveIconValue = (icon: unknown) => {
  if (typeof icon !== 'string' || !icon) return icon
  if (isRemoteIconUrl(icon)) {
    return () =>
      h('img', {
        src: icon,
        alt: '',
        'aria-hidden': true,
        style: {
          display: 'block',
          width: '1em',
          height: '1em',
          objectFit: 'contain',
        },
      })
  }
  if (isIconifyIconName(icon)) {
    return () => h(IconifyIcon, { icon, 'aria-hidden': true })
  }
  if (isEmojiIcon(icon)) {
    return () => h('span', { 'aria-hidden': true }, icon)
  }
  if (isElementPlusIconName(icon)) return `el-icon-${toLine((icon as string).replace(/^el-icon-/, ''))}`
  return () => h('i', { class: icon, 'aria-hidden': true })
}
