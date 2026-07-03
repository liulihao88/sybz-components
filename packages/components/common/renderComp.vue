<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { createRenderContext, renderVNode, type RenderFunction, type RenderRecord } from './render'

export default defineComponent({
  name: 'RenderComp',
  props: {
    render: {
      type: Function as PropType<RenderFunction>,
      default: () => null,
    },
    item: {
      type: null as unknown as PropType<any>,
      default: undefined,
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
    event: {
      type: Object as PropType<Event>,
      default: undefined,
    },
    extra: {
      type: Object as PropType<RenderRecord>,
      default: undefined,
    },
  },
  render(ctx) {
    return renderVNode(
      ctx.render,
      createRenderContext({
        row: ctx.row,
        scope: ctx.scope,
        value: ctx.value,
        column: ctx.column,
        action: ctx.action,
        index: ctx.index,
        event: ctx.event,
        item: ctx.item,
        extra: ctx.extra,
      }),
    )
  },
})
</script>
