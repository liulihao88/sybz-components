<script setup lang="ts">
import { createImageResolver } from 'sybz-components'

const imageModules = import.meta.glob('../../../packages/assets/images/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
})
const resolver = createImageResolver(imageModules, '../../../packages/assets/images')
</script>

<template>
  <s-image src="overview/group1.png" :resolver="resolver" width="240" height="150" fit="contain" />
</template>
