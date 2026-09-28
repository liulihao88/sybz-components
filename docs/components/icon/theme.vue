<template>
  <s-radio v-model="theme" :options="docThemeOptions" show-type="button" title="theme" class="p-b-10" />
  <div class="theme-icons">
    <div v-for="variant in variants" :key="variant" class="theme-icons__row">
      <span>{{ variant }}</span>
      <s-icon
        v-for="type in types"
        :key="type"
        icon="warning"
        :theme="theme"
        :type="type"
        :variant="variant"
        size="20"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { docThemeOptions } from '../../.vitepress/theme/theme'
const theme = ref<(typeof docThemeOptions)[number]>('default')

const types = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
const variants = ['plain', 'light', 'solid'] as const
</script>

<style scoped>
.theme-icons {
  display: grid;
  gap: 12px;
}

.theme-icons__row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-icons__row > span {
  width: 44px;
  color: var(--el-text-color-secondary);
}
</style>
