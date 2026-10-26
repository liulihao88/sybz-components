import { ElImage } from 'element-plus'
import type { SImageProps, SImageSelfProps, SImageSrcResolver } from '../component-props'
import type { SybzDimensionProps, SybzStyleProps } from '../component-props'

type ElImageInstance = InstanceType<typeof ElImage>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/image/home.html | 查看文档}
 *
 * s-image 图片组件，完整兼容 Element Plus Image，并支持宽高、公共基础路径和源码资源解析。
 *
 * 先提示 sybz 自身属性，再提示 Element Plus Image 的公开属性。
 */
export type SImagePublicProps = SImageSelfProps & Omit<ElImageInstance['$props'], keyof SImageSelfProps>

/**
 * {@link https://liulihao88.github.io/sybz-components/components/image/home.html | 查看文档}
 */
export type SImageComponent = {
  install: (app: import('vue').App) => void
  new <SImage文档 = 'https://liulihao88.github.io/sybz-components/components/image/home.html'>(): {
    $props: {
      /** 图片地址；相对路径会通过 resolver 或 basePath 解析 */
      src?: string
      /** 相对图片的公共基础路径 */
      basePath?: string
      /** 源码资源解析函数，通常由 createImageResolver 创建 */
      resolver?: SImageSrcResolver
      /** 是否直接使用当前 src 开启单图预览 */
      preview?: boolean
      /** 图片预览地址列表，相对路径同样会被解析 */
      previewSrcList?: string[]
    } & Omit<
      ElImageInstance['$props'],
      'src' | 'width' | 'w' | 'height' | 'h' | 'basePath' | 'resolver' | 'preview' | 'previewSrcList'
    > &
      SybzStyleProps &
      SybzDimensionProps<SImageSelfProps>
    $emit: ElImageInstance['$emit']
    $slots: ElImageInstance['$slots'] & Record<string, (...args: any[]) => any>
    showPreview: () => void
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/image/home.html | 查看文档}
 */
declare const SImage: SImageComponent
export default SImage
