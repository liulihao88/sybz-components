<script setup lang="ts">
import { ref } from 'vue'

const chenghuaForm = ref({ keyword: '', status: '' })
const sybzForm = ref({ keyword: '', status: '' })
const fields = [
  { prop: 'keyword', label: '关键词' },
  {
    prop: 'status',
    label: '状态',
    comp: 's-select',
    attrs: {
      options: [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
  },
]
</script>

<template>
  <div class="table-search-themes">
    <section>
      <h4>chenghua</h4>
      <s-table-search v-model="chenghuaForm" theme="chenghua" :options="fields" :column="2" />
    </section>
    <section>
      <h4>sybz</h4>
      <s-table-search v-model="sybzForm" theme="sybz" :options="fields" :column="2" />
    </section>
  </div>
</template>

<style scoped>
.table-search-themes {
  display: grid;
  gap: 24px;
}

.table-search-themes h4 {
  margin: 0 0 12px;
}
</style>
