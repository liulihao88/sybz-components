<script setup lang="ts">
import { ref } from 'vue'

const contentWidth = ref(240)
const longText = '这段提示内容用于展示弹出层宽度变化。调节上方滑块，可以查看内容区域如何随宽度变化并自动换行。'
</script>

<template>
  <div class="tooltip-width-demo">
    <el-slider v-model="contentWidth" :min="120" :max="480" :step="20" show-input />
    <s-tooltip
      width="180px"
      :content="longText"
      :popper-style="{ width: contentWidth + 'px', maxWidth: contentWidth + 'px', whiteSpace: 'normal' }"
      placement="right"
    />
  </div>
</template>

<style scoped>
.tooltip-width-demo {
  width: 100%;
  max-width: 520px;
}
</style>
