import type { CSSProperties } from 'vue'
import type { JsonData, JsonEmits, JsonExposed, JsonProps, JsonTheme } from '../../components/json/src/types'

/**
 * s-json JSON 编辑组件，默认 v-model 与 v-model:data 均使用 JsonData，支持 disabled 禁用、键名和值编辑、语法高亮、中文校验提示、格式化、压缩和复制。
 *
 * 先提示 sybz 自身属性。
 */
export type SJsonPublicProps = JsonProps

export type SJsonComponent = {
  new (): {
    $props: {
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
    $slots: Record<string, (...args: any[]) => any>
    $emit: <Event extends keyof JsonEmits>(event: Event, ...args: JsonEmits[Event]) => void
    format: JsonExposed['format']
    compact: JsonExposed['compact']
    copy: JsonExposed['copy']
    focus: JsonExposed['focus']
    getText: JsonExposed['getText']
    getData: JsonExposed['getData']
  }
}

declare const SJson: SJsonComponent
export default SJson
