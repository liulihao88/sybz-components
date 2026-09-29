<script setup lang="tsx">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'
const theme = ref<(typeof docThemeOptions)[number]>('default')

const options = [
  { label: '服务名称', value: '成华 AI 审核服务' },
  { label: '服务编号', value: 'CH-AI-20260618001' },
  { label: '当前状态', value: '运行中' },
  { label: '负责人', value: '李明' },
  { label: '调用次数', value: '12,860 次' },
  { label: '创建时间', value: '2026-06-18 09:30:00' },
  {
    label: '服务说明服务说明服务说明服务说明服务说明服务说明',
    value:
      '宽度没有占据100%是因为设置了tooltipAttrs, 用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。',
    column: 3,
  },
  {
    label: '单独设置tooltip宽度服务说明服务说明服务说明服务说明服务说明服务说明',
    value:
      '单独设置tooltipAttrs, 用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。用于成华区企业服务申请材料的智能审核、风险提示和人工复核辅助。',
    column: 3,
    tooltipAttrs: {
      popperStyle: { width: '500px', maxWidth: '500px', whiteSpace: 'normal' },
    },
  },
]
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <div class="descriptions-chenghua-demo">
    <s-descriptions
      :theme="theme"
      title="服务基础信息"
      extra="更新时间 10:24"
      :options="options"
      label-width="100"
      :tooltip-attrs="{
        popperStyle: { width: '200px', maxWidth: '200px', whiteSpace: 'normal' },
      }"
    />
  </div>
</template>

<style scoped lang="scss">
.descriptions-chenghua-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
