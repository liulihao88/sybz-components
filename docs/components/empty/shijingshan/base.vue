<script setup lang="ts">
const attrs = [
  { label: 'theme', value: "'default' | 'chenghua' | 'shijingshan'", defaultValue: "'default'" },
  { label: 'description', value: 'string', defaultValue: '暂无数据' },
  { label: 'width', value: 'string | number', defaultValue: '60' },
]
</script>

<template>
  <div class="empty-shijingshan-demo">
    <div class="empty-shijingshan-demo__meta">
      <span v-for="item in attrs" :key="item.label">
        属性: {{ item.label }} / 可选值: {{ item.value }} / 默认值: {{ item.defaultValue }}
      </span>
    </div>

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

.empty-shijingshan-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
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
