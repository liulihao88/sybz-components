import type { CSSProperties } from 'vue'

export type JsonData = string | number | boolean | unknown[] | Record<string, unknown> | null
export type JsonTheme = 'light' | 'dark'

export interface JsonChangePayload {
  text: string
  data?: JsonData
  valid: boolean
  error: string
}

export interface JsonProps {
  /** 结构化 JSON 数据；传入后优先于 data，通过默认 v-model 同步合法的编辑结果 */
  modelValue?: JsonData
  /** 结构化 JSON 数据，内容合法时通过 v-model:data 同步编辑结果 */
  data?: JsonData
  /** 是否禁用编辑，默认值：false */
  disabled?: boolean
  /** 缩进空格数，默认值：2 */
  indent?: number
  /** 是否显示行号，默认值：true */
  lineNumbers?: boolean
  /** 是否显示格式化、压缩和复制工具栏，默认值：true */
  toolbar?: boolean
  /** 是否显示 JSON 校验状态，默认值：true */
  showStatus?: boolean
  /** 编辑器为空时的占位文字，默认值：请输入 JSON */
  placeholder?: string
  /** 编辑器高度，数字按 px 处理；默认由容器或最小高度决定 */
  height?: string | number
  /** 编辑器最小高度，默认值：240 */
  minHeight?: string | number
  /** 显示主题，默认值：light */
  theme?: JsonTheme
  /** 根节点额外样式 */
  style?: CSSProperties
}

export interface JsonExposed {
  format: () => boolean
  compact: () => boolean
  copy: () => Promise<boolean>
  focus: () => void
  getText: () => string
  getData: () => JsonData | undefined
}

export type JsonEmits = {
  'update:modelValue': [value: JsonData]
  'update:data': [value: JsonData]
  change: [payload: JsonChangePayload]
  validChange: [valid: boolean, error: string]
  format: [value: string]
  compact: [value: string]
  copy: [value: string]
}
