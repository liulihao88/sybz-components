<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChatDotRound, Collection, EditPen, Link, Setting, Timer } from '@element-plus/icons-vue'

const active = ref('/material')
const brandTitle = ref('公众号自动化')
const header = computed(() => ({
  title: brandTitle.value,
  subtitle: 'WECHAT AUTOMATION',
  icon: ChatDotRound,
  collapsedTooltip: `${brandTitle.value} · 工作台`,
  style: { cursor: 'pointer' },
  handler: () => {
    brandTitle.value = '公众号工作台'
  },
}))
const footer = computed(() => ({
  title: brandTitle.value,
  avatar: '公',
  style: { cursor: 'pointer' },
  handler: () => {
    brandTitle.value = '公众号自动化'
  },
}))
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
  <s-flex class="bg-yellow h-100">
    <SMenu
      v-model="active"
      :header="header"
      :footer="footer"
      :options="menus"
      width="320px"
      :default-open-all="false"
      :router="false"
      variant="dark"
    />
    <div>123456789101112131415161718192021222324</div>
  </s-flex>
</template>

<style scoped></style>
