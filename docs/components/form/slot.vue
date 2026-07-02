<template>
  <s-form ref="TFormDemo" :model="formData" :field-list="fieldList" :column="1" :rules="rules">
    <template #account-label>
      <div class="cl-blue">account-label</div>
    </template>
    <template #account>
      <s-input v-model="formData.account" placeholder="这是account的slot写法" width="200" />
    </template>
  </s-form>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { validate } from '@sybz-components/utils'

const formData = ref({
  account: '', // *用户账号
  password: null, // *用户密码
})

const rules = {
  account: [validate()],
}

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    useSlot: true,
  },
]
</script>
