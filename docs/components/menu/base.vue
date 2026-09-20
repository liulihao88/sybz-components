<script setup lang="ts">
import { ref } from 'vue'
import { ChatDotRound, Collection, EditPen, Link, Setting, Timer } from '@element-plus/icons-vue'

const active = ref('/material')
const header = { title: '公众号自动化', subTitle: 'WECHAT AUTOMATION', icon: ChatDotRound }
const menus = [
  { path: '/material', title: '素材', icon: Collection },
  { path: '/writing', title: '写作', icon: EditPen },
  {
    path: '/source',
    title: '数据源',
    icon: 'Coin',
    children: [
      { path: '/source/subscription', title: '订阅源', icon: Link },
      {
        path: '/source/platform',
        title: '平台对接',
        icon: 'Connection',
        children: [{ path: '/source/platform/list', title: '接口列表', icon: 'List' }],
      },
    ],
  },
  {
    path: '/settings',
    title: '系统配置',
    icon: Setting,
    children: [
      { path: '/settings/general', title: '通用配置', icon: Setting },
      { path: '/settings/schedule', title: '定时计划', icon: Timer },
    ],
  },
]
</script>

<template>
  <div class="h-400 bg-yellow">
    <SMenu v-model="active" :header="header" :options="menus" width="320px" auto-height :default-open-all="false" />
  </div>
</template>

<style scoped></style>
