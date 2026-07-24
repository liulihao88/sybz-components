<template>
  <div class="flex-button-gap-demo">
    <s-title title="未设置 gap（默认值：0px）" />
    <s-flex wrap="wrap">
      <s-button v-for="button in buttons" :key="button">{{ button }}</s-button>
    </s-flex>

    <hr />
    <s-title title='设置 gap="12"' />
    <s-flex wrap="wrap" gap="12">
      <s-button v-for="button in buttons" :key="button">{{ button }}</s-button>
    </s-flex>
  </div>
</template>

<script setup lang="ts">
const buttons = [
  '查看企业详情',
  '生成分析报告',
  '导出当前数据',
  '重新执行任务',
  '查看历史记录',
  '自古多情空余恨',
  '此恨绵绵无绝期',
]
</script>

<style scoped lang="scss">
.flex-button-gap-demo {
  max-width: 720px;
}
</style>
