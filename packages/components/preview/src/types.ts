export type PreviewType = 'auto' | 'txt' | 'csv' | 'tsv' | 'pdf' | 'md' | 'word' | 'excel'

export interface PreviewProps {
  /** 文件地址 */
  src: string
  /** 文件名，也用于无扩展名地址的格式识别 */
  name?: string
  /** 弹窗标题，默认使用文件名 */
  title?: string
  /** 预览格式，默认 auto */
  type?: PreviewType
  /** 容器内或弹窗预览，默认 inline */
  mode?: 'inline' | 'dialog'
  /** 在弹窗标题栏显示下载按钮，默认 true；inline 模式不显示 */
  download?: boolean
  /** 禁用弹窗触发按钮，默认 false */
  disabled?: boolean
  width?: string | number | boolean
  w?: string | number | boolean
  height?: string | number | boolean
  h?: string | number | boolean
}
