<script setup lang="ts"></script>

<template>
  <div class="warning-shijingshan-demo">
    <div class="warning-shijingshan-demo__list">
      <s-warning theme="shijingshan" title="服务提示" content="已启用石景山主题的信息提示，可用于展示普通说明。" />
      <s-warning
        theme="shijingshan"
        type="warning"
        dotted
        title="容量预警"
        content="当前资源使用率较高，建议及时扩容或调整任务队列。"
      />
      <s-warning
        theme="shijingshan"
        type="error"
        title="审核失败"
        content="请检查任务配置后重新提交，错误字段会在表单中高亮。"
      />
      <s-warning
        theme="shijingshan"
        type="simple"
        size="small"
        content="simple 类型会保持轻量文本提示，不展示边框背景。"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.warning-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.warning-shijingshan-demo__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
