<!-- eslint-disable vue/no-v-html -->
<template>
  <div v-if="tag === 'div'" v-bind="$attrs" v-html="sanitizedHtml"></div>
  <span v-else v-bind="$attrs" v-html="sanitizedHtml"></span>
</template>
<!-- eslint-enable vue/no-v-html -->

<script setup lang="ts">
import { computed } from 'vue'
import { sanitizeHtml } from './safeHtml'

defineOptions({
  name: 'SafeHtml',
})

interface Props {
  html?: string | number
  tag?: 'span' | 'div'
}

const props = withDefaults(defineProps<Props>(), {
  html: '',
  tag: 'span',
})

const sanitizedHtml = computed(() => sanitizeHtml(String(props.html ?? '')))
</script>
