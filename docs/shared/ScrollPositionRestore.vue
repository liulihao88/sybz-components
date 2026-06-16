<script setup lang="ts">
import { nextTick, onMounted } from 'vue'
import { useRouter } from 'vitepress'
import { installScrollPositionRestore } from './scrollPosition'

const router = useRouter()

onMounted(async () => {
  await nextTick()
  window.requestAnimationFrame(() => {
    installScrollPositionRestore(router)
  })
})
</script>

<template>
  <span class="scroll-position-restore" aria-hidden="true"></span>
</template>

<style scoped>
.scroll-position-restore {
  display: none;
}
</style>
