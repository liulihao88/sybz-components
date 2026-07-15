<template>
  <div class="chenghua-title-demo">
    <s-title title="成华 AI 服务申请" theme="chenghua" sub-title="审批中 12 个，待处理 4 个">
      <template #extra>
        <s-button theme="chenghua" type="primary" size="small">新建申请</s-button>
        <s-button theme="chenghua" size="small">查看全部</s-button>
      </template>
    </s-title>

    <s-title title="资源使用趋势" theme="chenghua" type="" sub-title="近 7 天容量与对象数变化">
      <template #extra>
        <s-button theme="chenghua" variant="outline" size="small">导出数据</s-button>
      </template>
    </s-title>

    <s-title title="基础信息" theme="chenghua" type="form"></s-title>

    <s-title title="无图标标题" theme="chenghua" type="simple">
      <template #append><span class="chenghua-title-demo__tag">运行中</span></template>
    </s-title>
  </div>
</template>

<style lang="scss" scoped>
.chenghua-title-demo {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.chenghua-title-demo__tag {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  border: 1px solid rgba(22, 93, 255, 0.18);
  border-radius: 4px;
  background: rgba(22, 93, 255, 0.06);
  color: #165dff;
  font-size: 12px;
  font-weight: 500;
  line-height: 1;
}
</style>
