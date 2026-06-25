<script setup lang="ts">
import { ref } from 'vue'

const collapsed = ref(false)
</script>

<template>
  <div class="basic-layout-chenghua-demo">
    <div class="basic-layout-chenghua-demo__meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua'</span>
      <span>默认值: ''</span>
      <span>属性: title</span>
      <span>可选值: string</span>
      <span>默认值: ''</span>
      <span>属性: collapsible</span>
      <span>可选值: true | false</span>
      <span>默认值: false</span>
      <span>属性: collapseTrigger</span>
      <span>可选值: 'icon' | 'header'</span>
      <span>默认值: 'header'</span>
    </div>

    <s-basic-layout v-model="collapsed" theme="chenghua">
      <div class="basic-layout-chenghua-demo__content">
        <div class="basic-layout-chenghua-demo__row">
          <span>规则范围</span>
          <strong>对象存储巡检 / AI 审核任务</strong>
        </div>
        <div class="basic-layout-chenghua-demo__row">
          <span>最近执行</span>
          <strong>2026-06-17 10:24</strong>
        </div>
        <div class="basic-layout-chenghua-demo__row">
          <span>状态</span>
          <strong>已启用</strong>
        </div>
      </div>

      <template #footer>
        <s-button theme="chenghua">取消</s-button>
        <s-button type="primary" theme="chenghua">保存配置</s-button>
      </template>
    </s-basic-layout>
  </div>
</template>

<style scoped lang="scss">
.basic-layout-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.basic-layout-chenghua-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.basic-layout-chenghua-demo__content {
  display: grid;
  gap: 10px;
}

.basic-layout-chenghua-demo__row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: var(--el-text-color-primary);
  line-height: 1.6;
}

.basic-layout-chenghua-demo__row span {
  color: var(--el-text-color-secondary);
}
</style>
