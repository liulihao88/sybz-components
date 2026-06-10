<template>
  <div class="demo-row">
    <s-tooltip content="鼠标移入 1 秒后显示 tooltip" :show-after="1000">
      <el-button type="primary">延迟 1 秒触发</el-button>
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
