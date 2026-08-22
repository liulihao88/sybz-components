<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import type { ImageInstance } from 'element-plus'
import { processWidth } from '@sybz-components/utils'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import type { SImageSrcResolver } from '@/types/component-props'

defineOptions({
  name: 'SImage',
  inheritAttrs: false,
})

interface SImageSelfProps {
  src?: string
  width?: string | number
  height?: string | number
  basePath?: string
  resolver?: SImageSrcResolver
  preview?: boolean
  previewSrcList?: string[]
}

const props = withDefaults(defineProps<SImageSelfProps>(), {
  src: '',
  width: undefined,
  height: undefined,
  basePath: '',
  resolver: undefined,
  preview: false,
  previewSrcList: () => [],
})

const attrs = useAttrs()
const imageRef = ref<ImageInstance>()
const mergedProps = useGlobalComponentConfig('image', props)
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

defineExpose({
  showPreview,
})
</script>

<template>
  <el-image ref="imageRef" v-bind="imageAttrs" class="s-image">
    <template v-for="(slot, name) in $slots" #[name]="scope">
      <slot :name="name" v-bind="scope ?? {}" />
    </template>
  </el-image>
</template>
