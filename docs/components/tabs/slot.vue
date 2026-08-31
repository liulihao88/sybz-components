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
</script>

<template>
  <div>
    <s-tabs :options="navList">
      <template #sys-label>
        <s-icon icon="plus"></s-icon>
        系统服务
      </template>
      <template #base-label>
        <s-icon icon="delete"></s-icon>
        基础服务
      </template>
      <template #task-label>
        <s-icon icon="refresh"></s-icon>
        高级定时
      </template>

      <template #sys>我是服务啊</template>
      <template #base>基础服务</template>
      <template #task>高级定时</template>
    </s-tabs>
  </div>
</template>

<style scoped lang="scss"></style>
