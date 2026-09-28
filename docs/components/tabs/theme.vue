<template>
  <s-radio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <s-tabs v-model="activeTab" :options="navList" width="300" :theme="theme" />
  <div>当前主题：{{ theme }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'
const theme = ref<(typeof docThemeOptions)[number]>('default')
const activeTab = ref('chenghua')
const navList = [
  { label: '成华', value: 'chenghua' },
  { label: '思云博智', value: 'sybz' },
]
</script>
