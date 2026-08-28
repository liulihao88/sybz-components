<script setup lang="ts">
const sideStyles = {
  extra: {
    width: '132px',
    color: '#1d5fa7',
    background: '#eaf4ff',
    borderLeft: '1px solid #c9e2ff',
    textAlign: 'center' as const,
  },
}
</script>

<template>
  <div class="item-demo-list">
    <SItem
      title="整高右侧区域"
      sub-title="extra-placement=side 时，右侧区域与信息项等高；可以独立设置背景、分割线、宽度和内容对齐。"
      extra-placement="side"
      extra-align="center"
      :sub-title-lines="2"
      :styles="sideStyles"
      height="132"
      border-radius="12"
    >
      <template #prefix><span class="icon">📄</span></template>
      <template #extra>
        <strong>待处理</strong>
        <small>3 项任务</small>
      </template>
    </SItem>

    <SItem
      title="底部操作区域"
      sub-title="extra-placement=bottom 适合操作较多或小屏布局。"
      extra-placement="bottom"
      :styles="{
        extra: {
          justifyContent: 'flex-end',
          borderTop: '1px solid #ebeef5',
          background: '#fafafa',
        },
      }"
      border-radius="12"
    >
      <template #actions>
        <el-button size="small">取消</el-button>
        <el-button size="small" type="primary">查看详情</el-button>
      </template>
    </SItem>
  </div>
</template>

<style scoped>
.item-demo-list {
  display: grid;
  gap: 16px;
  max-width: 680px;
}

.icon {
  font-size: 28px;
}

small {
  display: block;
  margin-top: 4px;
  color: #5f7f9f;
}
</style>
