<script setup lang="ts">
import { ref } from 'vue'
import { Document, House } from '@element-plus/icons-vue'

const active = ref('/home')
const created = ref(0)
const handleCreate = () => {
  created.value++
}
const header = { title: '工作台', icon: House }
const menus = [
  { path: '/home', title: '首页', icon: House },
  { path: '/documents', title: '文档', icon: Document },
]
</script>

<template>
  <SMenu v-model="active" :header="header" :options="menus" :router="false" :collapsible="false" height="340px">
    <template #append>
      <SButton type="primary" width="100%" @click="handleCreate">新建内容{{ created ? ` (${created})` : '' }}</SButton>
    </template>
  </SMenu>
</template>
