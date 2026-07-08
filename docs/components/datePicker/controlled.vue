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

.demo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  align-items: center;
}

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
