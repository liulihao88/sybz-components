<script setup lang="ts"></script>

<template>
  <div class="empty-shijingshan-demo">
    <div class="empty-shijingshan-demo__list">
      <s-empty theme="shijingshan" title="暂无服务申请" sub-title="创建申请后将在这里展示" width="72">
        <s-button theme="shijingshan" type="primary" size="small">新建申请</s-button>
      </s-empty>
      <s-empty theme="shijingshan" title="当前筛选条件下暂无数据" sub-title="请尝试调整筛选条件" width="84" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.empty-shijingshan-demo__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 720px) {
  .empty-shijingshan-demo__list {
    grid-template-columns: 1fr;
  }
}
</style>
