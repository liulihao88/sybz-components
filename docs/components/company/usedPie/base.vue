<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const data = [
  {
    name: '使用量',
    value: 0,
  },
  {
    name: '已用量',
    value: 222,
  },
  {
    name: '总量',
    value: 0,
  },
]
const trueData = ref({})
setTimeout(() => {
  trueData.value = { used: 43087420916, total: '200.00 GB' }
}, 200)
</script>

<template>
  <div>
    <SUsedPie :used="211" :total="222" style="height: 300px"></SUsedPie>
    <SUsedPie :used="341" :total="222" style="height: 300px"></SUsedPie>
    <SUsedPie :used="0" :total="0" style="height: 300px"></SUsedPie>
    <SUsedPie :used="0" :total="34" style="height: 300px"></SUsedPie>
    <SUsedPie v-bind="trueData" style="height: 300px"></SUsedPie>
    <sBasicLayout title="桶容量信息统计" class="flex-1 mt-4 w-full h-[500px]">
      <SUsedPie v-bind="trueData" />
    </sBasicLayout>
  </div>
</template>
