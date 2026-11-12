<script setup lang="ts">
import { computed, ref } from 'vue'

const placement = ref<'top' | 'bottom'>('top')
const showAfter = ref(0)
const tooltipAttrs = computed(() => ({ placement: placement.value, showAfter: showAfter.value }))
</script>

<template>
  <s-flex direction="column" align="start" gap="0">
    <s-radio
      v-model="placement"
      title="tooltipAttrs.placement：top / bottom（默认 top）"
      :options="['top', 'bottom']"
      type="simple"
    />
    <s-radio
      v-model="showAfter"
      :options="[0, 500]"
      type="simple"
      title="tooltipAttrs.showAfter：0 / 500 毫秒（默认 0）"
    />
    <s-tag width="120" :tooltip-attrs="tooltipAttrs">这是一段需要悬停查看完整内容的标签文本</s-tag>
  </s-flex>
</template>
