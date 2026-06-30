<script setup lang="ts">
import { ref, computed } from 'vue'
import { validate, validateTrigger, validateForm, $toast } from '@/utils/src/index'
const sameform = ref({})
const formRef = ref(null)

const rules = computed(() => {
  return {
    oldPassword: [validate('length', { min: 1, max: 40 })],
    newPwd: [validate('length', { min: 1, max: 40 }), validate('same', { value: sameform.value.confirmNewPwd })],
    confirmNewPwd: [validate('length', { min: 1, max: 40 }), validate('same', { value: sameform.value.newPwd })],
  }
})

const confirm = async () => {
  await validateForm(formRef)
  $toast('校验')
}

const passwordType = computed(() => {
  return 'password'
})
</script>

<template>
  <div>
    <el-form ref="formRef" :model="sameform" :rules="rules" label-width="auto">
      <el-form-item label="旧密码" prop="oldPassword">
        <s-input v-model="sameform.oldPassword" :type="passwordType" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPwd">
        <s-input v-model="sameform.newPwd" :type="passwordType" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmNewPwd">
        <s-input v-model="sameform.confirmNewPwd" :type="passwordType" />
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="confirm">提交</el-button>
    <el-button type="info" @click="formRef.clearValidate()">清空校验</el-button>

    <s-warning type="icon" content="密码规则: 1-40位字符组合、特殊字符可选" />
  </div>
</template>
