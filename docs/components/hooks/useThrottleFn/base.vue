<script setup lang="ts">
import { ref } from 'vue'
import { useThrottleFn } from '@/index.ts'

const clickCount = ref(0)
const realRunCount = ref(0)

const handleClick = useThrottleFn(() => {
  realRunCount.value += 1
}, 1000)

const clickButton = () => {
  clickCount.value += 1
  handleClick()
}
</script>

<template>
  <s-flex gap="12" align="center" wrap>
    <el-button type="primary" @click="clickButton">连续点击</el-button>
    <el-tag>点击次数：{{ clickCount }}</el-tag>
    <el-tag type="success">实际执行：{{ realRunCount }}</el-tag>
  </s-flex>
</template>
