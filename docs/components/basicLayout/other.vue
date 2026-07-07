<script setup lang="ts">
import { ref } from 'vue'
const size = ref<string | number>('default')
const sizeOptions = ['large', 'default', 'small', 20, '2rem', 0]
</script>

<template>
  <div class="basic-layout-size-demo">
    <div class="basic-layout-size-demo__meta">
      <span>属性: size</span>
      <span>可选值: 'small' | 'default' | 'large' | string | number</span>
      <span>默认值: 'default'</span>
      <span>当前值: {{ size }}</span>
    </div>

    <s-radio v-model="size" :options="sizeOptions" type="simple"></s-radio>

    <SBasicLayout :size="size">
      size 会控制 header、body、footer 的 padding。预设值之外的数字或 CSS 长度会通过 processWidth 转成可用样式。
      <template #header>
        <s-title title="自定义 padding"></s-title>
      </template>
      <template #footer>
        <el-button type="primary">确认</el-button>
      </template>
    </SBasicLayout>
  </div>
</template>

<style scoped lang="scss">
.basic-layout-size-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.basic-layout-size-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
