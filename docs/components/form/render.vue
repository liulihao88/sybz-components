<template>
  <s-form :model="formData" :field-list="fieldList" :column="1"></s-form>
</template>

<script setup lang="tsx">
import { reactive, type VNodeChild } from 'vue'
import { validate } from '@sybz-components/utils'

type FormModel = {
  account: string
  date: string[]
}

type FormRenderContext = {
  model: FormModel
  value?: FormModel[keyof FormModel]
}

type FormFieldItem = {
  label?: string
  prop: keyof FormModel
  rules?: unknown[]
  comp?: string
  labelRender?: (context: FormRenderContext) => VNodeChild
  render?: (context: FormRenderContext) => VNodeChild
}

const formData = reactive<FormModel>({
  account: '1234', // *用户账号
  date: [],
})

const updateAccount = (value: string) => {
  formData.account = value
}

const fieldList: FormFieldItem[] = [
  {
    label: '账号',
    prop: 'account',
    rules: [validate()],
    labelRender: () => {
      return <div style={{ color: 'blue' }}>labelRender渲染label</div>
    },
    render: ({ model }) => {
      return (
        <s-flex>
          <el-input
            placeholder="请输入render"
            modelValue={model.account}
            onUpdate:modelValue={(val) => {
              updateAccount(val)
            }}
          />
          <s-warning content="render渲染value" class="m-l-8" size="small"></s-warning>
        </s-flex>
      )
    },
  },

  {
    label: '日期',
    prop: 'date',
    rules: [validate()],
    comp: 's-date-picker',
    labelRender: () => {
      return (
        <s-flex align="center" gap="small">
          日期组件
          <el-tooltip content="自定义label" placement="right">
            <s-icon name="warning"></s-icon>
          </el-tooltip>
        </s-flex>
      )
    },
  },
]
</script>
