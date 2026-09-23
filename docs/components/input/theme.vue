<script setup lang="ts">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'

const theme = ref<(typeof docThemeOptions)[number]>('default')
const name = ref('')
const owner = ref('')
const keyword = ref('工作小组')
const remark = ref('')
</script>

<template>
  <SRadio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <s-flex gap="small" direction="column">
    <s-input v-model="name" :theme="theme" width="320" size="large" placeholder="请输入服务名称" />
    <s-input v-model="owner" :theme="theme" width="320" title="负责人" placeholder="请输入负责人" />
    <s-input v-model="keyword" :theme="theme" width="320" search placeholder="搜索工作小组" />
    <s-input v-model="remark" :theme="theme" width="320" type="textarea" :rows="3" placeholder="请输入备注" />
  </s-flex>
</template>
