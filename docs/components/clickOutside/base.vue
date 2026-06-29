<script setup lang="ts">
import { ref } from 'vue'
import { $toast } from '@sybz-components/utils'
const inner = () => {
  console.log(`1192 6行 docs/examples/SClickOutside/base.vue 111 `, 111)
  $toast('inner11')
}
const outer = (event) => {
  console.log(`03 event`, event)
  $toast(`95 event`, event)
  $toast('outer')
}
const mounted = (e) => {
  console.log('mounted', e)
}
</script>

<template>
  <div>
    <sClickOutside @click-outside="outer" @mounted="mounted">
      <el-button class="w-200 h-200 bg-blue" @click="inner">你好啊</el-button>
    </sClickOutside>
  </div>
</template>
