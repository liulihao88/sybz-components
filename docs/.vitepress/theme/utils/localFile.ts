const INVALID_SOURCE_DIR_VALUES = ['undefined', 'null']

export const getSourceDir = () => {
  const sourceDir = import.meta.env.VITE_SOURCE_DIR

  if (typeof sourceDir !== 'string') {
    return ''
  }

  const normalizedSourceDir = sourceDir.trim()
  if (!normalizedSourceDir || INVALID_SOURCE_DIR_VALUES.includes(normalizedSourceDir)) {
    return ''
  }

  return normalizedSourceDir.replace(/[\\/]+$/, '')
}

export const joinLocalPath = (...segments: string[]) => {
  return segments
    .filter(Boolean)
    .map((segment, index) => {
      if (index === 0) {
        return segment.replace(/[\\/]+$/, '')
      }
      return segment.replace(/^[\\/]+|[\\/]+$/g, '')
    })
    .join('/')
}

export const normalizeFilePath = (path: string) => {
  const normalizedPath = path.replace(/\\/g, '/')

  if (/^[A-Za-z]:\//.test(normalizedPath)) {
    return `/${normalizedPath}`
  }

  return normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`
}

export const buildVscodeFileUrl = (path: string) => {
  return `vscode://file${normalizeFilePath(path)}`
}

export const getDocsBasePath = () => {
  const baseUrl = import.meta.env.BASE_URL || '/'
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
}

export const getComponentDocPath = (pathname: string) => {
  const docsBasePath = `${getDocsBasePath()}/components`
  const normalizedPathname = pathname.split(/[?#]/)[0].replace(/\/+$/, '')

  if (
    normalizedPathname === docsBasePath ||
    normalizedPathname === `${docsBasePath}/index.html` ||
    normalizedPathname === `${docsBasePath}/index.md`
  ) {
    return ''
  }

  const componentDocsBasePath = `${docsBasePath}/`

  if (!normalizedPathname.startsWith(componentDocsBasePath)) {
    return ''
  }

  return normalizedPathname.slice(componentDocsBasePath.length).replace(/\/(?:home|index)(?:\.(?:md|html))?$/, '')
}
