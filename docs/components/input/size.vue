<template>
  <div class="input-size-demo">
    <s-flex gap="small" align="center">
      <s-input v-model="input" width="220" size="large" placeholder="large" />
      <s-input v-model="input" width="220" size="default" placeholder="default" />
      <s-input v-model="input" width="220" size="small" placeholder="small" />
    </s-flex>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
</script>

<style scoped lang="scss">
.input-size-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
