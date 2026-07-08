<template>
  <div class="button-hover-animation-demo">
    <div class="button-hover-animation-demo__row">
      <s-button hover-animation type="primary">移入动效</s-button>
      <s-button hover-animation>默认按钮</s-button>
      <s-button hover-animation type="success">保存</s-button>
      <s-button :hover-animation="false" type="primary">默认无动效</s-button>
      <s-button hover-animation type="primary" disabled>禁用无动效</s-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-hover-animation-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.button-hover-animation-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
