<script setup lang="ts">
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'
function tt() {
  console.log('  </s-tooltip>')
}
function isTest13() {
  console.log('isTest13')
}
const plus = () => {
  console.log('plus')
}
</script>

<template>
  <div>
    <s-icon>
      <Plus></Plus>
    </s-icon>

    <s-icon content="添加" class="cp" @click="plus">
      <Plus></Plus>
    </s-icon>
  </div>
</template>

<style scoped lang="scss"></style>
