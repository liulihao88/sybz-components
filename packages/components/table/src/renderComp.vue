<script lang="ts">
import { defineComponent, type PropType } from 'vue'
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
  render(ctx) {
    return ctx.render?.({
      row: ctx?.row,
      scope: ctx?.scope,
      value: ctx?.value,
      column: ctx?.column,
      action: ctx?.action,
      index: ctx?.index,
    })
  },
})
</script>
