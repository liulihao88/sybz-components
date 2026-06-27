<template>
  <component :is="renderComponent" />
</template>
<script lang="ts" setup>
defineOptions({
  name: 'RenderComp',
})
interface RenderCompProps {
  render?: (...args: any[]) => any
  item?: Record<string, any>
}

const props = withDefaults(defineProps<RenderCompProps>(), {
  render: () => null,
  item: () => ({}),
})
const renderComponent = () => {
  return props.render(props?.item)
}
</script>
