<script setup lang="ts">
import { computed } from 'vue'
import SafeHtml from '@/components/utils/SafeHtml.vue'

const props = defineProps({
  source: {
    type: String,
    required: true,
  },
})

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})
</script>

<template>
  <div class="example-source-wrapper">
    <SafeHtml tag="div" class="example-source language-vue" :html="decoded" />
  </div>
</template>

<style scoped lang="scss">
.language-vue {
  margin: 0 !important;
  border-radius: 0;
}
</style>
