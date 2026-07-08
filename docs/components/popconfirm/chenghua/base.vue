<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const proxy = getCurrentInstance()?.proxy as { $toast?: (message: string) => void } | null

function confirm() {
  proxy?.$toast?.('confirm')
}
</script>

<template>
  <div class="popconfirm-chenghua-demo">
    <div class="popconfirm-chenghua-demo__actions">
      <s-popconfirm
        theme="chenghua"
        title="确认删除任务"
        content="确定删除<mark>智慧档案检索</mark>吗?"
        :dangerouslyUseHTMLString="true"
        width="260"
        trigger="click"
        @confirm="confirm"
      >
        <s-button theme="chenghua" type="danger">删除服务</s-button>
      </s-popconfirm>

      <s-popconfirm
        theme="chenghua"
        title="发布确认"
        content="将发布到<mark>生产环境</mark>, 请确认配置无误。"
        :dangerouslyUseHTMLString="true"
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

.popconfirm-chenghua-demo__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
