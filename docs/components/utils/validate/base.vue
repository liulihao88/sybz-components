<script setup lang="ts">
import { reactive, ref } from 'vue'
import { validate, validateForm } from '@/utils/src/index'

const formRef = ref()
const form = reactive({
  name: '',
  category: '',
})

const rules = {
  name: [validate()],
  category: [validate('change')],
}

const categoryOptions = [
  { label: '组件库', value: 'component' },
  { label: '工具库', value: 'utils' },
]

const submit = async () => {
  // 1. 原生写法
  // formRef.value?.validate((valid) => {
  //   if (valid) {
  //     $toast('校验通过')
  //   }
  // })
  // 2. utils提供的validateForm方法, 返回一个promise, 校验通过则resolve, 不通过则reject
  await validateForm(formRef.value)
}
</script>

<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" style="max-width: 360px">
    <el-form-item label="姓名" prop="name">
      <s-input v-model="form.name" placeholder="请输入姓名" />
    </el-form-item>
    <el-form-item label="分类" prop="category">
      <s-select v-model="form.category" :options="categoryOptions" placeholder="请选择分类" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="formRef?.resetFields()">重置</el-button>
    </el-form-item>
  </el-form>
</template>
