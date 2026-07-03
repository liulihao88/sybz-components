<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
import { createRenderContext } from '@/components/common/render'

defineOptions({
  name: 'RenderLabel',
})
interface RenderLabelProps {
  render: (...args: any[]) => any
  item?: Record<string, any>
}

const props = withDefaults(defineProps<RenderLabelProps>(), {
  item: undefined,
})
const renderComponent = () => {
  return props.render(createRenderContext({ item: props.item, row: props.item, column: props.item }))
}
</script>
