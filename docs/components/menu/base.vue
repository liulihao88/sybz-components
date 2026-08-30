<script setup lang="ts">
import { ref } from 'vue'
import { Collection, EditPen, Link, Setting, Timer } from '@element-plus/icons-vue'

const active = ref('/material')
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
  <div class="menu-demo">
    <SMenu v-model="active" :options="menus" :router="false" width="320px" height="680px">
      <template #header>
        <div class="brand">
          <span class="brand__logo">S</span>
          <div>
            <b>公众号自动化</b>
            <small>WECHAT AUTOMATION</small>
          </div>
        </div>
      </template>
      <template #footer><div class="footer">☰</div></template>
    </SMenu>
  </div>
</template>

<style scoped>
/* .menu-demo { display: flex; justify-content: center; }
.brand { display: flex; align-items: center; gap: 14px; padding: 24px; color: white; }
.brand__logo { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; background: #07c160; font-weight: 700; }
.brand b { display: block; font-size: 22px; }
.brand small { display: block; margin-top: 4px; color: #aeb7c6; letter-spacing: 2px; }
.footer { padding: 18px; border-top: 1px solid #294057; background: #061f31; color: #cbd5e1; text-align: center; font-size: 20px; } */
</style>
