<script setup lang="ts">
import { ref } from 'vue'
import { mockValue } from '@/utils/src/index.ts'

const options = [
  { label: 'mockValue()', value: mockValue() },
  {
    label: 'mockValue("time")',
    value: mockValue('time'),
  },
  {
    label: 'mockValue("time", 0, {startStr:"andy", timeStr:"{h}:{i}:{s}"})',
    value: mockValue('time', 0, { startStr: 'andy', timeStr: '{h}:{i}:{s}' }),
  },
  { label: 'mockValue("phone")', value: mockValue('phone') },
  { label: 'mockValue("number")', value: mockValue('number') },
  { label: 'mockValue("number", 8)', value: mockValue('number', 8) },
  { label: 'mockValue("email")', value: mockValue('email') },
  { label: 'mockValue("ip")', value: mockValue('ip') },
  { label: 'mockValue("port")', value: mockValue('port') },
  {
    label: 'mockValue([{ label: "小泽泽", value: "xzz" },{ label: "小月月", value: "xyy" }])',
    value: mockValue([
      { label: '小泽泽', value: 'xzz' },
      { label: '小月月', value: 'xyy' },
    ]),
  },
]
</script>

<template>
  <div>
    <s-descriptions :options="options" title="mockValue随机字符" :column="1"></s-descriptions>
  </div>
</template>
