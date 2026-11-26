<script setup lang="ts">
import { ref } from 'vue'
const titleProps = ref<{ title: string; type: 'input' | 'label'; required: boolean }>({
  title: '标题',
  type: 'input',
  required: false,
})
</script>

<template>
  <s-radio v-model="titleProps.type" :options="['input', 'label']" simple title="type" variant="button" size="small" />
  <s-radio
    v-model="titleProps.required"
    :options="[true, false]"
    simple
    title="required"
    variant="button"
    size="small"
  />
  <s-comp-title v-bind="titleProps" />
</template>
