<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { validate, validateForm } from '../../../../packages/utils/src/index'
import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance | null>(null)
const form = ref({ name: '', number: '', code: '' })

const rules = computed(() => {
  return {
    name: [validate()],
    number: [validate('number')],
    code: [
      { required: true, message: '请输入编号', trigger: 'blur' },
      { max: 6, message: '编号最多输入 6 个字符', trigger: 'blur' },
      {
        validator: (_rule, value, callback) => callback(value === '123456' ? new Error('编号已存在') : undefined),
        trigger: 'blur',
      },
    ],
  }
})
const submit = async () => {
  await validateForm(formRef)
}
const submit2 = async () => {
  await validateForm(formRef, { message: '我是自定义错误消息' })
}
const submit3 = async () => {
  await validateForm(formRef, { showMessage: false })
}
const submit4 = async () => {
  await validateForm(formRef, { detail: true })
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="基础用法" prop="name">
        <s-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="只能输入正整数" prop="number">
        <s-input v-model="form.number" />
      </el-form-item>
      <el-form-item label="编号（最多 6 位，123456 已存在）" prop="code">
        <s-input v-model="form.code" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="primary" @click="submit2">自定义错误消息</el-button>
    <el-button type="primary" @click="submit3">不显示任务错误消息</el-button>
    <el-button type="primary" @click="submit4">错误消息加详情</el-button>
    <el-button type="info" @click="formRef?.clearValidate()">清空校验</el-button>
  </div>
</template>
