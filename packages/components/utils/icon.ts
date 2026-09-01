export const isRemoteIconUrl = (icon: unknown): icon is string =>
  typeof icon === 'string' && /^(?:https?:)?\/\//i.test(icon)

export const isIconifyIconName = (icon: unknown): icon is string =>
  typeof icon === 'string' && /^(?:@[a-z\d._-]+:)?[a-z\d][a-z\d._-]*:[a-z\d][a-z\d._-]*$/i.test(icon)
