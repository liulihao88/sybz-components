<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { createRenderContext, renderVNode } from '@/components/common/render'
import type { STableButton, STableColumn, TableRender, TableRow, TableScope } from './types'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: {
      type: Function as PropType<TableRender>,
      default: () => null,
    },
    scope: {
      type: Object as PropType<TableScope>,
      default: () => ({
        row: {},
        $index: 0,
      }),
    },
    row: {
      type: Object as PropType<TableRow>,
      default: () => ({}),
    },
    value: {
      type: [Object, String, Number, Boolean, Array] as PropType<any>,
      default: undefined,
    },
    column: {
      type: Object as PropType<STableColumn>,
      default: () => ({}),
    },
    action: {
      type: Object as PropType<STableButton>,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    return () =>
      renderVNode(
        props.render,
        createRenderContext({
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
