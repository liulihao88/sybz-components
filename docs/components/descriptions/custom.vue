<script setup lang="tsx">
import { formatTime } from '@sybz-components/utils'

const records = [
  {
    id: 16,
    record_time: '2026-07-28T17:26:40',
    user_name:
      '266845712335735226684571233573522668457123357352266845712335735226684571233573522668457123357352266845712335735226684571233573522668457123357352266845712335735226684571233573522668457123',
    action: 'create',
    content: '创建工单：暂停开机，由班组长完成漏项复核并恢复所有安全联锁',
  },
  {
    id: 104,
    record_time: '2026-07-30T14:38:18',
    user_name: '3573522668457984',
    action: 'activate_plan',
    content: '短期行动确认执行，分配给 张工',
  },
]

const customLabel = ({ label }) => formatTime(label)
const customValue = ({ value }) => '你好呀: ' + value
</script>

<template>
  <div class="w-300">
    <s-descriptions
      :options="records"
      :column="1"
      value="content"
      label="record_time"
      :custom-label="customLabel"
      :custom-value="customValue"
    />
  </div>
</template>

<style scoped>
.descriptions-custom-value {
  color: blue !important;
}
</style>
