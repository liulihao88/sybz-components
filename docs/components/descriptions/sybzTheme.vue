<script setup lang="tsx">
const options = [
  { label: '服务名称', value: '思云博智 AI 审核服务' },
  { label: '服务编号', value: 'CH-AI-20260618001' },
  { label: '当前状态', value: '运行中' },
  { label: '负责人', value: '李明' },
  { label: '创建时间', value: '2026-06-18 09:30:00' },
  { label: '调用次数', value: '12,860 次' },
  {
    label: '服务说明服务说明服务说明服务说明服务说明服务说明',
    value: '用于思云博智区企业服务申请材料的智能审核、风险提示和人工复核辅助。',
    attrs: { span: 3 },
  },
]
</script>

<template>
  <div class="descriptions-sybz-demo">
    <s-descriptions
      theme="sybz"
      title="服务基础信息"
      extra="更新时间 10:24"
      label-width="100px"
      :options="options"
      :column="3"
    />
  </div>
</template>

<style scoped lang="scss">
.descriptions-sybz-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
