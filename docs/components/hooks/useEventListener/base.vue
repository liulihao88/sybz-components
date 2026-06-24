<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener } from '@/index.ts'

const buttonRef = ref<EventTarget | null>(null)
const count = ref(0)

useEventListener(buttonRef, 'click', () => {
  count.value += 1
})
</script>

<template>
  <s-flex gap="12" align="center" wrap>
    <button ref="buttonRef" class="hooks-event-demo__button" type="button">点击目标按钮</button>
    <el-tag>监听次数：{{ count }}</el-tag>
  </s-flex>
</template>

<style scoped>
.hooks-event-demo__button {
  height: 32px;
  padding: 0 14px;
  border: 1px solid var(--el-color-primary);
  border-radius: 4px;
  background: var(--el-color-primary);
  color: #fff;
  cursor: pointer;
}
</style>
