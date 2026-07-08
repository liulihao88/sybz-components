<script setup lang="ts">
import { ref } from 'vue'

const dateValue = ref('')
const rangeValue = ref([])
const noShortcutsValue = ref('')

const oneDay = 3600 * 1000 * 24
const shortcuts = [
  {
    text: '今天',
    value: () => new Date(),
  },
  {
    text: '3天前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - oneDay * 3)
      return date
    },
  },
  {
    text: '14天前',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() - oneDay * 14)
      return date
    },
  },
]
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-list">
      <s-date-picker v-model="dateValue" :shortcuts="shortcuts" placeholder="自定义快捷项"></s-date-picker>
      <s-date-picker
        v-model="rangeValue"
        type="datetimerange"
        width="520"
        unlink-panels
        start-placeholder="内置快捷项"
      ></s-date-picker>
      <s-date-picker v-model="noShortcutsValue" :shortcuts="false" placeholder="关闭快捷项"></s-date-picker>
    </div>

    <div class="demo-value">{{ dateValue }} / {{ rangeValue }} / {{ noShortcutsValue }}</div>
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
}

.demo-value {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
