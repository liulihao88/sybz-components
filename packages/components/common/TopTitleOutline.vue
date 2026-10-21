<template>
  <fieldset
    class="s-top-title-outline"
    :class="{ 'is-square-left': squareLeft, 'is-square-right': squareRight }"
    aria-hidden="true"
  >
    <legend class="s-top-title-outline__text" v-text="title" />
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  squareLeft?: boolean
  squareRight?: boolean
}>()
</script>

<style lang="scss" scoped>
.s-top-title-outline {
  position: absolute;
  z-index: 1;
  inset: -8px 0 0;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% + 8px);
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 1px solid var(--s-top-title-border-color, var(--el-border-color));
  border-radius: var(--s-top-title-radius, var(--el-border-radius-base));
  pointer-events: none;

  &.is-square-left {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.is-square-right {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}

.s-top-title-outline__text {
  max-width: calc(100% - 32px);
  overflow: hidden;
  margin-left: 16px;
  padding: 0 8px;
  color: var(--s-top-title-text-color, var(--el-text-color-secondary));
  font-size: 12px;
  line-height: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
