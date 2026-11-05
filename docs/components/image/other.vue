<script setup lang="ts">
import { ref } from 'vue'

const downloadFileName = ref('题目插图.jpg')
</script>

<template>
  <div>
    <label>downloadFileName（文件名字符串；默认值：''，从图片地址推断）</label>
    <input v-model="downloadFileName" placeholder="输入下载文件名" />
    <div style="margin-top: 12px">
      <s-image
        src="/sybz-components/img/hero.jpg"
        preview
        :download="download"
        :download-file-name="downloadFileName"
        width="240"
        height="150"
        fit="cover"
      />
    </div>
  </div>
</template>
