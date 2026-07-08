import type { App, Component } from 'vue'
import type { SybzComponentsInstallOptions } from '@/types/index.ts'

import SChart from '../../chart/index.ts'
import SCountBar from '../countBar/index.ts'
import SCountBarOld from '../countBarOld/index.ts'
import SObjectLine from '../objectLine/index.ts'
import SQuotaPie from '../quotaPie/index.ts'
import { GLOBAL_COMPONENT_COMMON_PROPS_KEY, GLOBAL_COMPONENT_CONFIG_KEY } from '@/hooks/useGlobalComponentConfig'

type InstallableComponent = Component & {
  name?: string
  __name?: string
}

const allChartComponents = {
  SChart,
  SCountBar,
  SCountBarOld,
  SObjectLine,
  SQuotaPie,
}

export const chartComponents = Object.values(allChartComponents).reduce<Record<string, InstallableComponent>>(
  (acc, component) => {
    const name = component.name || 's' + component.__name
    acc[name] = component
    return acc
  },
  {},
)

export { SChart, SCountBar, SCountBarOld, SObjectLine, SQuotaPie }

const isConfigRecord = (value: unknown): value is Record<string, any> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1)

const getComponentOptionKey = (component: any) => {
  const name = component.name || `s${component.__name || ''}`

  if (!name) return ''

  if (/^S[A-Z]/.test(name)) {
    return lowerFirst(name.slice(1))
  }

  return lowerFirst(name)
}

const componentConfigKeys = new Set(Object.values(allChartComponents).map(getComponentOptionKey).filter(Boolean))

const resolveGlobalComponentConfig = (options: SybzComponentsInstallOptions = {}) => {
  if (!isConfigRecord(options)) return {}

  const commonProps: Record<string, any> = {}
  const resolvedConfig: Record<string, Record<string, any>> = {}

  Object.entries(options).forEach(([key, value]) => {
    if (componentConfigKeys.has(key)) {
      if (isConfigRecord(value)) {
        resolvedConfig[key] = value
      }
      return
    }

    commonProps[key] = value
  })

  if (Object.keys(commonProps).length) {
    resolvedConfig[GLOBAL_COMPONENT_COMMON_PROPS_KEY] = commonProps
  }

  return resolvedConfig
}

const install = (app: App, options: SybzComponentsInstallOptions = {}) => {
  const componentDefaults = resolveGlobalComponentConfig(options)

  if (Object.keys(componentDefaults).length) {
    app.provide(GLOBAL_COMPONENT_CONFIG_KEY, componentDefaults)
  }

  Object.values(chartComponents).forEach((component) => {
    app.component(component.name || 's' + component.__name, component)
  })
}

export default {
  install,
  ...chartComponents,
}
