<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const cc = ref(123)
</script>

<template>
  <div>
    <el-input v-model="cc" v-copy="cc"></el-input>
    <div></div>
  </div>
</template>
