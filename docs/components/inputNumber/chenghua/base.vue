<script setup lang="ts">
import { ref } from 'vue'

const count = ref(12)
const quota = ref(36)
const disabledValue = ref(8)
</script>

<template>
  <s-flex gap="small">
    <s-input-number v-model="count" theme="chenghua" title="审核数量" width="240" height="40" :min="0" />
    <s-input-number v-model="quota" theme="chenghua" title="容量配额" height="40" />
    <s-input-number v-model="disabledValue" theme="chenghua" title="禁用项" height="40" :min="0" disabled />
  </s-flex>
</template>

<style scoped lang="scss"></style>
