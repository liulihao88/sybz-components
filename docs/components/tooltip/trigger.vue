<template>
  <div class="demo-row">
    <s-tooltip content="默认使用 hover 触发" trigger="hover">
      <el-button type="primary">hover</el-button>
    </s-tooltip>
    <s-tooltip content="点击按钮时显示 tooltip" trigger="click">
      <el-button type="primary">click</el-button>
    </s-tooltip>
    <s-tooltip content="右键触发 tooltip" trigger="contextmenu">
      <el-button type="primary">contextmenu</el-button>
    </s-tooltip>
    <s-tooltip content="点击或右键都可以触发" :trigger="['contextmenu', 'click']">
      <el-button type="primary">click + contextmenu</el-button>
    </s-tooltip>
  </div>
</template>

<style scoped lang="scss">
.demo-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
</style>
