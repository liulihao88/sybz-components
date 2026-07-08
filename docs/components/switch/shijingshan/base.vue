<script setup lang="ts">
import { ref } from 'vue'

const enabled = ref(true)
const audit = ref(false)
const priority = ref(1)
</script>

<template>
  <div class="switch-shijingshan-demo">
    <div class="switch-shijingshan-demo__list">
      <s-switch v-model="enabled" theme="shijingshan" active-text="启用" inactive-text="停用" />
      <s-switch v-model="audit" theme="shijingshan" active-text="自动审核" inactive-text="人工复核" :width="92" />
      <s-switch
        v-model="priority"
        theme="shijingshan"
        active-text="高优先级"
        inactive-text="普通"
        :active-value="1"
        :inactive-value="0"
        width="104"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.switch-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.switch-shijingshan-demo__list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px 24px;
  align-items: center;
}
</style>
