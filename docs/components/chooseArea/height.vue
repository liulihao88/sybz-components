<script setup lang="ts">
import { ref } from 'vue'

const areaValue = ref(['13', '1305', '130506'])
const tallAreaValue = ref([])
</script>

<template>
  <div class="choose-area-height-demo">
    <div class="demo-meta">
      <span>属性: height</span>
      <span>可选值: string | number</span>
      <span>默认值: ''</span>
    </div>

    <div class="demo-list">
      <s-choose-area v-model="areaValue" width="320" height="40" clearable></s-choose-area>
      <s-choose-area v-model="tallAreaValue" width="360" height="48" filterable clearable></s-choose-area>
    </div>
  </div>
</template>

<style scoped lang="scss">
.choose-area-height-demo {
  display: grid;
  gap: 16px;
}

.demo-meta {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.demo-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
