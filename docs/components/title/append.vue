<script setup lang="ts">
import { computed, ref } from 'vue'

const append = ref('草稿')
const appendFontSize = ref('默认')
const appendAttrs = computed(() => (appendFontSize.value === '默认' ? {} : { fontSize: appendFontSize.value }))
</script>

<template>
  <s-flex direction="column" gap="16">
    <s-radio v-model="append" :options="['草稿', '已发布', '']" type="simple" title="append（字符串，默认空字符串）" />
    <s-radio
      v-model="appendFontSize"
      :options="['默认', '12px', '16px', '20px']"
      type="simple"
      title="appendAttrs.fontSize（可选：默认 / 12px / 16px / 20px；默认未设置）"
    />
    <s-title
      title="教材自动打标任务"
      :append="append"
      :append-attrs="appendAttrs"
      sub-title="312 个节点已自动生成 · 3 条异常提示"
    />
    <s-title title="审核任务" append="此文本由插槽覆盖" :append-attrs="appendAttrs" sub-title="副标题始终显示在下一行">
      <template #append>待处理</template>
      <template #extra><s-button size="small">查看</s-button></template>
    </s-title>
  </s-flex>
</template>
