<script setup lang="ts">
import { docThemeOptions } from '../../.vitepress/theme/theme'

import { ref } from 'vue'
const theme = ref<(typeof docThemeOptions)[number]>('default')

const rangeValue = ref([])
const dateValue = ref('')
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" variant="button" title="theme" class="p-b-10" />
  <div class="date-picker-chenghua-demo">
    <div class="date-picker-chenghua-demo__list">
      <s-date-picker
        v-model="rangeValue"
        :theme="theme"
        type="daterange"
        title="审核周期"
        width="520"
        height="40"
      ></s-date-picker>
      <s-date-picker
        v-model="dateValue"
        :theme="theme"
        title="发布日期"
        type="date"
        width="320"
        height="40"
        placeholder="选择发布日期"
      ></s-date-picker>
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-picker-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.date-picker-chenghua-demo__list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}
</style>
