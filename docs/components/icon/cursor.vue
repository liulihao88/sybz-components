<template>
  <div class="icon-cursors">
    <div v-for="item in cursors" :key="item.cursor" class="icon-cursors__item">
      <s-icon name="tabler:hand-click" :cursor="item.cursor" size="24" type="primary" variant="light" />
      <span>{{ item.cursor }}</span>
    </div>
    <div class="icon-cursors__item">
      <s-icon name="tabler:hand-stop" cursor="pointer" size="24" type="info" variant="light" disabled />
      <span>disabled</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SIconCursor } from 'sybz-components'

const cursors: Array<{ cursor: SIconCursor }> = [
  { cursor: 'pointer' },
  { cursor: 'default' },
  { cursor: 'help' },
  { cursor: 'move' },
  { cursor: 'grab' },
  { cursor: 'zoom-in' },
]
</script>

<style scoped>
.icon-cursors {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.icon-cursors__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-regular);
  font-size: 13px;
}
</style>
