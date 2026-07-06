<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
</script>

<template>
  <div>
    <div>docs/components/test/base.vue</div>

    <s-button>你好啊</s-button>
  </div>
</template>
