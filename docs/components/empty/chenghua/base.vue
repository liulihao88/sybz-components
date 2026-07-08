<script setup lang="ts"></script>

<template>
  <div class="empty-chenghua-demo">
    <div class="empty-chenghua-demo__list">
      <s-empty theme="chenghua" description="暂无服务申请" width="72">
        <s-button theme="chenghua" type="primary" size="small">新建申请</s-button>
      </s-empty>
      <s-empty theme="chenghua" description="当前筛选条件下暂无数据" width="84" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.empty-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.empty-chenghua-demo__list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

@media (max-width: 720px) {
  .empty-chenghua-demo__list {
    grid-template-columns: 1fr;
  }
}
</style>
