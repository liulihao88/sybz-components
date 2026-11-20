<script setup lang="ts">
import { ref } from 'vue'
const navList = [
  {
    label: '系统服务参数设置',
    value: 'sys',
  },
  {
    label: '基础服务参数设置',
    value: 'base',
  },
  {
    label: '高级定时任务',
    value: 'task',
  },
]
const type = ref('')
const stretch = ref(false)
const extra = ref('')
const value = ref('sys')
const size = ref('default')
</script>

<template>
  <div>
    <s-flex direction="column" gap="small">
      <s-radio
        v-model="type"
        :options="['', 'capsule', 'capsule-theme', 'card', 'border-card']"
        type="simple"
        title="类型"
      ></s-radio>
      <s-radio v-model="stretch" :options="[false, true]" type="simple" title="是否自动撑开"></s-radio>
      <s-radio v-model="extra" :options="['', '右侧说明']" type="simple" title="extra：默认空"></s-radio>
      <s-radio v-model="size" :options="['small', 'default', 'large']" type="simple" title="size"></s-radio>
    </s-flex>
    <s-tabs v-model="value" :options="navList" :type="type" :stretch="stretch" :extra="extra" :size="size">
      <template #sys>系统服务</template>
      <template #base>基础服务</template>
      <template #task>高级定时</template>
    </s-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
