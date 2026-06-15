import './styles/index.scss'

// 全局注册vue-tippy
import 'tippy.js/dist/tippy.css'
import 'tippy.js/themes/light.css'
import VueTippy from 'vue-tippy'

import registerDirectives from './directives/gDirectives.js'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { toLine } from './utils/src/index.ts'
import type { SybzComponentsInstallOptions } from './types/index.ts'

import SSvg from './components/svg/index.ts'
import { GLOBAL_COMPONENT_COMMON_PROPS_KEY, GLOBAL_COMPONENT_CONFIG_KEY } from './hooks/useGlobalComponentConfig'

const componentsGlobal = import.meta.glob('./components/*/index.ts', { eager: true, import: 'default' }) // 引入全局基础组件
const componentsCompany = import.meta.glob('./components/company/*/index.ts', { eager: true, import: 'default' }) // 引入业务组件

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

const componentConfigKeys = new Set(Object.values(allComponents).map(getComponentOptionKey).filter(Boolean))

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

const install = (app, options: SybzComponentsInstallOptions = {}) => {
  const componentDefaults = resolveGlobalComponentConfig(options)

  if (Object.keys(componentDefaults).length) {
    app.provide(GLOBAL_COMPONENT_CONFIG_KEY, componentDefaults)
  }

  Object.keys(allComponents).forEach((key) => {
    let component = allComponents[key]
    app.component(component.name || 's' + component.__name, component)
  })
  registerDirectives(app)

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(`el-icon-${toLine(key)}`, component)
  }
  app.use(VueTippy)
}

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  install(window.Vue)
}

export function createSvg(iconDirs) {
  let res = {
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
