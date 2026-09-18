<script setup lang="ts">
import { ref } from 'vue'

const keyword = ref('')
const result = ref('')

const handleSearch = (value: string) => {
  result.value = value ? `正在搜索：${value}` : '请输入搜索内容'
}
</script>

<template>
  <div class="search-demo">
    <s-input
      v-model="keyword"
      search
      width="360"
      height="calc(100%)"
      placeholder="搜索工作小组..."
      @search="handleSearch"
    />
    <span class="search-demo__result">{{ result }}</span>
  </div>
</template>

<style scoped>
.search-demo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  height: 100px;
}

.search-demo__result {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}
</style>
