<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
const details = {
  name: 'S3网关服务',
  status: 'S3READDELETE111',
  port: '9003',
  serveCount: 3,
}
</script>

<template>
  <div>
    <div>docs/examples/Company/SOutService/base.vue</div>
    <SOutService :details="details" class="h-300 w-300"></SOutService>
    <br />
    <SOutService :details="details" type="horizontal" class="w-100%"></SOutService>
  </div>
</template>
