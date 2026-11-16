<script setup lang="ts">
import { computed, ref } from 'vue'

const format = ref('pdf')
const mode = ref('inline')
const download = ref(true)
const files: Record<string, string> = {
  pdf: '/sybz-components/img/发票 (1).pdf',
  word: '/sybz-components/img/物业管理服务项目招标文件（[350105]FJCC[GK]202500220260104004）.docx',
  excel: '/sybz-components/img/test.xlsx',
  txt: 'data:text/plain;charset=utf-8,%E8%BF%99%E6%98%AF%20TXT%20%E6%96%87%E4%BB%B6%E9%A2%84%E8%A7%88',
  md: 'data:text/markdown;charset=utf-8,%23%20Markdown%20%E9%A2%84%E8%A7%88%0A%0A-%20%E5%88%97%E8%A1%A8%E9%A1%B9',
  csv: '/sybz-components/img/语文一年级上册_单元课时知识点目录.csv',
  tsv: '/sybz-components/img/语文一年级上册_单元课时知识点目录.tsv',
}
const src = computed(() => files[format.value])
</script>

<template>
  <s-flex direction="column" gap="16">
    <s-flex align="center" gap="16">
      <span>type：auto / txt / csv / tsv / pdf / md / word / excel；默认 auto</span>
      <s-radio v-model="format" :options="['txt', 'csv', 'tsv', 'pdf', 'md', 'word', 'excel']" />
    </s-flex>
    <s-flex align="center" gap="16">
      <span>mode：inline / dialog；默认 inline</span>
      <s-radio v-model="mode" :options="['inline', 'dialog']" />
    </s-flex>
    <s-flex align="center" gap="16">
      <span>download：true / false；默认 true</span>
      <s-radio v-model="download" :options="[true, false]" />
    </s-flex>
    <s-preview :src="src" :type="format" :mode="mode" :download="download" h="420" />
  </s-flex>
</template>
