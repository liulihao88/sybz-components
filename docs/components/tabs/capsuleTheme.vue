<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('web')
const navList = [
  { label: '网页应用', value: 'web' },
  { label: '小程序', value: 'mini' },
  { label: '技能创建', value: 'skill' },
]
</script>

<template>
  <s-tabs v-model="activeTab" :options="navList" type="capsule-theme" theme="chenghua" height="80" />
</template>
