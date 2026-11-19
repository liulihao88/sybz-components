import type { PreviewProps, PreviewType } from '../../components/preview/src/types'
import type { SybzDimensionProps, SybzStyleProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/preview/home.html | 查看文档}
 *
 * s-preview 文件预览组件，支持 TXT、CSV、TSV、PDF、Word、Excel，以及基于 s-markdown 的 Markdown 预览；弹窗模式可设置 title、fullscreen 并转发额外属性给 s-dialog。
 *
 * 先提示 sybz 自身属性。
 */
export type SPreviewComponent = {
  install: (app: import('vue').App) => void
  new <SPreview文档 = 'https://liulihao88.github.io/sybz-components/components/preview/home.html'>(): {
    $props: {
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
      /** 在弹窗标题栏显示全屏按钮，默认 true；inline 模式不显示 */
      fullscreen?: boolean
      /** 禁用弹窗触发按钮，默认 false */
      disabled?: boolean
    } & SybzStyleProps &
      SybzDimensionProps<PreviewProps>
    $slots: {
      default?: () => any
      fallback?: () => any
    }
    open: () => void
    close: () => void
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/preview/home.html | 查看文档}
 */
declare const SPreview: SPreviewComponent
export default SPreview
