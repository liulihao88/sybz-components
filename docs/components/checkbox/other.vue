<script setup lang="ts">
import { ref } from 'vue'
const value = ref(['选项一'])
const checkboxProps = ref({ title: '可选项', required: false })
</script>

<template>
  <s-radio
    v-model="checkboxProps.required"
    :options="[true, false]"
    simple
    title="required"
    variant="button"
    size="small"
  />
  <s-checkbox v-model="value" v-bind="checkboxProps" :options="['选项一', '选项二']" type="simple" :show-all="false" />
</template>
