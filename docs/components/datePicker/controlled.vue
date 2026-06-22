<script setup lang="ts">
import { Calendar, Clock } from '@element-plus/icons-vue'
import { ref } from 'vue'

const dateValue = ref('')
const datePickerRef = ref()

const openPicker = () => {
  datePickerRef.value?.handleOpen()
}
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-meta">
      <span>属性: prefix-icon</span>
      <span>可选值: string | Component</span>
      <span>默认值: ''</span>
      <span>插槽: default</span>
      <span>可选值: 自定义单元格内容</span>
      <span>默认值: undefined</span>
      <span>方法: handleOpen</span>
      <span>可选值: ref 调用</span>
      <span>默认值: undefined</span>
    </div>

    <div class="demo-list">
      <s-date-picker ref="datePickerRef" v-model="dateValue" :prefix-icon="Clock">
        <template #default="cell">
          <div class="custom-cell" :class="{ current: cell.isCurrent }">
            <span>{{ cell.text }}</span>
          </div>
        </template>
      </s-date-picker>
      <s-button :icon="Calendar" @click="openPicker">打开日期面板</s-button>
    </div>

    <div class="demo-value">{{ dateValue }}</div>
  </div>
</template>

<style scoped lang="scss">
.date-picker-demo {
  display: grid;
  gap: 12px;
}

.demo-meta,
.demo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
}

.demo-meta,
.demo-value {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.custom-cell {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

.custom-cell.current {
  color: var(--el-color-primary);
  font-weight: 700;
}
</style>
