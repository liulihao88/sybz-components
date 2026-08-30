<script setup lang="ts">
import { ref } from 'vue'
import { DataBoard, Document, OfficeBuilding, Setting } from '@element-plus/icons-vue'

const active = ref('/dashboard')
const header = { title: '石景山产业服务', subtitle: 'INDUSTRY SERVICE', icon: OfficeBuilding }
const footerConfig = { title: '平台管理员', subtitle: '石景山产业服务平台', avatar: '石' }
const menus = [
  { path: '/dashboard', title: '数据看板', icon: DataBoard },
  { path: '/enterprise', title: '企业管理', icon: OfficeBuilding },
  { path: '/policy', title: '政策服务', icon: Document },
  { path: '/settings', title: '系统设置', icon: Setting },
]
</script>

<template>
  <SMenu
    v-model="active"
    theme="shijingshan"
    :header="header"
    :footer-config="footerConfig"
    :options="menus"
    :router="false"
    width="240px"
    height="560px"
  />
</template>
