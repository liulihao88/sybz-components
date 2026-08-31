<template>
  <div class="tag-overflow-demo">
    <s-tag width="120" theme="shijingshan">这是一段超出标签宽度的完整文本</s-tag>
    <s-tag width="120" type="success" theme="shijingshan">未超出</s-tag>
    <s-tag width="140" type="warning" closable theme="shijingshan">可关闭的超长标签文本</s-tag>
  </div>
</template>

<style scoped>
.tag-overflow-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}
</style>
