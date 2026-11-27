import type { SInputTagEmits, SInputTagProps, SInputTagValue, SybzRecord } from '../component-props'
import type { SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/inputTag/home.html | 查看文档}
 *
 * s-input-tag 标签输入组件，按可配置的 splitRegExp 把输入或粘贴的文本（中英文逗号、顿号、分号、空白等）切分成多个标签，支持单个标签正则校验、去重、数量限制、禁用、一键清空、tag 插槽，并可通过 tagAttrs 透传 s-tag 属性；singleLine 默认 true 时单行左右滚动，设为 false 时自动换行、高度随标签数量变化。
 *
 * 先提示 sybz 自身属性。
 */
export type SInputTagComponent = {
  install: (app: import('vue').App) => void
  new <SInputTag文档 = 'https://liulihao88.github.io/sybz-components/components/inputTag/home.html'>(): {
    $props: {
      /** 标签数组，支持字符串或对象数组；默认 [] */
      modelValue?: SInputTagValue[]
      /** 分隔符正则：输入或粘贴时按它切分成多个标签，也可传正则字符串；传 false 关闭自动分割 */
      splitRegExp?: RegExp | string | false
      /** 单个标签的校验正则，校验失败时提示 message */
      regexp?: RegExp
      /** 校验失败提示文案，默认 输入有误 */
      message?: string
      /** 是否允许重复标签，默认 false */
      allowDuplicate?: boolean
      /** 最多允许的标签数量，0 表示不限制，默认 0 */
      maxCount?: number
      /** 是否按对象数组处理，新增标签时写入 { name }；对象项 isDelete 为 0 时不可删除；默认 false */
      isComplex?: boolean
      /** 透传给内部 s-input 的属性，默认 {} */
      inputAttrs?: SybzRecord
      /** 透传给每个标签 s-tag 的属性，如 type / effect / size / round / theme，默认 {} */
      tagAttrs?: SybzRecord
      /** 输入框占位文案，默认 输入后回车 */
      placeholder?: string
      /** 是否只显示一行：默认 true，超出时左右滚动；false 时自动换行、高度随标签数量变化 */
      singleLine?: boolean
      /** 是否禁用，默认 false */
      disabled?: boolean
      /** 是否显示一键清空按钮，默认 true */
      clearable?: boolean
    } & SybzStyleProps
    $slots: {
      tag?: () => any
    }
    $emit: SInputTagEmits
    $getValue: () => SInputTagValue[]
    clearAll: () => void
    focus: () => void
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/inputTag/home.html | 查看文档}
 */
declare const SInputTag: SInputTagComponent
export default SInputTag
