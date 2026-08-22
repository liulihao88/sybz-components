import type { SImageSrcResolver } from '@/types/component-props'

const trimSlashes = (value: string) => value.replace(/^\/+|\/+$/g, '')

/**
 * 把 Vite import.meta.glob 生成的资源表转换为 s-image 可用的图片解析器。
 */
export const createImageResolver = (
  modules: Record<string, unknown>,
  basePath = '/src/assets/images',
): SImageSrcResolver => {
  const normalizedBasePath = trimSlashes(basePath)
  const imageMap = new Map<string, string>()

  Object.entries(modules).forEach(([path, moduleValue]) => {
    const normalizedPath = trimSlashes(path)
    const relativePath = normalizedPath.startsWith(`${normalizedBasePath}/`)
      ? normalizedPath.slice(normalizedBasePath.length + 1)
      : normalizedPath
    const resolvedValue =
      typeof moduleValue === 'string' ? moduleValue : (moduleValue as { default?: unknown } | null | undefined)?.default

    if (typeof resolvedValue === 'string') {
      imageMap.set(relativePath, resolvedValue)
    }
  })

  return (src) => imageMap.get(trimSlashes(src))
}
