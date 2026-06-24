<script setup lang="ts">
import { ref } from 'vue'
import { useBoolean, useClickOutside } from '@/index.ts'

const panelRef = ref<HTMLElement>()
const { state: visible, setTrue: open, setFalse: close } = useBoolean(false)

useClickOutside(panelRef, () => {
  close()
})
</script>

<template>
  <div class="hooks-click-outside-demo">
    <el-button type="primary" @click.stop="open">打开面板</el-button>
    <div v-if="visible" ref="panelRef" class="hooks-click-outside-demo__panel">
      点击这个面板外部会关闭
    </div>
  </div>
</template>

<style scoped>
.hooks-click-outside-demo {
  position: relative;
  min-height: 116px;
}

.hooks-click-outside-demo__panel {
  position: absolute;
  top: 44px;
  left: 0;
  width: 240px;
  padding: 16px;
  border: 1px solid var(--el-border-color);
  background: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-light);
  z-index: 2;
}
</style>
