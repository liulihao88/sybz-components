<script setup lang="ts">
import { ref, computed } from 'vue'
import { Menu as MenuIcon } from '@element-plus/icons-vue'

const slider = ref(20)

const active = ref('/menu/1')
const menus = computed(() => {
  return Array.from({ length: slider.value }, (_, index) => ({
    path: `/menu/${index + 1}`,
    title: `菜单项 ${index + 1}`,
    icon: MenuIcon,
  }))
})
</script>

<template>
  <el-slider v-model="slider" :min="1" :max="50"></el-slider>
  {{ slider }}
  <SMenu v-model="active" auto-height :options="menus" :router="false" height="420px" />
</template>
