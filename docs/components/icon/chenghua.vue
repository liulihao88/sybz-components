<template>
  <div class="theme-icons">
    <div v-for="variant in variants" :key="variant" class="theme-icons__row">
      <span>{{ variant }}</span>
      <s-icon
        v-for="type in types"
        :key="type"
        name="warning"
        theme="chenghua"
        :type="type"
        :variant="variant"
        size="20"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const types = ['default', 'primary', 'success', 'warning', 'danger', 'info'] as const
const variants = ['plain', 'light', 'solid'] as const
</script>

<style scoped>
.theme-icons {
  display: grid;
  gap: 12px;
}

.theme-icons__row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.theme-icons__row > span {
  width: 44px;
  color: var(--s-ch-text-muted);
}
</style>
