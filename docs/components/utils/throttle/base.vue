<script setup lang="ts">
import { computed, ref } from 'vue'
import { throttle } from '@sybz-components/utils'

const count = ref(0)
const trailingCount = ref(0)
const logs = ref<string[]>([])

const addLog = (text: string) => {
  logs.value.unshift(`${new Date().toLocaleTimeString()} ${text}`)
  logs.value = logs.value.slice(0, 6)
}

const throttledClick = throttle(
  () => {
    count.value += 1
    addLog(`默认节流执行：${count.value}`)
    return count.value
  },
  1000,
  { leading: true, trailing: true },
  (result) => {
    addLog(`默认节流 resultCallback：${result}`)
  },
)

const trailingClick = throttle(
  (label: string) => {
    trailingCount.value += 1
    addLog(`${label} 执行：${trailingCount.value}`)
    return label
  },
  1000,
  { leading: false, trailing: true },
  (result) => {
    addLog(`延后执行 resultCallback：${result}`)
  },
)

const flushTrailing = () => {
  trailingClick.flush()
}

const cancelTrailing = () => {
  trailingClick.cancel()
  addLog('已取消等待中的延后执行')
}

const parameterOptions = [
  { label: 'fn', value: '() => count.value += 1，默认值：必填' },
  { label: 'delay', value: '1000，默认值：1000，单位毫秒' },
  { label: 'options', value: '{ leading: true, trailing: true }，默认值：{ leading: true, trailing: true }' },
  { label: 'resultCallback', value: '(result) => void，默认值：未设置' },
]

const resultOptions = computed(() => [
  { label: '默认节流执行次数', value: count.value },
  { label: '延后执行次数', value: trailingCount.value },
  { label: '最近日志', value: logs.value.length ? logs.value.join('\n') : '点击按钮后查看节流结果' },
])
</script>

<template>
  <div class="throttle-demo">
    <s-descriptions
      :options="parameterOptions"
      title="基础用法（默认 delay=1000，options={ leading: true, trailing: true }）"
      :column="1"
      label-width="140"
      show-all
    />

    <div class="throttle-demo__actions">
      <el-button type="primary" @click="throttledClick">默认节流</el-button>
      <el-button type="primary" plain @click="trailingClick('延后执行')">leading: false</el-button>
      <el-button @click="flushTrailing">flush</el-button>
      <el-button @click="cancelTrailing">cancel</el-button>
    </div>

    <s-descriptions :options="resultOptions" title="执行结果" :column="1" label-width="140" show-all />
  </div>
</template>

<style scoped lang="scss">
.throttle-demo {
  display: grid;
  gap: 16px;
}

.throttle-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 4px 0;
}
</style>
