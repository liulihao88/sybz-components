<script setup lang="ts">
import { Content as VitePressContent, useRoute } from 'vitepress'
import { computed, nextTick, watch } from 'vue'

defineOptions({
  name: 'RouteContent',
  inheritAttrs: false,
})

const route = useRoute()
const contentKey = computed(() => `${route.path}::${route.data.relativePath || ''}`)

const isRouteDebugEnabled = () => {
  if (typeof window === 'undefined') return false

  return (
    new URLSearchParams(window.location.search).has('debug-route') ||
    window.localStorage.getItem('sybz-route-debug') === '1'
  )
}

watch(
  contentKey,
  async (key, oldKey) => {
    if (!isRouteDebugEnabled()) return

    await nextTick()
    window.requestAnimationFrame(() => {
      const contentTitle = document.querySelector<HTMLElement>('main .vp-doc h1')?.innerText.trim() || ''

      console.info('[sybz-route-debug]', {
        oldKey,
        key,
        location: window.location.pathname,
        routePath: route.path,
        relativePath: route.data.relativePath,
        contentTitle,
      })
    })
  },
  { immediate: true },
)
</script>

<template>
  <VitePressContent :key="contentKey" v-bind="$attrs" />
</template>
