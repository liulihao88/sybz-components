<script setup lang="ts">
import { ref } from 'vue'

const count = ref(12)
const stock = ref(36)
</script>

<template>
  <div class="input-number-height-demo">
    <div class="demo-list">
      <s-input-number v-model="count" title="20x120" width="120" height="20" :min="0" />
      <s-input-number v-model="count" title="40x140" width="140" height="40" :min="0" />
      <s-input-number v-model="count" title="80x180" width="180" height="80" :min="0" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-number-height-demo {
  display: grid;
  gap: 16px;
}

.demo-list {
  display: flex;
  gap: 16px;
  height: 100px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
