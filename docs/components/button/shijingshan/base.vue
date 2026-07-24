<script setup lang="ts"></script>

<template>
  <div class="shijingshan-button-demo">
    <div class="shijingshan-button-demo__row">
      <s-button theme="shijingshan" type="primary" icon="plus">新增项目</s-button>
      <s-button theme="shijingshan" icon="search">查询数据</s-button>
      <s-button theme="shijingshan" type="primary" disabled>禁用按钮</s-button>
    </div>

    <div class="shijingshan-button-demo__row">
      <s-button theme="shijingshan" type="success">成功状态</s-button>
      <s-button theme="shijingshan" type="warning">强调数据</s-button>
      <s-button theme="shijingshan" type="danger">风险操作</s-button>
      <s-button theme="shijingshan" type="info">辅助操作</s-button>
    </div>

    <div class="shijingshan-button-demo__row">
      <s-button theme="shijingshan" ghost>幽灵按钮</s-button>
      <s-button theme="shijingshan" type="primary" ghost>主要幽灵按钮</s-button>
      <s-button theme="shijingshan" type="danger" ghost>危险幽灵按钮</s-button>
      <s-button theme="shijingshan" ghost disabled>禁用幽灵按钮</s-button>
    </div>

    <div class="shijingshan-button-demo__row">
      <s-button theme="shijingshan" text>文字按钮</s-button>
      <s-button theme="shijingshan" link>查看详情</s-button>
      <s-button theme="shijingshan" text disabled>禁用文字</s-button>
    </div>

    <div class="shijingshan-button-demo__row">
      <s-button theme="shijingshan" type="primary" size="small">小尺寸</s-button>
      <s-button theme="shijingshan" type="primary">默认尺寸</s-button>
      <s-button theme="shijingshan" type="primary" size="large">大尺寸</s-button>
      <s-button theme="shijingshan" type="primary" width="180" height="44">固定宽高</s-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shijingshan-button-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.shijingshan-button-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
