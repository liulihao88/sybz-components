<template>
  <div class="chenghua-button-demo">
    <div class="chenghua-button-demo__row">
      <s-button theme="chenghua" type="primary" width="400">主要按钮</s-button>
      <s-button theme="chenghua" type="primary" icon="plus">新增服务</s-button>
      <s-button theme="chenghua" type="primary" disabled>禁用按钮</s-button>
    </div>

    <div class="chenghua-button-demo__row">
      <s-button theme="chenghua">次要按钮</s-button>
      <s-button theme="chenghua" icon="search">查询</s-button>
      <s-button theme="chenghua" disabled>禁用按钮</s-button>
    </div>

    <div class="chenghua-button-demo__row">
      <s-button theme="chenghua" link>查看详情</s-button>
      <s-button theme="chenghua" text>文字按钮</s-button>
      <s-button theme="chenghua" text disabled>禁用文字</s-button>
    </div>

    <div>
      <s-button theme="chenghua" type="primary" width="100%">整行按钮</s-button>
    </div>
    <div>
      <s-button size="small">small</s-button>
      <s-button>默认</s-button>
      <s-button size="large">large</s-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chenghua-button-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chenghua-button-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.chenghua-button-demo__row--wide {
  max-width: 400px;
}
</style>
