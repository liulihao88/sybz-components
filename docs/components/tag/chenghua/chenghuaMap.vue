<script setup lang="ts">
const statusOptions = [
  { label: '运行中', value: 'running' },
  { label: '待处理', value: 'pending' },
  { label: '异常', value: 'error' },
  { label: '未知', value: 'unknown' },
]

const serviceStatus = ['running', 'pending', 'error', 'unknown']
</script>

<template>
  <div class="tag-chenghua-demo">
    <div class="tag-demo-meta">
      <span>属性: theme</span>
      <span>可选值: 'default' | 'chenghua' | 'shijingshan'</span>
      <span>默认值: 'default'</span>
      <span>属性: options</span>
      <span>可选值: array</span>
      <span>默认值: []</span>
      <span>属性: config</span>
      <span>可选值: { label?: string, value?: string }</span>
      <span>默认值: {}</span>
    </div>

    <s-flex gap="small">
      <s-tag
        v-for="status in serviceStatus"
        :key="status"
        theme="chenghua"
        :value="status"
        :options="statusOptions"
        :config="{ label: 'label', value: 'value' }"
        :primary="['running']"
        :warning="['pending']"
        :danger="['error']"
        :info="['unknown']"
      />
    </s-flex>
  </div>
</template>

<style scoped lang="scss">
.tag-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tag-demo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
