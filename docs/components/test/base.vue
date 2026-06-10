<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const success = ref(true)
success.value
  ? proxy.$toast(`<span class="text-[var(--blue)]">123</span> 复制成功`, { dangerouslyUseHTMLString: true })
  : proxy.$toast.error(`<span class="text-[var(--blue)]">123</span> 复制失败`, {
      dangerouslyUseHTMLString: true,
    })
</script>

<template>
  <div class="p-100 bg-[var(--blue)]">
    <div>docs/components/test/base.vue</div>
  </div>
</template>
