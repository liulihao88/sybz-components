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
    text: '三天后',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + oneDay * 3)
      return date
    },
  },
  {
    text: '一周后',
    value: () => {
      const date = new Date()
      date.setTime(date.getTime() + oneDay * 7)
      return date
    },
  },
]
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-meta">
      <span>属性: shortcuts</span>
      <span>可选值: array | false</span>
      <span>默认值: 内置快捷项</span>
      <span>属性: type</span>
      <span>可选值: date | daterange</span>
      <span>默认值: date</span>
    </div>

    <div class="demo-list">
      <s-date-picker v-model="dateValue" :shortcuts="shortcuts" placeholder="自定义快捷项"></s-date-picker>
      <s-date-picker v-model="rangeValue" type="daterange" width="520" start-placeholder="内置快捷项"></s-date-picker>
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

.demo-meta,
.demo-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
}

.demo-meta,
.demo-value {
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
