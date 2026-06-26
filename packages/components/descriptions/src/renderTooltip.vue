<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
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
  return props.render(props?.item)
}
</script>
