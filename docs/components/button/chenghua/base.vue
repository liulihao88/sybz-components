<template>
  <div class="chenghua-button-demo">
    <div class="chenghua-button-demo__entry">
      <s-button theme="chenghua" variant="gradient" icon="set-up" width="288" size="large">审核规则管理</s-button>
      <s-button theme="chenghua" variant="outline" icon="plus" width="178" size="large">新建审核规则</s-button>

      <s-button theme="chenghua" size="small">小</s-button>
      <s-button theme="chenghua">默认</s-button>
      <s-button theme="chenghua" size="large">大</s-button>
    </div>

    <div class="chenghua-button-demo__row">
      <s-button theme="chenghua" type="primary">主要按钮</s-button>
      <s-button theme="chenghua" type="primary" icon="plus">新增服务</s-button>
      <s-button theme="chenghua" type="primary" disabled>禁用按钮</s-button>
    </div>

    <div class="chenghua-button-demo__row">
      <s-button theme="chenghua" type="success">Success</s-button>
      <s-button theme="chenghua" type="warning">Warning</s-button>
      <s-button theme="chenghua" type="danger">Danger</s-button>
      <s-button theme="chenghua" type="info">Info</s-button>
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

    <div class="chenghua-button-demo__size">
      <s-button theme="chenghua" type="primary" width="100%">width="100%"</s-button>
      <s-button theme="chenghua" width="180">width="180"</s-button>
      <s-button theme="chenghua" height="60">height="60"</s-button>
      <s-button theme="chenghua" type="primary" width="180" height="30">width + height</s-button>
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

.chenghua-button-demo__entry {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  align-items: center;
}

.chenghua-button-demo__size {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  max-width: 420px;
}

.chenghua-button-demo__row--wide {
  max-width: 400px;
}
</style>
