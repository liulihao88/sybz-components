<template>
  <div class="icon-radiuses">
    <div v-for="item in radiuses" :key="String(item.value)" class="icon-radiuses__item">
      <s-icon name="tabler:trash" type="danger" variant="solid" size="24" :border-radius="item.value" />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const radiuses = [
  { label: '默认 8px', value: '' },
  { label: '12px', value: 12 },
  { label: '16px', value: '16px' },
  { label: '圆形 50%', value: '50%' },
]
</script>

<style scoped>
.icon-radiuses {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.icon-radiuses__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-regular);
  font-size: 13px;
}
</style>
