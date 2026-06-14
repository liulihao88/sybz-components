<script setup lang="ts">
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
  <div class="tabs-size-demo">
    <s-tabs :options="navList" size="small">
      <template #sys>系统服务</template>
      <template #base>基础服务</template>
      <template #task>高级定时</template>
    </s-tabs>

    <s-tabs :options="navList">
      <template #sys>系统服务</template>
      <template #base>基础服务</template>
      <template #task>高级定时</template>
    </s-tabs>

    <s-tabs :options="navList" size="large">
      <template #sys>系统服务</template>
      <template #base>基础服务</template>
      <template #task>高级定时</template>
    </s-tabs>
  </div>
</template>

<style scoped lang="scss">
.tabs-size-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
