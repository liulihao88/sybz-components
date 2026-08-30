<script setup lang="ts">
import { ref } from 'vue'
import { DataAnalysis, Document, OfficeBuilding, Plus, Setting } from '@element-plus/icons-vue'

const active = ref('/overview')
const header = { title: '成华区AI产业服务平台', subtitle: 'AI INDUSTRY SERVICE', icon: OfficeBuilding }
const actionConfig = { text: '新增服务', icon: Plus }
const footerConfig = { title: '成华管理员', subtitle: '产业服务中心', avatar: '成' }
const menus = [
  { path: '/overview', title: '产业概览', icon: DataAnalysis },
  { path: '/enterprise', title: '企业服务', icon: OfficeBuilding },
  { path: '/policy', title: '政策申报', icon: Document },
  { path: '/settings', title: '系统设置', icon: Setting },
]
</script>

<template>
  <SMenu
    v-model="active"
    theme="chenghua"
    :header="header"
    :action-config="actionConfig"
    :footer-config="footerConfig"
    :options="menus"
    :router="false"
    width="320px"
    height="560px"
  />
</template>
