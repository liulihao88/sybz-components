<script setup lang="ts">
import { ref } from 'vue'

const hideOnSinglePage = ref(false)
</script>

<template>
  <div class="pagination-single-page-demo">
    <label>
      <input v-model="hideOnSinglePage" type="checkbox" />
      hideOnSinglePage：{{ hideOnSinglePage }}
    </label>
    <s-pagination :total="8" :page-size="10" :hide-on-single-page="hideOnSinglePage" />
  </div>
</template>

<style scoped>
.pagination-single-page-demo {
  display: grid;
  gap: 16px;
}
</style>
