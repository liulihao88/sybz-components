<script setup lang="ts">
import { ref } from 'vue'
import { DataAnalysis, Document, OfficeBuilding, Plus, Setting } from '@element-plus/icons-vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'

const active = ref('/overview')
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
  { path: '/enterprise', title: '企业服务', icon: OfficeBuilding },
  { path: '/policy', title: '政策申报', icon: Document },
  { path: '/settings', title: '系统设置', icon: Setting },
]
</script>

<template>
  <div class="menu-theme-controls">
    <div class="menu-theme-controls__row">
      <span>theme</span>
      <SRadio v-model="theme" :options="docThemeOptions" show-type="button" />
    </div>
    <div class="menu-theme-controls__row">
      <span>variant</span>
      <SRadio v-model="variant" :options="variantOptions" show-type="button" />
    </div>
  </div>
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

<style scoped>
.menu-theme-controls {
  display: grid;
  gap: 12px;
  margin-bottom: 16px;
}

.menu-theme-controls__row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.menu-theme-controls__row > span {
  width: 52px;
  flex: none;
}
</style>
