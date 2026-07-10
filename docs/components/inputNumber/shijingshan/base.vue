<script setup lang="ts">
import { ref } from 'vue'

const count = ref(12)
const quota = ref(36)
const disabledValue = ref(8)
</script>

<template>
  <div class="input-number-shijingshan-demo">
    <sWrapper flex="1" wrap="wrap">
      <s-input-number v-model="count" theme="shijingshan" title="审核数量" width="240" height="40" :min="0" />
      <s-input-number v-model="quota" theme="shijingshan" title="容量配额" controls-position="" />
      <s-input-number v-model="disabledValue" theme="shijingshan" title="禁用项" height="40" :min="0" disabled />
    </sWrapper>
  </div>
</template>

<style scoped lang="scss">
.input-number-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.input-number-shijingshan-demo__list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
</style>
