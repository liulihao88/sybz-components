<template>
  <div class="s-wrapper" :class="{ 'with-columns': props.columns }">
    <component :is="item" v-for="(item, index) in validSlots" :key="index" class="col" />
  </div>
</template>

<script setup lang="ts">
import { useSlots, computed, type VNode } from 'vue'
import { processWidth } from '@sybz-components/utils'

defineOptions({
  name: 'SWrapper',
})

interface WrapperProps {
  gap?: string | number
  columns?: number | null
  minWidth?: string | number
}

const props = withDefaults(defineProps<WrapperProps>(), {
  gap: '16px',
  columns: null, // null 表示不分组，保持原样
  minWidth: 0,
})

const gapValue = computed(() => processWidth(props.gap, true))
const minWidthValue = computed(() => processWidth(props.minWidth, true))

const slots = useSlots()

// 只保留元素节点 (过滤掉注释和文本节点)
const validSlots = computed(() => {
  const normalizeNodes = (nodes: VNode[]): VNode[] => {
    return nodes.flatMap((node) => {
      // 1. 跳过注释节点和空白文本节点（原逻辑）
      const isComment = node.type?.toString() === 'Symbol(v-cmt)'
      const isWhitespaceText = node.type?.toString() === 'Symbol(Text)' && !node.children?.toString()?.trim()
      if (isComment || isWhitespaceText) return []

      // 2. 如果它是一个 Fragment（例如 `<template v-for>` 生成的节点），递归处理其 children
      if (node.type?.toString() === 'Symbol(v-fgt)') {
        return normalizeNodes(node.children as VNode[])
      }

      // 3. 如果是真实的元素（如 div/span/组件）或合法的文本节点，保留
      return [node]
    })
  }

  return normalizeNodes(slots.default?.() || [])
})
</script>

<!-- <style lang="scss" scoped>
.s-wrapper {
  display: flex;
  flex-direction: column;
  gap: v-bind('props.gap');

  .row {
    display: flex;
    gap: v-bind('props.gap');

    > :deep(.col),
    > .col {
      // width: calc(100% / v-bind('props.columns || 1'));
      flex: 1;
      min-width: 0; // 防止内容溢出
    }
    .fill-empty {
      visibility: hidden; // 隐藏填充项
      pointer-events: none; // 防止交互
    }
  }
}
</style> -->

<style lang="scss" scoped>
.s-wrapper {
  /* 默认 flex 布局（无 columns） */
  display: flex;
  flex-wrap: nowrap;
  gap: v-bind(gapValue);
  overflow: auto;

  /* 设置了 columns 时切换为 grid 布局 */
  &.with-columns {
    display: grid;
    grid-template-columns: repeat(v-bind('props.columns'), minmax(0, 1fr)); /* 关键点1：强制等宽 */
  }

  /* 所有子项的通用约束 */
  > :deep(.col) {
    min-width: v-bind(minWidthValue); /* 关键点2：允许收缩 */
    flex: 1;
    overflow: hidden; /* 超出隐藏 */
    text-overflow: ellipsis; /* 文字省略号 */
    white-space: wrap; /* 禁止换行（可选） */

    /* 如果内容需要换行（如多行文本），改用以下方案 */
    /*
    display: -webkit-box;
    -webkit-line-clamp: 2;     // 限制行数
    -webkit-box-orient: vertical;
    overflow: hidden;
    */
  }
}
</style>
