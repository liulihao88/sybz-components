<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(false)
</script>

<template>
  <div>
    <div>docs/components/test/base.vue</div>

    <s-button>你好啊</s-button>
    <s-dialog v-model="cc"></s-dialog>
    <s-empty></s-empty>
    <s-row></s-row>
  </div>
</template>
