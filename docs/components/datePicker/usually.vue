<script setup lang="ts">
import { ref } from 'vue'

const rangeValue = ref([])
const dateSimple = ref('')
</script>

<template>
  <div class="date-picker-demo">
    <div class="demo-list">
      <s-date-picker
        v-model="rangeValue"
        title="选择日期"
        type="daterange"
        width="560"
        start-placeholder="开始"
        end-placeholder="结束"
        range-separator="///"
        :comp-title-style="{ width: 84 }"
      ></s-date-picker>
      <s-date-picker
        v-model="dateSimple"
        title="发布时间"
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
