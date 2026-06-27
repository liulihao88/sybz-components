const ALLOWED_HTML_TAGS = new Set([
  'a',
  'b',
  'blue',
  'br',
  'code',
  'div',
  'em',
  'i',
  'img',
  'li',
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
  a: new Set(['href', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height']),
}

const escapeHtml = (content: string) => {
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const isSafeUrl = (value: string) => {
  const trimmedValue = value.trim()

  if (!trimmedValue) {
    return false
  }

  if (trimmedValue.startsWith('#') || trimmedValue.startsWith('/')) {
    return true
  }

  return /^(https?:|mailto:|tel:)/i.test(trimmedValue)
}

const isAllowedAttribute = (tagName: string, attributeName: string) => {
  return ALLOWED_GLOBAL_ATTRIBUTES.has(attributeName) || ALLOWED_ATTRIBUTES_BY_TAG[tagName]?.has(attributeName)
}

export const sanitizeHtml = (content: string) => {
  if (typeof DOMParser === 'undefined' || typeof document === 'undefined') {
    return escapeHtml(content)
  }

  const parsedDocument = new DOMParser().parseFromString(content, 'text/html')
  const cleanNode = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.COMMENT_NODE) {
        child.remove()
        return
      }

      if (child.nodeType !== Node.ELEMENT_NODE) {
        return
      }

      const element = child as HTMLElement
      const tagName = element.tagName.toLowerCase()

      if (!ALLOWED_HTML_TAGS.has(tagName)) {
        element.replaceWith(document.createTextNode(element.textContent ?? ''))
        return
      }

      Array.from(element.attributes).forEach((attribute) => {
        const attributeName = attribute.name.toLowerCase()
        const attributeValue = attribute.value

        if (!isAllowedAttribute(tagName, attributeName)) {
          element.removeAttribute(attribute.name)
          return
        }

        if ((attributeName === 'href' || attributeName === 'src') && !isSafeUrl(attributeValue)) {
          element.removeAttribute(attribute.name)
          return
        }

        if (attributeName === 'target' && attributeValue === '_blank') {
          element.setAttribute('rel', 'noopener noreferrer')
        }
      })

      cleanNode(element)
    })
  }

  cleanNode(parsedDocument.body)
  return parsedDocument.body.innerHTML
}
