<template>
  <s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1" :rules="rules">
    <template #account-label>
      <div class="text-[var(--blue)]">account-label</div>
    </template>
    <template #account>
      <s-input v-model="formData.account" placeholder="这是account的slot写法" width="200" />
    </template>
  </s-form>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { validateTrigger } from '@sybz-components/utils'

const formData = ref({
  account: '', // *用户账号
  password: null, // *用户密码
})

const rules = {
  account: [validateTrigger()],
}

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    useSlot: true,
  },
]
</script>
