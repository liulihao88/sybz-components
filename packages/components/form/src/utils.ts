export type FormPath = string | number | Array<string | number>

const indexKeyPattern = /^\d+$/

export const normalizeFormPath = (path?: FormPath) => {
  if (Array.isArray(path)) {
    return path.map((item) => String(item)).filter(Boolean)
  }

  if (path === undefined || path === null || path === '') {
    return []
  }

  return String(path)
    .replace(/\[(\w+)\]/g, '.$1')
    .split('.')
    .filter(Boolean)
}

export const getValueByPath = <T = unknown>(source: unknown, path?: FormPath, fallback?: T): T | undefined => {
  const keys = normalizeFormPath(path)

  if (!keys.length) {
    return source as T
  }

  let current = source as any

  for (const key of keys) {
    if (current === undefined || current === null) {
      return fallback
    }
    current = current[key]
  }

  return current === undefined ? fallback : current
}

export const hasValueByPath = (source: unknown, path?: FormPath) => {
  const keys = normalizeFormPath(path)

  if (!keys.length) {
    return source !== undefined
  }

  let current = source as any

  for (const key of keys) {
    if (current === undefined || current === null || !(key in current)) {
      return false
    }
    current = current[key]
  }

  return true
}

export const setValueByPath = (source: Record<string, any>, path: FormPath, value: unknown) => {
  const keys = normalizeFormPath(path)

  if (!keys.length) {
    return source
  }

  let current = source as any

  keys.forEach((key, index) => {
    const isLast = index === keys.length - 1

    if (isLast) {
      current[key] = value
      return
    }

    if (current[key] === undefined || current[key] === null) {
      const nextKey = keys[index + 1]
      current[key] = indexKeyPattern.test(nextKey) ? [] : {}
    }

    current = current[key]
  })

  return source
}

export const cloneDefaultValue = <T>(value: T): T => {
  if (Array.isArray(value)) {
    return value.map((item) => cloneDefaultValue(item)) as T
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as T
  }

  if (value && Object.prototype.toString.call(value) === '[object Object]') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, cloneDefaultValue(item)])) as T
  }

  return value
}

const camelize = (value: string) => value.replace(/-(\w)/g, (_, char: string) => char.toUpperCase())

const capitalize = (value: string) => {
  if (!value) {
    return value
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
}

export const toVueEventProp = (eventName: string) => {
  if (!eventName) {
    return ''
  }

  if (/^on[A-Z]/.test(eventName) || eventName.startsWith('onUpdate:')) {
    return eventName
  }

  if (eventName.includes(':')) {
    const [prefix, ...rest] = eventName.split(':')
    return `on${capitalize(camelize(prefix))}:${camelize(rest.join(':'))}`
  }

  return `on${capitalize(camelize(eventName))}`
}

export const callEventHandler = (handler: unknown, args: unknown[]) => {
  if (Array.isArray(handler)) {
    handler.forEach((item) => callEventHandler(item, args))
    return
  }

  if (typeof handler === 'function') {
    handler(...args)
  }
}
