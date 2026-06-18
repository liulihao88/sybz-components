<template>
  <div class="row-demo">
    <div class="row-demo__meta">
      <span>属性: col</span>
      <span>可选值: number | number[]</span>
      <span>默认值: 24</span>
      <span>属性: colAttrs</span>
      <span>可选值: object</span>
      <span>默认值: {}</span>
    </div>

    <section class="row-demo__section">
      <div class="row-demo__title">自动包裹为 el-col</div>
      <s-row :col="6" :gutter="16">
        <div class="row-demo__block">span 6</div>
        <div class="row-demo__block">span 6</div>
        <div class="row-demo__block">span 6</div>
        <div class="row-demo__block">span 6</div>
      </s-row>
    </section>

    <section class="row-demo__section">
      <div class="row-demo__title">按顺序指定列宽</div>
      <s-row :col="[6, 12, 6]" :gutter="16">
        <div class="row-demo__block">6</div>
        <div class="row-demo__block row-demo__block--strong">12</div>
        <div class="row-demo__block">6</div>
      </s-row>
    </section>

    <section class="row-demo__section">
      <div class="row-demo__title">直接使用 el-col</div>
      <s-row :gutter="16">
        <el-col :span="8">
          <div class="row-demo__block">el-col 8</div>
        </el-col>
        <el-col :span="8" :offset="4">
          <div class="row-demo__block">offset 4</div>
        </el-col>
      </s-row>
    </section>

    <section class="row-demo__section">
      <div class="row-demo__title">统一透传 colAttrs</div>
      <s-row :gutter="16" :col-attrs="{ xs: 12, sm: 8, md: 6 }">
        <div class="row-demo__block">响应式</div>
        <div class="row-demo__block">响应式</div>
        <div class="row-demo__block">响应式</div>
        <div class="row-demo__block">响应式</div>
      </s-row>
    </section>
  </div>
</template>

<style scoped lang="scss">
.row-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.row-demo__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}

.row-demo__section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row-demo__title {
  color: var(--el-text-color-regular);
  font-size: 13px;
  font-weight: 600;
}

.row-demo__block {
  display: flex;
  min-height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-regular);
  font-size: 13px;
}

.row-demo__block--strong {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>
