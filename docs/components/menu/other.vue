<script setup lang="ts">
import { computed, ref } from 'vue'
import { Collection, EditPen, Setting, Timer } from '@element-plus/icons-vue'

const active = ref('/settings/general')
const collapsed = ref(true)
const menuProps = ref({
  size: 'default' as 'small' | 'default' | 'large' | 'custom',
  expandOnHover: true,
})
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
const menuSize = computed(() => (menuProps.value.size === 'custom' ? customSize : menuProps.value.size))
</script>

<template>
  <s-flex gap class="m-b-12">
    <s-radio
      v-model="menuProps.size"
      :options="['small', 'default', 'large', 'custom']"
      size="small"
      variant="button"
      simple
      title="size（默认 default）"
    />
    <s-radio
      v-model="menuProps.expandOnHover"
      :options="[true, false]"
      size="small"
      variant="button"
      simple
      title="expandOnHover（默认 true）"
    />
  </s-flex>
  <div class="hover-expand">
    <SMenu
      v-model="active"
      v-model:collapse="collapsed"
      :size="menuSize"
      :options="menus"
      :router="false"
      :expand-on-hover="menuProps.expandOnHover"
      height="420px"
    />
    <p>右侧内容区不会被推开</p>
  </div>
</template>

<style scoped lang="scss">
.hover-expand {
  display: flex;
  border: 1px solid #dce5ef;
  border-radius: 8px;
}
.hover-expand p {
  flex: 1;
  margin: 0;
  padding: 16px;
  color: #8da0b8;
  font-size: 13px;
}
</style>
