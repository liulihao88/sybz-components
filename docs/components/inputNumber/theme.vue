<script setup lang="ts">
import { docThemeOptions } from '../../.vitepress/theme/theme'

import { ref } from 'vue'
const theme = ref<(typeof docThemeOptions)[number]>('default')

const count = ref(12)
const quota = ref(36)
const disabledValue = ref(8)
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" variant="button" title="theme" class="p-b-10" />
  <s-flex gap="small">
    <s-input-number v-model="count" :theme="theme" title="审核数量" width="240" height="40" :min="0" />
    <s-input-number v-model="quota" :theme="theme" title="容量配额" height="40" />
    <s-input-number v-model="disabledValue" :theme="theme" title="禁用项" height="40" :min="0" disabled />
  </s-flex>
</template>

<style scoped lang="scss"></style>
