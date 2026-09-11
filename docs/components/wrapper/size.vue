<template>
  <h4>width / height 默认值：空字符串</h4>
  <p>使用 width="360" height="120" 设置容器宽高，数字自动按 px 处理。</p>
  <s-wrapper width="360" height="120">
    <div style="background: var(--el-fill-color-light)">宽 360px，高 120px</div>
    <div style="background: var(--el-fill-color-light)">等分子项</div>
  </s-wrapper>

  <p>使用 width="100%" height="100%" 填满具有明确高度的父容器。</p>
  <div style="width: 100%; height: 160px">
    <s-wrapper width="100%" height="100%">
      <div style="background: var(--el-fill-color-light)">宽 100%，高 100%</div>
      <div style="background: var(--el-fill-color-light)">等分子项</div>
    </s-wrapper>
  </div>
</template>
