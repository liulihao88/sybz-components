<script setup lang="ts">
import { docThemeOptions } from '../../.vitepress/theme/theme'

import { ref } from 'vue'
const theme = ref<(typeof docThemeOptions)[number]>('default')
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <div class="empty-chenghua-demo">
    <div class="empty-chenghua-demo__list">
      <s-empty :theme="theme" title="暂无服务申请" sub-title="创建申请后将在这里展示" width="72">
        <s-button :theme="theme" type="primary" size="small">新建申请</s-button>
      </s-empty>
      <s-empty :theme="theme" title="当前筛选条件下暂无数据" sub-title="请尝试调整筛选条件" width="84" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.empty-chenghua-demo__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 720px) {
  .empty-chenghua-demo__list {
    grid-template-columns: 1fr;
  }
}
</style>
