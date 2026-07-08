<script setup lang="ts">
import { ref } from 'vue'

const shadow = ref<'always' | 'never' | 'hover'>('hover')
const hoverAnimation = ref(true)
const shadowOptions = ['always', 'never', 'hover']
</script>

<template>
  <div class="basic-layout-shadow-demo">
    <div class="basic-layout-shadow-demo__meta">
      <span>属性: shadow</span>
      <span>可选值: 'always' | 'never' | 'hover'</span>
      <span>默认值: 'never'</span>
      <span>属性: hoverAnimation</span>
      <span>可选值: true | false</span>
      <span>默认值: false</span>
    </div>

    <div class="basic-layout-shadow-demo__controls">
      <s-radio v-model="shadow" :options="shadowOptions" type="button"></s-radio>
      <s-switch v-model="hoverAnimation" active-text="开启动画" inactive-text="关闭动画" />
    </div>

    <SBasicLayout title="阴影与 Hover 动画" :shadow="shadow" :hover-animation="hoverAnimation">
      将鼠标移入布局容器，观察 shadow 和 hoverAnimation 的效果。shadow 控制阴影出现时机，hoverAnimation
      控制轻微上浮动画。
    </SBasicLayout>
  </div>
</template>

<style scoped lang="scss">
.basic-layout-shadow-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.basic-layout-shadow-demo__meta,
.basic-layout-shadow-demo__controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
}

.basic-layout-shadow-demo__meta {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
