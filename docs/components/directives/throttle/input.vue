<script setup lang="ts">
import { ref } from 'vue'

const defaultValue = ref('')
const explicitValue = ref('')
const defaultCount = ref(0)
const explicitCount = ref(0)

function handleDefaultInput() {
  defaultCount.value += 1
}

function handleExplicitInput() {
  explicitCount.value += 1
}
</script>

<template>
  <div class="throttle-demo">
    <div class="throttle-demo__item">
      <el-input v-model="defaultValue" v-throttle="handleDefaultInput" placeholder="默认监听 input" />
      <span>执行 {{ defaultCount }} 次</span>
    </div>

    <div class="throttle-demo__item">
      <s-input v-model="explicitValue" v-throttle.input.800="handleExplicitInput" placeholder="显式 input，800ms" />
      <span>执行 {{ explicitCount }} 次</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.throttle-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.throttle-demo__item {
  display: grid;
  grid-template-columns: minmax(220px, 320px) auto;
  gap: 12px;
  align-items: center;
}

@media (max-width: 640px) {
  .throttle-demo__item {
    grid-template-columns: 1fr;
  }
}
</style>
