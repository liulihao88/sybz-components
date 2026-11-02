<script setup lang="ts">
import { ref } from 'vue'

const download = ref(false)
</script>

<template>
  <div>
    <label>download（可选值：true / false；默认值：true）</label>
    <div style="margin-top: 12px">
      <s-image src="/sybz-components/img/hero.jpg" preview :download="download" width="240" height="150" fit="cover" />
    </div>
  </div>
</template>
