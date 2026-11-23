<script lang="ts">
import { defineComponent, Fragment, h, isVNode, Text, type Component, type PropType, type VNode } from 'vue'
import { createRichTextNodes } from './safeHtml'

/**
 * 富文本内容渲染器。
 *
 * 默认插槽中的字符串和文本节点会按 safeHtml 白名单解析成 VNode，
 * 字符串里已全局注册的组件（如 s-button、el-button）会渲染成真实组件，
 * 已有的 Vue 组件和原生元素 VNode 原样保留；也可以通过 `html` 属性直接传入字符串。
 * 不传 `tag` 时使用 Fragment 渲染，不会额外增加 DOM 层级。
 */
export default defineComponent({
  name: 'RichTextContent',
  inheritAttrs: false,
  props: {
    /** 直接传入的 HTML 字符串；传入后优先于默认插槽 */
    html: { type: [String, Number] as PropType<string | number>, default: undefined },
    /** 主题：组件标签和 code / mark 的颜色 token 都按该主题解析 */
    theme: { type: String, default: 'default' },
    /** 可选的外层容器；不传时使用 Fragment，不产生额外 DOM */
    tag: { type: [String, Object, Function] as PropType<string | Component>, default: undefined },
  },
  setup(props, { attrs, slots }) {
    const renderRichNode = (node: VNode | string): (VNode | string)[] => {
      if (typeof node === 'string' || node.type === Text) {
        const result = createRichTextNodes(typeof node === 'string' ? node : String(node.children ?? ''), {
          theme: props.theme,
        })
        return typeof result === 'string' ? [result] : result
      }

      if (node.type === Fragment && Array.isArray(node.children)) {
        return node.children.flatMap((child) =>
          typeof child === 'string' || isVNode(child) ? renderRichNode(child) : [],
        )
      }

      return [node]
    }

    return () => {
      const nodes =
        props.html !== undefined
          ? createRichTextNodes(String(props.html), { theme: props.theme })
          : (slots.default?.() ?? []).flatMap(renderRichNode)
      const children = typeof nodes === 'string' ? [nodes] : nodes

      return props.tag ? h(props.tag, attrs, children) : h(Fragment, null, children)
    }
  },
})
</script>
