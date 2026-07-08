<script setup lang="ts"></script>

<template>
  <div class="empty-shijingshan-demo">
    <div class="empty-shijingshan-demo__list">
      <s-empty theme="shijingshan" description="暂无服务申请" width="72">
        <s-button theme="shijingshan" type="primary" size="small">新建申请</s-button>
      </s-empty>
      <s-empty theme="shijingshan" description="当前筛选条件下暂无数据" width="84" />
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
