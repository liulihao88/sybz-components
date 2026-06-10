<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
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
    <sClickOutside @clickOutside="outer" @mounted="mounted">
      <el-button @click="inner" class="w-[200px] h-[200px] bg-[var(--blue)]">你好啊</el-button>
    </sClickOutside>
  </div>
</template>
