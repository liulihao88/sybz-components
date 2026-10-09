import { computed, getCurrentInstance, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

type SizeAliases = {
  width?: unknown
  height?: unknown
  w?: unknown
  h?: unknown
}

const hasOwn = (value: Record<string, unknown> | null | undefined, key: string) =>
  Object.prototype.hasOwnProperty.call(value, key)

export const resolveSizeAliases = <T extends SizeAliases>(
  merged: T,
  defaults: SizeAliases,
  configured: Record<string, unknown> = {},
  explicit: Record<string, unknown> | null = null,
): T => {
  const result = { ...merged }

  for (const [name, alias] of [
    ['width', 'w'],
    ['height', 'h'],
  ] as const) {
    if (!hasOwn(defaults as Record<string, unknown>, name) || !hasOwn(defaults as Record<string, unknown>, alias)) {
      continue
    }

    if (hasOwn(explicit, name)) result[name] = defaults[name] as T[typeof name]
    else if (hasOwn(explicit, alias)) result[name] = defaults[alias] as T[typeof name]
    else if (hasOwn(configured, name)) result[name] = configured[name] as T[typeof name]
    else if (hasOwn(configured, alias)) result[name] = configured[alias] as T[typeof name]
  }

  return result
}

const useSizeAliases = <T extends SizeAliases>(source: MaybeRefOrGetter<T>) => {
  const instance = getCurrentInstance()
  return computed(() => {
    const props = toValue(source)
    return resolveSizeAliases(props, props, {}, instance?.vnode.props)
  })
}

export default useSizeAliases
