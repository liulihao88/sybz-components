<template>
  <s-radio v-model="theme" :options="docThemeOptions" variant="button" title="theme" class="p-b-10" />
  <s-pagination v-model:current-page="page" :theme="theme" :total="80" :page-size="10" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { docThemeOptions, docThemeState } from '@docs/.vitepress/theme/theme'
const theme = ref<(typeof docThemeOptions)[number]>(docThemeState.theme)

watch(
  () => docThemeState.theme,
  (value) => {
    theme.value = value
  },
)
const page = ref(2)
</script>
