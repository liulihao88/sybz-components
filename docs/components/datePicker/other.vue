<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref([])
const dateSimple = ref('')
const otherParams = ref({
  topTitle: '选择日期范围',
  title: '审核周期',
  disabled: false,
})
const topTitleOptions = [
  { label: "不设置（默认值：''）", value: '' },
  { label: '选择日期范围', value: '选择日期范围' },
  { label: '发布时间', value: '发布时间' },
]
const titleOptions = [
  { label: "不设置（默认值：''）", value: '' },
  { label: '左侧标题：审核周期', value: '审核周期' },
]
const disabledOptions = [
  { label: 'false（默认值）', value: false },
  { label: 'true', value: true },
]
</script>

<template>
  <div class="date-picker-demo">
    <s-flex gap="small" direction="column" class="p-b-12">
      <s-radio v-model="otherParams.topTitle" :options="topTitleOptions" variant="button" title="top-title" />
      <s-radio v-model="otherParams.title" :options="titleOptions" variant="button" title="title" />
      <s-radio v-model="otherParams.disabled" :options="disabledOptions" variant="button" title="disabled" />
    </s-flex>
    <div class="demo-list">
      <s-date-picker
        v-model="rangeValue"
        :title="otherParams.title"
        :top-title="otherParams.topTitle"
        :disabled="otherParams.disabled"
        type="daterange"
        width="560"
        start-placeholder="开始"
        end-placeholder="结束"
        range-separator="///"
        :comp-title-style="{ width: 84 }"
      ></s-date-picker>
      <s-date-picker
        v-model="dateSimple"
        :title="otherParams.title"
        :top-title="otherParams.topTitle"
        :disabled="otherParams.disabled"
        type="datetime"
        value-format="x"
        width="360"
        :comp-title-style="{ width: 84 }"
      ></s-date-picker>
    </div>

    <div class="demo-value">{{ rangeValue }} / {{ dateSimple }}</div>
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
</style>
