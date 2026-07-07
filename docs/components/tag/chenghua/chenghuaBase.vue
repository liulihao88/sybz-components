<template>
  <div class="tag-chenghua-demo">
    <div class="tag-demo-meta">
      <span>属性: theme</span>
      <span>可选值: '' | 'chenghua' | 'shijingshan'</span>
      <span>默认值: ''</span>
      <span>属性: type</span>
      <span>可选值: primary | success | info | warning | danger</span>
      <span>默认值: primary</span>
      <span>属性: effect</span>
      <span>可选值: light | dark | plain</span>
      <span>默认值: light</span>
    </div>

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

.tag-demo-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 12px;
  color: var(--el-text-color-secondary);
  font-size: 12px;
  line-height: 1.5;
}
</style>
