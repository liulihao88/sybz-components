<template>
  <div class="demo-box">
    <div>
      <div class="demo-label">gap=&quot;12&quot;，数字字符串会自动补 `px`</div>
      <sWrapper gap="12">
        <s-item label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png" />
        <s-item label="label" value="value" />
        <s-item label="label" value="value" />
      </sWrapper>
    </div>

    <div>
      <div class="demo-label">gap=&quot;5%&quot;，保留原始百分比单位</div>
      <sWrapper gap="5%">
        <s-item label="label" value="value" src="https://img.yzcdn.cn/vant/logo.png" />
        <s-item label="label" value="value" />
        <s-item label="label" value="value" />
      </sWrapper>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.demo-box {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-label {
  margin-bottom: 8px;
  color: var(--45);
}
</style>
