<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')
const selectValue = ref('')
const count = ref(12)

const options = [
  { label: '审核规则', value: 'rule' },
  { label: '容量预警', value: 'quota' },
  { label: '服务巡检', value: 'service' },
]
</script>

<template>
  <div class="comp-title-shijingshan-demo">
    <div class="comp-title-shijingshan-demo__list">
      <s-comp-title title="审核周期" theme="shijingshan" :comp-title-style="{ width: 96 }" />

      <div class="comp-title-shijingshan-demo__row">
        <s-comp-title title="服务名称" theme="shijingshan" :comp-title-style="{ width: 96 }" />
        <el-input v-model="value" placeholder="请输入服务名称" />
      </div>

      <s-select
        v-model="selectValue"
        theme="shijingshan"
        size="small"
        title="业务类型"
        width="360"
        :comp-title-style="{ width: 96 }"
        :options="options"
        placeholder="请选择业务类型"
      />

      <s-input-number
        v-model="count"
        theme="shijingshan"
        title="容量配额"
        size="large"
        width="360"
        :comp-title-style="{ width: 96 }"
        :min="0"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.comp-title-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.comp-title-shijingshan-demo__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comp-title-shijingshan-demo__row {
  display: flex;
  align-items: stretch;
  width: 360px;
  min-width: 0;
}

.comp-title-shijingshan-demo__row :deep(.el-input) {
  flex: 1;
  min-width: 0;
}

.comp-title-shijingshan-demo__row :deep(.el-input__wrapper) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
