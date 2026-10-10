<script setup lang="ts">
import { docThemeOptions } from '../../.vitepress/theme/theme'

import { ref } from 'vue'
const theme = ref<(typeof docThemeOptions)[number]>('default')

const collapsed = ref(false)
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" variant="button" title="theme" class="p-b-10" />
  <div class="card-chenghua-demo">
    <s-card v-model="collapsed" :theme="theme" title="我是header">
      <div class="card-chenghua-demo__content">
        <div class="card-chenghua-demo__row">
          <span>规则范围</span>
          <strong>对象存储巡检 / AI 审核任务</strong>
        </div>
        <div class="card-chenghua-demo__row">
          <span>最近执行</span>
          <strong>2026-06-17 10:24</strong>
        </div>
        <div class="card-chenghua-demo__row">
          <span>状态</span>
          <strong>已启用</strong>
        </div>
      </div>

      <template #footer>
        <s-button :theme="theme">取消</s-button>
        <s-button type="primary" :theme="theme">保存配置</s-button>
      </template>
    </s-card>
  </div>
</template>

<style scoped lang="scss">
.card-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-chenghua-demo__content {
  display: grid;
  gap: 10px;
}

.card-chenghua-demo__row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--el-text-color-primary);
  line-height: 1.6;
}

.card-chenghua-demo__row span {
  color: var(--el-text-color-secondary);
}
</style>
