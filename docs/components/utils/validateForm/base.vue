<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { validate, validateForm } from '../../../../packages/utils/src/index'
const formRef = ref<any>(null)
const form = ref({ name: '', number: '', code: '' })

const rules = computed(() => {
  return {
    name: [validate()],
    number: [validate('number')],
  }
})
const submit = async () => {
  await validateForm(formRef)
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
    </el-form>

    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>
