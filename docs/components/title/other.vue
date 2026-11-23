<script setup lang="ts">
import { ref } from 'vue'

const titleContent = ref('<s-text type="danger">你好</s-text>')
const appendContent = ref('<s-tag type="danger">你好</s-tag>')
const subTitleContent = ref('版本 <s-text c="blue">v1.0</s-text>')
const dangerouslyUseHTMLString = ref(true)

const titleOptions = [
  '<s-text type="danger">你好</s-text>',
  '<s-text type="primary" c="blue" fs="20">重点</s-text>',
  '<s-text c="blue">高亮</s-text>',
]
const appendOptions = ['<s-tag type="danger">你好</s-tag>', '<s-tag type="success" size="small" >已发布</s-tag>']
const subTitleOptions = ['版本 <s-text c="blue">v1.0</s-text>', '状态 <s-tag type="warning">待审核</s-tag>']
</script>

<template>
  <s-radio v-model="titleContent" :options="titleOptions" type="simple" title="title" />
  <s-radio v-model="appendContent" :options="appendOptions" type="simple" title="append" />
  <s-radio v-model="subTitleContent" :options="subTitleOptions" type="simple" title="sub-title" />
  <s-radio
    v-model="dangerouslyUseHTMLString"
    type="boolean"
    title="dangerouslyUseHTMLString（true / false，默认 true）"
  />
  <s-title
    :title="titleContent"
    :append="appendContent"
    :sub-title="subTitleContent"
    :dangerouslyUseHTMLString="dangerouslyUseHTMLString"
  />
</template>
