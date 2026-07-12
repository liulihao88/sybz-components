<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { SFormContext, SFormRender } from '@/types/component-props'
export default defineComponent({
  name: 'RenderComp',
  props: {
    render: {
      type: Function as PropType<SFormRender>,
      default: () => null,
    },
    context: {
      type: Object as PropType<SFormContext>,
      required: true,
    },
  },
  setup(props) {
    return () => props.render(props.context)
  },
})
</script>
