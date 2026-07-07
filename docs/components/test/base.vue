<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const cc = ref(false)
</script>

<template>
  <div>
    <s-button>你好啊</s-button>
    <s-dialog v-model="cc"></s-dialog>
    <s-empty></s-empty>
    <s-row></s-row>
    <s-form></s-form>
    <s-table></s-table>
    <s-item></s-item>
    <s-flex></s-flex>
  </div>
</template>
