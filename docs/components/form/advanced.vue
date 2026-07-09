<template>
  <s-form ref="formRef" :model="formData" :field-list="fieldList" :column="2" label-width="96">
    <template #remarkInput="{ value, setFieldValue }">
      <s-input
        :model-value="value"
        type="textarea"
        placeholder="这里通过 slotName 自定义输入区域"
        @update:model-value="setFieldValue"
      />
    </template>
  </s-form>
  <s-flex gap="12" class="m-t-12">
    <s-button type="primary" @click="submit">提交</s-button>
    <s-button @click="reset">重置</s-button>
  </s-flex>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const formRef = ref()
const formData = ref({
  user: {
    name: '',
  },
  accountType: 'personal',
  contacts: [
    {
      phone: '',
    },
  ],
  company: {
    name: '',
  },
  remark: '',
})

const fieldList = computed(() => [
  {
    label: '用户名',
    prop: 'user.name',
    required: true,
    attrs: {
      maxlength: 20,
      showWordLimit: true,
    },
  },
  {
    label: '账号类型',
    prop: 'accountType',
    comp: 's-radio',
    defaultValue: 'personal',
    attrs: {
      options: [
        { label: '个人', value: 'personal' },
        { label: '企业', value: 'company' },
      ],
    },
  },
  {
    label: '公司名称',
    prop: 'company.name',
    isShow: ({ model }) => model.accountType === 'company',
    rules: ({ model }) =>
      model.accountType === 'company'
        ? [
            {
              required: true,
              message: '请填写公司名称',
            },
          ]
        : [],
  },
  {
    label: '手机号',
    prop: 'contacts.0.phone',
    bind: {
      maxlength: 11,
    },
    normalize: (value) => String(value || '').replace(/\D/g, ''),
  },
  {
    label: '备注',
    prop: 'remark',
    useSlot: true,
    slotName: 'remarkInput',
    column: 1,
  },
])

const submit = async () => {
  await formRef.value.validate()
}

const reset = () => {
  formRef.value.resetFields()
  formRef.value.clearValidate()
}
</script>
