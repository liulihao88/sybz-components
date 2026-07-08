<script setup lang="ts">
import { ref } from 'vue'

const shadow = ref<'always' | 'never' | 'hover'>('hover')
const hoverAnimation = ref(true)
const shadowOptions = ['always', 'never', 'hover']
</script>

<template>
  <div class="card-shadow-demo">
    <div class="card-shadow-demo__controls">
      <s-radio v-model="shadow" :options="shadowOptions" type="button"></s-radio>
      <s-switch v-model="hoverAnimation" active-text="开启动画" inactive-text="关闭动画" />
    </div>

    <SCard title="阴影与 Hover 动画" :shadow="shadow" :hover-animation="hoverAnimation">
      将鼠标移入卡片容器，观察 shadow 和 hoverAnimation 的效果。shadow 控制阴影出现时机，hoverAnimation
      控制轻微上浮动画。
    </SCard>
  </div>
</template>

<style scoped lang="scss">
.card-shadow-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-shadow-demo__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
}
</style>
