<script setup lang="ts">
import { ref } from 'vue'
import { $toast } from '@sybz-components/utils'

const formRef = ref()
const formData = ref({ username: '  张三  ', remark: '  保留前后空格  ', code: ' ab  cd ', nickname: '  小明  ' })
const fieldList = [
  { label: '用户名（全局 trim）', prop: 'username' },
  { label: '备注（trim: false）', prop: 'remark', trim: false },
  {
    label: '编码（normalize）',
    prop: 'code',
    normalize: (value: unknown) => (typeof value === 'string' ? value.replace(/\s+/g, '') : value),
  },
  {
    label: '昵称（transform）',
    prop: 'nickname',
    transform: (value: unknown) => (typeof value === 'string' ? value.toUpperCase() : value),
  },
]

const submit = async () => {
  const value = await formRef.value.validate()
  $toast({ type: 'success', message: `提交数据：${JSON.stringify(value)}`, duration: 0, showClose: true })
}
</script>

<template>
  <s-form ref="formRef" :model="formData" :field-list="fieldList" />
  <el-button type="primary" @click="submit">提交并校验</el-button>
</template>
