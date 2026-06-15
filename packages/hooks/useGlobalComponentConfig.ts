import { computed, getCurrentInstance, inject, type ComputedRef } from 'vue'

export const GLOBAL_COMPONENT_CONFIG_KEY = 'GLOBAL_COMPONENT_CONFIG'
export const GLOBAL_COMPONENT_COMMON_PROPS_KEY = '__globalProps'

type GlobalComponentConfig = Record<string, Record<string, any> | undefined>

const hyphenate = (key: string) => key.replace(/\B([A-Z])/g, '-$1').toLowerCase()
const hasOwn = (target: Record<string, any>, key: string) => Object.prototype.hasOwnProperty.call(target, key)

const getCommonProps = <T extends Record<string, any>>(globalConfig: GlobalComponentConfig, props: T) => {
  const commonProps = globalConfig?.[GLOBAL_COMPONENT_COMMON_PROPS_KEY]
  if (!commonProps) return {}

  return Object.keys(props).reduce<Record<string, any>>((matchedProps, key) => {
    if (hasOwn(commonProps, key)) {
      matchedProps[key] = commonProps[key]
    }
    return matchedProps
  }, {})
}

const getComponentConfig = <T extends Record<string, any>>(
  globalConfig: GlobalComponentConfig,
  componentKey: string,
  props: T,
) => {
  return {
    ...getCommonProps(globalConfig, props),
    ...globalConfig?.[componentKey],
  }
}

const getExplicitProps = <T extends Record<string, any>>(rawProps: Record<string, any> | null | undefined, props: T) => {
  if (!rawProps) return {}

  return Object.keys(props).reduce<Record<string, any>>((explicitProps, key) => {
    if (hasOwn(rawProps, key) || hasOwn(rawProps, hyphenate(key))) {
      explicitProps[key] = props[key]
    }
    return explicitProps
  }, {})
}

const useGlobalComponentConfig = <T extends Record<string, any>>(componentKey: string, props: T) => {
  const globalConfig = inject<GlobalComponentConfig>(GLOBAL_COMPONENT_CONFIG_KEY, {})
  const instance = getCurrentInstance()

  return computed(() => {
    return {
      ...props,
      ...getComponentConfig(globalConfig, componentKey, props),
      ...getExplicitProps(instance?.vnode.props, props),
    }
  }) as ComputedRef<T & Record<string, any>>
}

export default useGlobalComponentConfig
