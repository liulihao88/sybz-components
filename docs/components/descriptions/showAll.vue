<script setup lang="ts">
const options = [
  {
    label: '继承根级 showAll',
    value:
      '这一项未单独设置 showAll，因此继承根级 true，完整显示这段较长内容，不使用 Tooltip 截断。这一项未单独设置 showAll，因此继承根级 true，完整显示这段较长内容，不使用 Tooltip 截断。这一项未单独设置 showAll，因此继承根级 true，完整显示这段较长内容，不使用 Tooltip 截断。这一项未单独设置 showAll，因此继承根级 true，完整显示这段较长内容，不使用 Tooltip 截断。',
  },
  {
    label: '单项 showAll=false',
    value:
      '这一项设置 showAll=false，优先于根级 true，内容按 Tooltip 方式省略展示；鼠标移入后可以查看完整内容。这一项设置 showAll=false，优先于根级 true，内容按 Tooltip 方式省略展示；鼠标移入后可以查看完整内容。这一项设置 showAll=false，优先于根级 true，内容按 Tooltip 方式省略展示；鼠标移入后可以查看完整内容。这一项设置 showAll=false，优先于根级 true，内容按 Tooltip 方式省略展示；鼠标移入后可以查看完整内容。',
    showAll: false,
  },
]
</script>

<template>
  <s-descriptions
    :options="options"
    :show-all="true"
    :column="1"
    label-width="180"
    width="100%"
    :tooltip-attrs="{
      popperStyle: { width: '400px', maxWidth: '400px', whiteSpace: 'normal' },
    }"
  />
</template>
