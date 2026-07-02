<script setup lang="ts">
import { ref, computed } from 'vue'
// import { validateOnSubmit, validate, validateForm } from '@sybz-components/utils'
import { validateOnSubmit, validate, validateForm } from '@/utils/src/index'
const formRef = ref(null)
const form = ref({})

const rules = computed(() => {
  return {
    number: [validateOnSubmit('length', { min: 1, max: 2 })],
    number2: [validate('length', { min: 1, max: 2 })],
  }
})
const submit = async () => {
  await validateForm(formRef)
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto">
      <el-form-item label="长度1-2, 只有提交的时候才校验" prop="number">
        <s-input v-model="form.number" />
      </el-form-item>
      <el-form-item label="长度1-2, change和blur都校验, 使用validate默认触发" prop="number2">
        <s-input v-model="form.number2" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="submit">提交</el-button>
    <el-button type="info" @click="formRef.clearValidate()">清空校验</el-button>
  </div>
</template>
