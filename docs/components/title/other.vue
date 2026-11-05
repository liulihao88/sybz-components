<script setup lang="ts">
import { computed, ref } from 'vue'

const fontSize = ref('默认')
const subTitleAttrs = computed(() => (fontSize.value === '默认' ? {} : { fontSize: fontSize.value }))
</script>

<template>
  <s-flex direction="column" gap="16px">
    <s-radio
      v-model="fontSize"
      :options="['默认', '14px', '20px', '30px']"
      type="simple"
      title="subTitleAttrs.fontSize（可选：默认 / 14px / 20px / 30px；默认值：未设置）"
    />
    <s-title
      title="双向细目表"
      type="simple"
      sub-title="按当前题目的知识点、题型和难度统计。"
      sub-title-position="bottom"
      :sub-title-attrs="subTitleAttrs"
    />
  </s-flex>
</template>
