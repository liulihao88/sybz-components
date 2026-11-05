<script setup lang="ts">
import { computed, ref, useAttrs, useSlots } from 'vue'
import type { ImageInstance } from 'element-plus'
import { Download, FullScreen, RefreshLeft, RefreshRight, ZoomIn, ZoomOut } from '@element-plus/icons-vue'
import { $toast, processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import { useStyleProps } from '@/hooks/useStyleProps'
import type { SImageSrcResolver } from '@/types/component-props'

defineOptions({
  name: 'SImage',
  inheritAttrs: false,
})

interface SImageSelfProps {
  src?: string
  width?: string | number | boolean
  w?: string | number | boolean
  height?: string | number | boolean
  h?: string | number | boolean
  basePath?: string
  resolver?: SImageSrcResolver
  preview?: boolean
  download?: boolean
  downloadFileName?: string
  previewSrcList?: string[]
}

const props = withDefaults(defineProps<SImageSelfProps>(), {
  src: '',
  width: undefined,
  height: undefined,
  basePath: '',
  resolver: undefined,
  preview: false,
  download: true,
  downloadFileName: '',
  previewSrcList: () => [],
})

const attrs = useAttrs()
const slots = useSlots()
const forwardedSlotNames = computed(() => Object.keys(slots).filter((name) => name !== 'toolbar'))
const imageRef = ref<ImageInstance>()
const mergedProps = useGlobalComponentConfig('image', props)
const { style } = useStyleProps()
const isAbsoluteSource = (src: string) => /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i.test(src)

const resolveSource = (src: string) => {
  if (!src || isAbsoluteSource(src)) return src

  const resolverResult = mergedProps.value.resolver?.(src)
  if (resolverResult) return resolverResult

  const basePath = mergedProps.value.basePath.replace(/\/+$/, '')
  const relativeSrc = src.replace(/^\/+/, '')
  return basePath ? `${basePath}/${relativeSrc}` : src
}

const imageAttrs = computed(() => {
  const resolvedSrc = resolveSource(mergedProps.value.src)
  const previewSrcList = mergedProps.value.previewSrcList.length
    ? mergedProps.value.previewSrcList.map(resolveSource)
    : mergedProps.value.preview && resolvedSrc
      ? [resolvedSrc]
      : []

  return {
    ...attrs,
    src: resolvedSrc,
    previewSrcList,
    style: [
      {
        width: mergedProps.value.width === undefined ? undefined : processWidth(mergedProps.value.width, true),
        height: mergedProps.value.height === undefined ? undefined : processWidth(mergedProps.value.height, true),
      },
      attrs.style,
    ],
  }
})

const showPreview = () => imageRef.value?.showPreview()

const downloadPreviewImage = async (index: number) => {
  const url = imageAttrs.value.previewSrcList[index]
  if (!url) {
    $toast('当前图片没有可下载的地址', 'e')
    return
  }

  let fileName = mergedProps.value.downloadFileName.trim()
  if (!fileName) {
    fileName = `image-${index + 1}`
    try {
      const name = decodeURIComponent(new URL(url, window.location.href).pathname.split('/').pop() || '')
      if (name) fileName = name
    } catch {
      // 无法解析地址时使用默认文件名。
    }
  }
  fileName = fileName.replace(/[\\/:*?"<>|]/g, '-')

  const save = (href: string, openInNewTab = false) => {
    const link = document.createElement('a')
    link.href = href
    link.download = fileName
    if (openInNewTab) {
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
    }
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  try {
    const response = await fetch(url)
    if (!response.ok) {
      $toast(`图片下载失败（${response.status}），请检查图片地址或权限`, 'e')
      return
    }
    const objectUrl = URL.createObjectURL(await response.blob())
    save(objectUrl)
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000)
  } catch {
    // 跨域未开放 CORS 或网络错误时，原地址可能只会打开图片。
    save(url, true)
    $toast('无法自动下载，已尝试打开原图；如未保存，请右键另存为', 'w')
  }
}

defineExpose({
  showPreview,
})
</script>

<template>
  <el-image ref="imageRef" v-bind="imageAttrs" class="s-image" :style="style">
    <template v-for="name in forwardedSlotNames" #[name]="scope">
      <slot :name="name" v-bind="scope ?? {}" />
    </template>
    <template v-if="$slots.toolbar || mergedProps.download" #toolbar="scope">
      <slot v-if="$slots.toolbar" name="toolbar" v-bind="scope" />
      <template v-else>
        <el-icon title="缩小" @click="scope.actions('zoomOut')"><ZoomOut /></el-icon>
        <el-icon title="放大" @click="scope.actions('zoomIn')"><ZoomIn /></el-icon>
        <i class="el-image-viewer__actions__divider" />
        <el-icon title="切换适应模式" @click="scope.reset"><FullScreen /></el-icon>
        <i class="el-image-viewer__actions__divider" />
        <el-icon title="逆时针旋转" @click="scope.actions('anticlockwise')"><RefreshLeft /></el-icon>
        <el-icon title="顺时针旋转" @click="scope.actions('clockwise')"><RefreshRight /></el-icon>
        <i class="el-image-viewer__actions__divider" />
        <el-icon title="下载图片" aria-label="下载图片" @click="downloadPreviewImage(scope.activeIndex)">
          <Download />
        </el-icon>
      </template>
    </template>
  </el-image>
</template>
