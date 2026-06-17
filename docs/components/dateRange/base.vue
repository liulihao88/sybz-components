<script setup lang="ts">
import { ref, getCurrentInstance, h } from 'vue'
const { proxy } = getCurrentInstance()
const dateValue = ref([])
</script>

<template>
  <div>
    <s-date-range v-model="dateValue"></s-date-range>
  </div>
</template>

<style scoped lang="scss"></style>
