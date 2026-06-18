<script setup lang="ts">
const attrs = [
  { label: 'theme', value: "'' | 'chenghua'", defaultValue: "''" },
  { label: 'description', value: 'string', defaultValue: '暂无数据' },
  { label: 'width', value: 'string | number', defaultValue: '60' },
]
</script>

<template>
  <div class="empty-chenghua-demo">
    <div class="empty-chenghua-demo__meta">
      <span v-for="item in attrs" :key="item.label">
        属性: {{ item.label }} / 可选值: {{ item.value }} / 默认值: {{ item.defaultValue }}
      </span>
    </div>

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

.empty-chenghua-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
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
