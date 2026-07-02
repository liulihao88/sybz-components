<script setup lang="ts">
import { ref } from 'vue'
import { $toast } from '@sybz-components/utils'
const inner = () => {
  $toast('inner11')
}
const outer = (event) => {
  $toast(`95 event`, event)
  $toast('outer')
}
const mounted = (e) => {}
</script>

<template>
  <div>
    <sClickOutside @click-outside="outer" @mounted="mounted">
      <el-button class="w-200 h-200 bg-blue" @click="inner">你好啊</el-button>
    </sClickOutside>
  </div>
</template>
