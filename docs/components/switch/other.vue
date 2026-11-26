<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
const switchProps = ref({ title: '通知设置', required: false })
</script>

<template>
  <s-radio v-model="switchProps.title" :options="['', '通知设置']" simple title="title" variant="button" size="small" />
  <s-radio
    v-model="switchProps.required"
    :options="[true, false]"
    simple
    title="required"
    variant="button"
    size="small"
  />
  <s-switch v-model="value" v-bind="switchProps" />
</template>
