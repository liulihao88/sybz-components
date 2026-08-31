<template>
  <div class="demo-row">
    <s-tooltip placement="right">
      <el-button circle>
        <s-icon icon="plus"></s-icon>
      </el-button>
      <template #content>
        <div>这是 `content` 插槽</div>
        <div class="cl-blue">可以放任意自定义节点</div>
      </template>
    </s-tooltip>

    <s-tooltip placement="top">
      <span class="custom-trigger">我是自定义触发区域</span>
      <template #content>默认插槽可以自定义 tooltip 的触发内容</template>
    </s-tooltip>
  </div>
</template>

<style scoped lang="scss">
.demo-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.custom-trigger {
  color: var(--el-color-primary);
  cursor: pointer;
}
</style>
