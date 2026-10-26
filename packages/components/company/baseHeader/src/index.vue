<script setup lang="ts">
import { useStyleProps } from '@/hooks/useStyleProps'
defineOptions({
  name: 'SBaseHeader',
})

const { style } = useStyleProps()
</script>

<template>
  <div class="base-header-box" :style="style">
    <div class="base-header-box__left">
      <slot />
    </div>
    <div class="base-header-box__right">
      <slot name="extra" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-header-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  overflow: auto;
  width: 100%;

  .base-header-box__left {
    display: flex;
    flex-wrap: nowrap;
    margin-right: 16px;
    overflow-x: auto;
  }

  .base-header-box__right {
    display: flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
  }
}
</style>
