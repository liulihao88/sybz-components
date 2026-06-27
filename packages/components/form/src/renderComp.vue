<script lang="ts">
import { defineComponent, h, type PropType } from 'vue'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: {
      type: Function as PropType<(...args: any[]) => any>,
      default: () => null,
    },
    item: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
  },
  render(ctx) {
    return ctx.render(ctx?.item) ?? h('div')
  },
})
</script>
