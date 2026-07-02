<script setup lang="tsx">
import { ref } from 'vue'
import { validate } from '@sybz-components/utils'
const model = ref({
  account: '', // *用户账号
  hobby: [], // *用户爱好
})
const gFormRef = ref()
const rules = {
  account: [validate()],
}

const fieldList = [
  {
    label: '账号',
    prop: 'account',
  },
  {
    label: '基础信息',
    type: 'title',
  },
  {
    label: '爱好',
    prop: 'hobby',
    comp: 's-select',
    rules: [validate('请选择爱好')],
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
  await gFormRef.value.validate()
}
</script>

<template>
  <div>
    <s-form ref="gFormRef" :model="model" :field-list="fieldList" :rules="rules"></s-form>
    <el-button type="primary" @click="testSubmit">测试提交1</el-button>
  </div>
</template>
