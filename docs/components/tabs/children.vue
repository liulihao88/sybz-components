<template>
  <s-tabs v-model="activeName" class="demo-tabs" default-value="third" :options="tabs" @tab-click="handleClick">
    <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.value">
      default-value: third
      <br />
      active: {{ activeName }}
    </el-tab-pane>
  </s-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import type { TabsPaneContext } from 'element-plus'

const tabs = ref([
  { label: 'first', value: 'first' },
  { label: 'second', value: 'second' },
  { label: 'third', value: 'third' },
  { label: 'fourth', value: 'fourth' },
])

const activeName = ref('second')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped lang="scss">
.demo-tabs :deep(.el-tabs__content) {
  padding: 10px;
  color: #6b778c;
  font-size: 40px;
  font-weight: 600;
}
</style>
