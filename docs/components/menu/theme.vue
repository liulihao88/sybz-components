<script setup lang="ts">
import { ref } from 'vue'
import { DataAnalysis, Document, OfficeBuilding, Plus, Setting } from '@element-plus/icons-vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'

const active = ref('/settings/general')
const theme = ref<(typeof docThemeOptions)[number]>('default')
const variant = ref<'light' | 'dark'>('light')
const variantOptions = [
  { label: '浅色', value: 'light' },
  { label: '深色', value: 'dark' },
]
const header = { title: '成华区AI产业服务平台', subtitle: 'AI INDUSTRY SERVICE', icon: OfficeBuilding }
const footer = { title: '成华管理员', subtitle: '产业服务中心', avatar: '成' }
const menus = [
  { path: '/overview', title: '产业概览', icon: DataAnalysis },
  {
    path: '/enterprise',
    title: '企业服务',
    icon: OfficeBuilding,
    children: [
      { path: '/settings/general', title: '通用配置', icon: 'plus' },
      { path: '/settings/schedule', title: '定时计划', icon: 'delete' },
    ],
  },
  { path: '/policy', title: '政策申报', icon: Document },
  { path: '/settings', title: '系统设置', icon: Setting },
]
</script>

<template>
  <s-flex gap="small" class="p-b-10">
    <SRadio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" />
    <SRadio v-model="variant" :options="variantOptions" show-type="button" title="variant" />
  </s-flex>
  <div class="h-400">
    <SMenu
      v-model="active"
      :theme="theme"
      :variant="variant"
      :header="header"
      :footer="footer"
      :options="menus"
      :router="false"
      width="320px"
      auto-height
    />
  </div>
</template>

<style scoped></style>
