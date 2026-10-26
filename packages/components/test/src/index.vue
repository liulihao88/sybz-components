<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { useStyleProps } from '@/hooks/useStyleProps'
const { proxy } = getCurrentInstance()
const { style } = useStyleProps()
</script>

<template>
  <div :style="style">
    <div>packages/components/test/src/index.vue</div>
  </div>
</template>
