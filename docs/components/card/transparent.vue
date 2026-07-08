<template>
  <div class="card-transparent-demo">
    <div class="card-transparent-demo__surface">
      <SCard transparent title="透明背景">
        我是内容

        <template #footer>
          <s-button>取消</s-button>
          <s-button type="primary">提交</s-button>
        </template>
      </SCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-transparent-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.card-transparent-demo__surface {
  padding: 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  background: var(--el-fill-color-lighter);
}

.card-transparent-demo__content {
  display: grid;
  gap: 8px;
  color: var(--el-text-color-primary);
}

.card-transparent-demo__content div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  line-height: 1.6;
}

.card-transparent-demo__content span {
  color: var(--el-text-color-secondary);
}
</style>
