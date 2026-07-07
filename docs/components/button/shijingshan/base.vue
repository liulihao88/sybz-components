<script setup lang="ts">
const propRows = [
  { label: 'theme', value: "'' | 'chenghua' | 'shijingshan'", defaultValue: "''" },
  { label: 'type', value: "'' | 'primary' | 'success' | 'warning' | 'danger' | 'info'", defaultValue: "''" },
  { label: 'size', value: "'' | 'small' | 'default' | 'large'", defaultValue: "''" },
  { label: 'width', value: 'string | number', defaultValue: "''" },
  { label: 'height', value: 'string | number', defaultValue: "''" },
]
</script>

<template>
  <div class="shijingshan-button-demo">
    <div class="shijingshan-button-demo__meta">
      <div v-for="item in propRows" :key="item.label">
        <span>属性: {{ item.label }}</span>
        <span>可选值: {{ item.value }}</span>
        <span>默认值: {{ item.defaultValue }}</span>
      </div>
    </div>

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

.shijingshan-button-demo__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 10px 12px;
    border: 1px solid #eef2f6;
    border-radius: 8px;
    background: #f8f9fa;
    color: #374151;
    font-size: 12px;
    line-height: 18px;
  }
}

.shijingshan-button-demo__row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
