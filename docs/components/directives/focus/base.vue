<script setup lang="ts">
import { nextTick, ref } from 'vue'

const visible = ref(true)
const inputValue = ref('')

async function replayFocus() {
  visible.value = false
  await nextTick()
  visible.value = true
}
</script>

<template>
  <div class="focus-demo">
    <el-input v-if="visible" v-focus v-model="inputValue" class="focus-demo__input" placeholder="挂载后自动聚焦" />
    <el-button type="primary" @click="replayFocus">重新触发聚焦</el-button>
  </div>
</template>

<style scoped lang="scss">
.focus-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.focus-demo__input {
  width: 240px;
}
</style>
