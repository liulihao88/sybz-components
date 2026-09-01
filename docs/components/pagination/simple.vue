<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
</script>

<template>
  <s-pagination
    v-model:current-page="page"
    :total="100"
    :page-size="10"
    :show-total="false"
    :show-jumper="false"
    :show-sizes="false"
  />
</template>
