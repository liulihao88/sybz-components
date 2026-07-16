<script setup lang="ts">
import { computed, ref } from 'vue'
import { debounce } from '@sybz-components/utils'

const count = ref(0)
const immediateCount = ref(0)
const logs = ref<string[]>([])

const addLog = (text: string) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()} ${text}`)
  logs.value = logs.value.slice(0, 6)
}

const debouncedClick = debounce(
  (label: string) => {
    count.value += 1
    addLog(`${label}执行：${count.value}`)
    return count.value
  },
  500,
  false,
  (result) => {
    addLog(`默认防抖 resultCallback：${result}`)
  },
)

const immediateClick = debounce(
  () => {
    immediateCount.value += 1
    addLog(`立即执行：${immediateCount.value}`)
    return immediateCount.value
  },
  500,
  true,
)

const cancelDebounced = () => {
  debouncedClick.cancel()
  addLog('已取消等待中的默认防抖')
}

const parameterOptions = [
  { label: 'fn', value: '(label: string) => number，可选值：任意函数，默认值：必填' },
  { label: 'delay', value: '500，可选值：大于等于 0 的数字，默认值：500，单位毫秒' },
  { label: 'immediate', value: 'false，可选值：true / false，默认值：false' },
  { label: 'resultCallback', value: '(result) => void，可选值：任意结果回调函数，默认值：未设置' },
]

const resultOptions = computed(() => [
  { label: '默认防抖执行次数', value: count.value },
  { label: '立即模式执行次数', value: immediateCount.value },
  { label: '最近日志', value: logs.value.length ? logs.value.join('\n') : '点击按钮后查看防抖结果' },
])
</script>

<template>
  <div class="debounce-demo">
    <s-descriptions
      :options="parameterOptions"
      title="基础用法（默认 delay=500，immediate=false）"
      :column="1"
      label-width="140"
      show-all
    />

    <div class="debounce-demo__actions">
      <el-button type="primary" @click="debouncedClick('默认防抖')">连续点击测试默认防抖</el-button>
      <el-button type="primary" plain @click="immediateClick">immediate: true</el-button>
      <el-button @click="cancelDebounced">cancel</el-button>
    </div>

    <s-descriptions :options="resultOptions" title="执行结果" :column="1" label-width="140" show-all />
  </div>
</template>

<style scoped lang="scss">
.debounce-demo {
  display: grid;
  gap: 16px;
}

.debounce-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 4px 0;
}
</style>
