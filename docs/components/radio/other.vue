<script setup lang="ts">
import { ref } from 'vue'
const value = ref('是')
const radioProps = ref({ title: '是否启用', required: false })
</script>

<template>
  <s-radio
    v-model="radioProps.required"
    :options="[true, false]"
    simple
    title="required"
    variant="button"
    size="small"
  />
  <s-radio v-model="value" v-bind="radioProps" :options="['是', '否']" simple />
</template>
