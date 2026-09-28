<script setup lang="ts">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'
const theme = ref<(typeof docThemeOptions)[number]>('default')
</script>

<template>
  <s-radio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <SItem :theme="theme" title="企业服务" sub-title="查看企业政策与服务进度" extra="立即查看" clickable>
    <template #prefix><span class="item-icon">企</span></template>
  </SItem>
</template>
<style scoped>
.item-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
  font-weight: 600;
}
</style>
