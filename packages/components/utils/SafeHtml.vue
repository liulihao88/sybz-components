<script lang="ts">
import { computed, defineComponent, h, type PropType } from 'vue'
import { createRichTextNodes } from './safeHtml'

export default defineComponent({
  name: 'SafeHtml',
  inheritAttrs: false,
  props: {
    html: { type: [String, Number], default: '' },
    tag: { type: String as PropType<'span' | 'div'>, default: 'span' },
    /** 主题：组件标签和 code / mark 的颜色 token 都按该主题解析 */
    theme: { type: String, default: 'default' },
  },
  setup(props, { attrs }) {
    const nodes = computed(() => createRichTextNodes(String(props.html ?? ''), { theme: props.theme }))

    return () => h(props.tag, attrs, nodes.value)
  },
})
</script>
