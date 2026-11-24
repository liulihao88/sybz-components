<script setup lang="ts">
import { computed, ref } from 'vue'
import { Collection, EditPen, Setting, Timer } from '@element-plus/icons-vue'

const active = ref('/settings/general')
const size = ref<'small' | 'default' | 'large' | 'custom'>('default')
const menus = [
  { path: '/material', title: '素材', icon: Collection },
  { path: '/writing', title: '写作', icon: EditPen },
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
const customSize = {
  fontSize: 13,
  height: 44,
  lineHeight: 44,
  padding: '0 12px',
  levelPadding: 12,
  margin: 3,
  iconSize: 16,
  listPadding: 12,
}
const menuSize = computed(() => (size.value === 'custom' ? customSize : size.value))
</script>

<template>
  <s-radio
    v-model="size"
    :options="['small', 'default', 'large', 'custom']"
    type="simple"
    title="size（默认 default）"
    class="m-b-12"
  ></s-radio>
  <SMenu v-model="active" :size="menuSize" :options="menus" :router="false" height="420px" />
</template>
