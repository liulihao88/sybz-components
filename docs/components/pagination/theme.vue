<script setup lang="ts">
import { ref } from 'vue'

const chenghuaPage = ref(2)
const shijingshanPage = ref(2)
</script>

<template>
  <div class="pagination-themes">
    <section>
      <h4>chenghua</h4>
      <s-pagination v-model:current-page="chenghuaPage" theme="chenghua" :total="80" />
    </section>
    <section>
      <h4>shijingshan</h4>
      <s-pagination v-model:current-page="shijingshanPage" theme="shijingshan" :total="80" :page-size="10" />
    </section>
  </div>
</template>

<style scoped>
.pagination-themes {
  display: grid;
  gap: 24px;
}

.pagination-themes h4 {
  margin: 0 0 12px;
}
</style>
