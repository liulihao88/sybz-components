<template>
  <div class="basic-layout-transparent-demo">
    <div class="basic-layout-transparent-demo__meta">
      <span>属性: transparent</span>
      <span>可选值: true | false</span>
      <span>默认值: false</span>
    </div>

    <div class="basic-layout-transparent-demo__surface">
      <SBasicLayout transparent title="透明背景">
        我是内容

        <template #footer>
          <s-button>取消</s-button>
          <s-button type="primary">提交</s-button>
        </template>
      </SBasicLayout>
    </div>
  </div>
</template>

<style scoped lang="scss">
.basic-layout-transparent-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.basic-layout-transparent-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.basic-layout-transparent-demo__surface {
  padding: 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  background: var(--el-fill-color-lighter);
}

.basic-layout-transparent-demo__content {
  display: grid;
  gap: 8px;
  color: var(--el-text-color-primary);
}

.basic-layout-transparent-demo__content div {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  line-height: 1.6;
}

.basic-layout-transparent-demo__content span {
  color: var(--el-text-color-secondary);
}
</style>
