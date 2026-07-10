<template>
  <div class="tag-shijingshan-demo">
    <s-flex gap="small">
      <s-tag theme="shijingshan" type="primary">运行中</s-tag>
      <s-tag theme="shijingshan" type="success">已完成</s-tag>
      <s-tag theme="shijingshan" type="warning">待处理</s-tag>
      <s-tag theme="shijingshan" type="danger">异常</s-tag>
      <s-tag theme="shijingshan" type="info">未知</s-tag>
    </s-flex>

    <s-flex gap="small">
      <s-tag theme="shijingshan" type="primary" effect="dark">深色主状态</s-tag>
      <s-tag theme="shijingshan" type="warning" effect="plain">描边提醒</s-tag>
      <s-tag theme="shijingshan" type="danger" closable>可关闭异常</s-tag>
    </s-flex>

    <s-flex gap="small" align="center">
      <s-tag theme="shijingshan" type="primary" size="small">small</s-tag>
      <s-tag theme="shijingshan" type="primary">default</s-tag>
      <s-tag theme="shijingshan" type="primary" size="large">large</s-tag>
    </s-flex>
  </div>
</template>

<style scoped lang="scss">
.tag-shijingshan-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
