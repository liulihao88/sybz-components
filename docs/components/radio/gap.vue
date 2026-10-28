<script setup lang="ts">
import { ref } from 'vue'

const value = ref('待处理')
const buttonValue = ref('待处理')
const options = [
  '待处理',
  '处理中',
  '已完成',
  '已关闭',
  '待处理',
  '处理中',
  '已完成',
  '已关闭',
  '待处理',
  '处理中',
  '已完成',
  '已关闭',
  '待处理',
  '处理中',
  '已完成',
  '已关闭',
  '待处理',
  '处理中',
  '已完成',
  '已关闭',
  '待处理',
  '处理中',
  '已完成',
  '已关闭',
]
const gap = ref(16)
const gapX = ref(16)
const gapY = ref(8)
</script>

<template>
  <div class="radio-gap-demo">
    <s-title title="普通 radio：gap 默认 16px；button：gap 不生效，单行超出可横向滚动" />
    <el-slider v-model="gap"></el-slider>
    <s-radio v-model="value" :options="options" :gap="gap" />
    <s-radio v-model="buttonValue" :options="options" variant="button" :gap="gap" />
    <s-title title="普通 radio 的 gap 数组：[水平 x, 垂直 y]（默认 16px）；button 保持连续单行" />
    <span>水平 x：{{ gapX }}px</span>
    <el-slider v-model="gapX" :max="40" />
    <span>垂直 y：{{ gapY }}px</span>
    <el-slider v-model="gapY" :max="40" />
    <s-radio v-model="value" :options="options" :gap="[gapX, gapY]" />
    <s-radio v-model="buttonValue" :options="options" variant="button" :gap="[gapX, gapY]" />
  </div>
</template>

<style scoped>
.radio-gap-demo {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
