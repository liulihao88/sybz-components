<script setup lang="ts">
import { ElOption, ElSelect } from 'element-plus'
import { docThemeOptions, docThemeState, setDocTheme } from '../theme'

const handleThemeChange = (theme: (typeof docThemeOptions)[number]) => setDocTheme(theme)
</script>

<template>
  <s-select
    v-model="docThemeState.theme"
    class="docs-theme-selector"
    size="small"
    height="32"
    :teleported="false"
    aria-label="选择组件主题"
    :options="docThemeOptions"
    type="simple"
    @change="handleThemeChange"
  ></s-select>
</template>

<style scoped>
.docs-theme-selector {
  width: 128px;
  margin-left: 8px;
}
</style>
