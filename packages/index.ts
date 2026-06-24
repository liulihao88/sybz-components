import './styles/index.scss'

import type { App, Component } from 'vue'
// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'

import registerDirectives from './directives/gDirectives.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { SybzComponentsInstallOptions } from './types/index.ts'

import SSvg from './components/svg/index.ts'
import { GLOBAL_COMPONENT_COMMON_PROPS_KEY, GLOBAL_COMPONENT_CONFIG_KEY } from './hooks/useGlobalComponentConfig'

type InstallableComponent = Component & {
  name?: string
  __name?: string
}

const componentsGlobal = import.meta.glob<InstallableComponent>('./components/*/index.ts', {
  eager: true,
  import: 'default',
}) // 引入全局基础组件
const componentsCompany = import.meta.glob<InstallableComponent>('./components/company/*/index.ts', {
  eager: true,
  import: 'default',
}) // 引入业务组件

const allComponents = {
  ...componentsGlobal,
  ...componentsCompany,
}

// 1. 批量导出所有组件（作为命名导出）
export const components = Object.entries(allComponents).reduce((acc, [key, component]) => {
  const name = component.name || 's' + component.__name
  acc[name] = component
  return acc
}, {})

// 按需导入
export { SSvg }
export * from './hooks'

const isConfigRecord = (value: unknown): value is Record<string, any> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

const toLine = (text: string, connect = '-') =>
  text
    .replace(/([A-Z])/g, (match, _letter, offset) => (offset === 0 ? match.toLowerCase() : `${connect}${match.toLowerCase()}`))
    .toLowerCase()

const lowerFirst = (value: string) => value.charAt(0).toLowerCase() + value.slice(1)

const getComponentOptionKey = (component: any) => {
  const name = component.name || `s${component.__name || ''}`

  if (!name) return ''

  if (/^S[A-Z]/.test(name)) {
    return lowerFirst(name.slice(1))
  }

  return lowerFirst(name)
}

const componentConfigKeys = new Set(Object.values(allComponents).map(getComponentOptionKey).filter(Boolean))

const installOptionKeys = new Set(['registerDirectives', 'registerElementPlusIcons', 'useTippy'])

const shouldInstallOption = (value: boolean | undefined) => value !== false

const resolveGlobalComponentConfig = (options: SybzComponentsInstallOptions = {}) => {
  if (!isConfigRecord(options)) return {}

  const commonProps: Record<string, any> = {}
  const resolvedConfig: Record<string, Record<string, any>> = {}

  Object.entries(options).forEach(([key, value]) => {
    if (installOptionKeys.has(key)) {
      return
    }

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

  Object.keys(allComponents).forEach((key) => {
    const component = allComponents[key]
    app.component(component.name || 's' + component.__name, component)
  })

  if (shouldInstallOption(options.registerDirectives)) {
    registerDirectives(app)
  }

  if (shouldInstallOption(options.registerElementPlusIcons)) {
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(`el-icon-${toLine(key)}`, component)
    }
  }

  if (shouldInstallOption(options.useTippy)) {
    app.use(VueTippy)
  }
}

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  install(window.Vue)
}

export function createSvg(iconDirs) {
  const res = {
    Svg: (props) => ({
      component: SSvg,
      props: { ...props, iconDirs }, // 将 iconDirs 传递给 SvgIcon 组件
    }),
  }
  return res
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  ...components,
}
