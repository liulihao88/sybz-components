<template>
  <s-scroll ref="scroll" width="300px" height="200px"><Story /></s-scroll>
  <div style="display: flex; gap: 8px; margin-top: 12px">
    <s-button @click="go('bottom')">Scroll to bottom</s-button>
    <s-button @click="go('center')">Scroll to center</s-button>
    <s-button @click="go('top')">Scroll to top</s-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Story from './Story.vue'
const scroll = ref<{ viewport?: HTMLElement; scrollTo: (options: ScrollToOptions) => void }>()
function go(where: 'bottom' | 'center' | 'top') {
  const max = scroll.value?.viewport?.scrollHeight ?? 0
  scroll.value?.scrollTo({ top: where === 'bottom' ? max : where === 'center' ? max / 2 : 0, behavior: 'smooth' })
}
</script>
