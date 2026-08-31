<template>
  <SCard title="已合并区块" merge-sections>
    <div class="card-merge-sections-demo__content">
      <div>
        <span>规则范围</span>
        <strong>对象存储巡检 / AI 审核任务</strong>
      </div>
      <div>
        <span>最近执行</span>
        <strong>2026-06-17 10:24</strong>
      </div>
      <div>
        <span>状态</span>
        <strong>已启用</strong>
      </div>
    </div>
    <template #footer>
      <s-button>取消</s-button>
      <s-button type="primary">保存配置</s-button>
    </template>
  </SCard>
</template>

<style scoped lang="scss">
.card-merge-sections-demo__content {
  display: grid;
  gap: 12px;

  > div {
    display: flex;
    justify-content: space-between;
  }

  span {
    color: var(--el-text-color-secondary);
  }
}

:deep(.s-card__footer) {
  display: flex;
  gap: 12px;
}
</style>
