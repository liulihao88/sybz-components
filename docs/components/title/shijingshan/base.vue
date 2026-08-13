<template>
  <div class="shijingshan-title-demo">
    <s-title title="石景山 AI 服务申请" theme="shijingshan" sub-title="审批中 12 个，待处理 4 个">
      <template #extra>
        <s-button theme="shijingshan" type="primary" size="small">新建申请</s-button>
        <s-button theme="shijingshan" size="small">查看全部</s-button>
      </template>
    </s-title>

    <s-title title="资源使用趋势" theme="shijingshan" type="" sub-title="近 7 天容量与对象数变化">
      <template #extra>
        <s-button theme="shijingshan" variant="outline" size="small">导出数据</s-button>
      </template>
    </s-title>

    <s-title title="基础信息" theme="shijingshan" type="form"></s-title>

    <s-title title="无图标标题" theme="shijingshan" type="simple">
      <span class="shijingshan-title-demo__tag">运行中</span>
    </s-title>
  </div>
</template>

<style lang="scss" scoped>
.shijingshan-title-demo {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.shijingshan-title-demo__tag {
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
