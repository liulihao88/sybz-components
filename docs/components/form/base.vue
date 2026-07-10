<script setup lang="tsx">
import { ref } from 'vue'
import { validate } from '@sybz-components/utils'
const model = ref({
  account: '',
  hobby: [],
})
const formRef = ref()
const rules = {
  account: [validate()],
}

const fieldList = [
  {
    label: '账号',
    prop: 'account',
  },
  {
    type: 'title',
    title: '111',
  },
  {
    label: '爱好',
    prop: 'hobby',
    comp: 's-select',
    rules: [validate('change')],
    attrs: {
      multiple: true,
      options: [
        { label: '吉他', value: '0' },
        { label: '看书', value: '1' },
      ],
    },
  },
]

async function testSubmit() {
  await formRef.value.validate()
}
</script>

<template>
  <div>
    <s-form ref="formRef" :model="model" :field-list="fieldList" :rules="rules"></s-form>
    <el-button type="primary" @click="testSubmit">测试提交1</el-button>
  </div>
</template>
