<script setup lang="ts">
import { ref } from 'vue'
import { Menu as MenuIcon } from '@element-plus/icons-vue'

const active = ref('/menu/1')
const menus = Array.from({ length: 10 }, (_, index) => ({
  path: `/menu/${index + 1}`,
  title: `菜单项 ${index + 1}`,
  icon: MenuIcon,
}))
</script>

<template>
  <SMenu v-model="active" auto-height :options="menus" :router="false" height="420px" />
</template>
