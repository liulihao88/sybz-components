<script setup lang="ts">
import { ref } from 'vue'

const shadow = ref<'always' | 'never' | 'hover'>('hover')
const hoverAnimation = ref(true)
const shadowOptions = ['always', 'never', 'hover']
</script>

<template>
  <div class="icon-hover-shadow-demo">
    <div class="icon-hover-shadow-demo__controls">
      <s-radio v-model="shadow" :options="shadowOptions" type="button"></s-radio>
      <s-switch v-model="hoverAnimation" active-text="开启动画" inactive-text="关闭动画" />
    </div>

    <s-icon
      icon="tabler:trash"
      type="primary"
      variant="light"
      size="28"
      :shadow="shadow"
      :hover-animation="hoverAnimation"
    />
  </div>
</template>

<style scoped>
.icon-hover-shadow-demo {
  display: grid;
  gap: 24px;
}

.icon-hover-shadow-demo__controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
</style>
