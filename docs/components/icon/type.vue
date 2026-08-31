<template>
  <div class="icon-types">
    <div v-for="variant in variants" :key="variant" class="icon-types__row">
      <span>{{ variant }}</span>
      <s-icon v-for="type in types" :key="type" name="warning" :type="type" :variant="variant" size="20" />
    </div>
  </div>
</template>

<script setup lang="ts">
const types = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
const variants = ['plain', 'light', 'solid'] as const
</script>

<style scoped>
.icon-types {
  display: grid;
  gap: 12px;
}

.icon-types__row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-types__row > span {
  width: 44px;
  color: var(--el-text-color-secondary);
}
</style>
