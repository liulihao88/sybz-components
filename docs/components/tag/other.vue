<script setup lang="ts">
import { computed, ref } from 'vue'

const placement = ref<'top' | 'bottom'>('top')
const showAfter = ref(0)
const tooltipAttrs = computed(() => ({ placement: placement.value, showAfter: showAfter.value }))
const type = ref<any>('')
const effect = ref<any>('light')
</script>

<template>
  <s-flex direction="column" align="start" gap="0" mb>
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
    <s-radio
      v-model="type"
      :options="['', 'primary', 'danger', 'success', 'warning', 'info']"
      type="simple"
      title="类型:type"
    />
    <s-radio v-model="effect" :options="['dark', 'light', 'plain']" type="simple" title="主题:effect(默认light)" />
    <s-tag width="120" :tooltip-attrs="tooltipAttrs" :type="type" :effect="effect">
      这是一段需要悬停查看完整内容的标签文本
    </s-tag>

    <s-flex gap wrap></s-flex>
  </s-flex>
  <s-flex gap>
    <s-tag width="120" :tooltip-attrs="tooltipAttrs" :effect="effect" type="primary">primary</s-tag>
    <s-tag width="120" :tooltip-attrs="tooltipAttrs" :effect="effect" type="danger">danger</s-tag>
    <s-tag width="120" :tooltip-attrs="tooltipAttrs" :effect="effect" type="warning">wraning</s-tag>
    <s-tag width="120" :tooltip-attrs="tooltipAttrs" :effect="effect" type="success">success</s-tag>
    <s-tag width="120" :tooltip-attrs="tooltipAttrs" :effect="effect" type="info">info</s-tag>
  </s-flex>
</template>
