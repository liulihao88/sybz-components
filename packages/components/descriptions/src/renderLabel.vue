<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
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
  return props.render(props?.item)
}
</script>
