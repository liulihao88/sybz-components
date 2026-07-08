<template>
  <div class="tag-chenghua-demo">
    <s-flex gap="small">
      <s-tag theme="chenghua" type="primary">运行中</s-tag>
      <s-tag theme="chenghua" type="success">已完成</s-tag>
      <s-tag theme="chenghua" type="warning">待处理</s-tag>
      <s-tag theme="chenghua" type="danger">异常</s-tag>
      <s-tag theme="chenghua" type="info">未知</s-tag>
    </s-flex>

    <s-flex gap="small">
      <s-tag theme="chenghua" type="primary" effect="dark">深色主状态</s-tag>
      <s-tag theme="chenghua" type="warning" effect="plain">描边提醒</s-tag>
      <s-tag theme="chenghua" type="danger" closable>可关闭异常</s-tag>
    </s-flex>
  </div>
</template>

<style scoped lang="scss">
.tag-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
