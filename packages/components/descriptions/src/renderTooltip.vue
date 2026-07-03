<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
import { createRenderContext } from '@/components/common/render'

defineOptions({
  name: 'RenderTooltip',
})
interface RenderTooltipProps {
  render: (...args: any[]) => any
  item?: Record<string, any>
}

const props = withDefaults(defineProps<RenderTooltipProps>(), {
  item: undefined,
})
const renderComponent = () => {
  return props.render(createRenderContext({ item: props.item, row: props.item, column: props.item }))
}
</script>
