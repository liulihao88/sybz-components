<script setup lang="ts">
import MarkdownIt from 'markdown-it'
import SafeHtml from '@/components/utils/SafeHtml.vue'
import changelogRaw from '../../../../CHANGELOG.md?raw'

const md = new MarkdownIt()

const content = changelogRaw.replace(/^#\s+Changelog\s*/u, '').trim()
const html = md.render(content)
</script>

<template>
  <SafeHtml tag="div" class="vp-doc changelog-content" :html="html" />
</template>
