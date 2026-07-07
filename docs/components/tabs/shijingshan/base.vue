<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('audit')
const capsuleTab = ref('running')

const navList = [
  {
    label: '待审核服务',
    value: 'audit',
  },
  {
    label: '运行中服务',
    value: 'running',
  },
  {
    label: '异常告警',
    value: 'warning',
  },
]
</script>

<template>
  <div class="tabs-shijingshan-demo">
    <s-tabs v-model="activeTab" :options="navList" theme="shijingshan">
      <template #audit>待审核服务内容</template>
      <template #running>运行中服务内容</template>
      <template #warning>异常告警内容</template>
    </s-tabs>

    <s-tabs v-model="capsuleTab" :options="navList" theme="shijingshan" type="capsule">
      <template #audit>待审核服务内容</template>
      <template #running>运行中服务内容</template>
      <template #warning>异常告警内容</template>
    </s-tabs>
  </div>
</template>

<style scoped lang="scss">
.tabs-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 18px;

  :deep(.el-tabs__content) {
    color: var(--el-text-color-regular);
    font-size: 14px;
  }
}
</style>
