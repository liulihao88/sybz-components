<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { createRenderContext, renderVNode, type RenderFunction, type RenderRecord } from '@/components/common/render'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: {
      type: Function as PropType<RenderFunction>,
      default: () => null,
    },
    item: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    row: {
      type: Object as PropType<RenderRecord>,
      default: undefined,
    },
    scope: {
      type: Object as PropType<RenderRecord>,
      default: undefined,
    },
    value: {
      type: null as unknown as PropType<any>,
      default: undefined,
    },
    column: {
      type: Object as PropType<RenderRecord>,
      default: undefined,
    },
    action: {
      type: Object as PropType<RenderRecord>,
      default: undefined,
    },
    index: {
      type: Number,
      default: undefined,
    },
  },
  render(ctx) {
    return renderVNode(
      ctx.render,
      createRenderContext({
        item: ctx.item,
        row: ctx.row,
        scope: ctx.scope,
        value: ctx.value,
        column: ctx.column,
        action: ctx.action,
        index: ctx.index,
      }),
    )
  },
})
</script>
