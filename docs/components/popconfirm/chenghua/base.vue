<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const proxy = getCurrentInstance()?.proxy as { $toast?: (message: string) => void } | null

function confirm() {
  proxy?.$toast?.('confirm')
}
</script>

<template>
  <div class="popconfirm-chenghua-demo">
    <div class="popconfirm-chenghua-demo__props">
      <span>属性: theme</span>
      <span>可选值: '' | chenghua</span>
      <span>默认值: ''</span>
      <span>属性: content</span>
      <span>支持: 文本 | 安全白名单 HTML</span>
      <span>默认值: ''</span>
      <span>属性: dangerouslyUseHTMLString</span>
      <span>可选值: true | false</span>
      <span>默认值: false</span>
    </div>

    <div class="popconfirm-chenghua-demo__actions">
      <s-popconfirm
        theme="chenghua"
        title="确认删除任务"
        content="确定删除<code>智慧档案检索</code>吗?"
        :dangerously-use-html-string="true"
        width="260"
        trigger="click"
        @confirm="confirm"
      >
        <s-button theme="chenghua" type="danger">删除服务</s-button>
      </s-popconfirm>

      <s-popconfirm
        theme="chenghua"
        title="发布确认"
        content="将发布到<code>生产环境</code>, 请确认配置无误。"
        :dangerously-use-html-string="true"
        width="280"
        trigger="click"
        @confirm="confirm"
      >
        <s-button theme="chenghua" type="primary">发布配置</s-button>
      </s-popconfirm>
    </div>
  </div>
</template>

<style scoped lang="scss">
.popconfirm-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.popconfirm-chenghua-demo__props {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  color: #5f6673;
  font-size: 13px;
  line-height: 1.6;

  span {
    padding: 2px 8px;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background: #f8fafc;
  }
}

.popconfirm-chenghua-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
