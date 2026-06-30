<script setup lang="ts">
import { Content as VitePressContent, useRoute } from 'vitepress'
import { computed } from 'vue'

defineOptions({
  name: 'RouteContent',
  inheritAttrs: false,
})

const route = useRoute()
const contentKey = computed(() => route.data.relativePath || route.path)
</script>

<template>
  <VitePressContent :key="contentKey" v-bind="$attrs" />
</template>
