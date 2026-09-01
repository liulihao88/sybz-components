<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const pageSize = ref(10)
</script>

<template>
  <s-pagination v-model:current-page="page" v-model:page-size="pageSize" :total="85" :page-sizes="[10, 20, 50]" />
</template>
