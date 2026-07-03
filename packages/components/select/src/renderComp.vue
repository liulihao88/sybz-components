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
  setup(props) {
    return () =>
      renderVNode(
        props.render,
        createRenderContext({
          item: props.item,
          row: props.row,
          scope: props.scope,
          value: props.value,
          column: props.column,
          action: props.action,
          index: props.index,
        }),
      )
  },
})
</script>
