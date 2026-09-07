<script setup lang="ts"></script>

<template>
  <div class="sybz-button-demo">
    <div class="sybz-button-demo__row">
      <s-button theme="sybz" type="primary" icon="plus">新增项目</s-button>
      <s-button theme="sybz" icon="search">查询数据</s-button>
      <s-button theme="sybz" type="primary" disabled>禁用按钮</s-button>
    </div>

    <div class="sybz-button-demo__row">
      <s-button theme="sybz" type="success">成功状态</s-button>
      <s-button theme="sybz" type="warning">强调数据</s-button>
      <s-button theme="sybz" type="danger">风险操作</s-button>
      <s-button theme="sybz" type="info">辅助操作</s-button>
    </div>

    <div class="sybz-button-demo__row">
      <s-button theme="sybz" ghost>幽灵按钮</s-button>
      <s-button theme="sybz" type="primary" ghost>主要幽灵按钮</s-button>
      <s-button theme="sybz" type="danger" ghost>危险幽灵按钮</s-button>
      <s-button theme="sybz" ghost disabled>禁用幽灵按钮</s-button>
    </div>

    <div class="sybz-button-demo__row">
      <s-button theme="sybz" link>文字按钮</s-button>
      <s-button theme="sybz" link type="danger">查看详情</s-button>
      <s-button theme="sybz" text type="success">禁用文字</s-button>
    </div>

    <div class="sybz-button-demo__row">
      <s-button theme="sybz" type="primary" size="small">小尺寸</s-button>
      <s-button theme="sybz" type="primary">默认尺寸</s-button>
      <s-button theme="sybz" type="primary" size="large">大尺寸</s-button>
      <s-button theme="sybz" type="primary" width="180" height="44">固定宽高</s-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sybz-button-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sybz-button-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
