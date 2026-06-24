<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '@/index.ts'

const keyword = ref('')
const result = ref('等待输入')
const runCount = ref(0)

const search = useDebounceFn((value: string) => {
  runCount.value += 1
  result.value = value ? `已查询：${value}` : '请输入关键词'
}, 500)

const handleInput = (value: string) => {
  keyword.value = value
  search(value)
}
</script>

<template>
  <s-flex direction="column" gap="12" align="flex-start">
    <el-input :model-value="keyword" placeholder="连续输入，500ms 后只查询最后一次" style="width: 320px" @input="handleInput" />
    <s-flex gap="8" wrap>
      <el-button @click="search.flush">立即执行</el-button>
      <el-button @click="search.cancel">取消</el-button>
      <el-tag>{{ result }}</el-tag>
      <el-tag type="success">执行次数：{{ runCount }}</el-tag>
    </s-flex>
  </s-flex>
</template>
