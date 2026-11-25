<script setup lang="ts">
import { ref } from 'vue'
const titleProps = ref<{ title: string; type: 'input' | 'label' }>({
  title: '标题',
  type: 'input',
})
</script>

<template>
  <s-radio v-model="titleProps.type" :options="['input', 'label']" simple title="type" variant="button" size="small" />
  <s-comp-title v-bind="titleProps" />
</template>
