<script setup lang="ts">
import { ref } from 'vue'
import { Document, House } from '@element-plus/icons-vue'

const active = ref('/home')
const created = ref(0)
const header = { title: '工作台', icon: House }
const menus = [
  { path: '/home', title: '首页', icon: House },
  { path: '/documents', title: '文档', icon: Document },
]
const isCollapse = ref(true)
</script>

<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :value="false">expand</el-radio-button>
    <el-radio-button :value="true">collapse</el-radio-button>
  </el-radio-group>
  {{ isCollapse }} -->
  <SMenu
    v-model="active"
    v-model:collapse="isCollapse"
    :header="header"
    :options="menus"
    :router="false"
    :collapsible="false"
    height="340px"
  >
    <template v-if="!isCollapse" #append>
      <SButton type="primary" width="100%" @click="created++">新建内容{{ created ? ` (${created})` : '' }}</SButton>
    </template>
  </SMenu>
</template>
