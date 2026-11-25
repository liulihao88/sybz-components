<script setup lang="ts">
import { ref } from 'vue'
const value = ref(false)
const switchProps = ref({ title: '' })
</script>

<template>
  <s-radio v-model="switchProps.title" :options="['', '通知设置']" simple title="title" variant="button" size="small" />
  <s-switch v-model="value" v-bind="switchProps" />
</template>
