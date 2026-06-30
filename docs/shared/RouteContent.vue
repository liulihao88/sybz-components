<script setup lang="ts">
import { Content as VitePressContent, useRoute } from 'vitepress'

defineOptions({
  name: 'RouteContent',
  inheritAttrs: false,
})

const route = useRoute()
</script>

<template>
  <VitePressContent :key="route.path" v-bind="$attrs" />
</template>
