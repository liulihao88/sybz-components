<script setup lang="ts">
const options = [
  {
    label: '组件级 tooltipAttrs 控制标签和内容提示宽度',
    value:
      '组件级 tooltipAttrs 会同时传给没有自定义渲染的 label 和 value 提示。本行使用组件级设置，较长文本超出触发区域后可以悬停查看。',
  },
  {
    label: '当前项单独覆盖 tooltip 设置',
    value:
      '当前描述项的 tooltipAttrs 会覆盖组件级同名属性。这里把 lineClamp 改成两行、将弹出位置设置到下方，并使用浅色主题。',
    tooltipAttrs: {
      lineClamp: 2,
      placement: 'bottom',
      effect: 'light',
    },
  },
]

const tooltipAttrs = {
  width: '180px',
  lineClamp: 1,
  placement: 'top',
  showAfter: 200,
}
</script>

<template>
  <s-descriptions :options="options" :tooltip-attrs="tooltipAttrs" :column="1" label-width="180" width="100%" />
</template>
