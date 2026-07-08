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
</style>
