<template>
  <s-form ref="TFormDemo" :model="formData" :fieldList="fieldList" :column="1"></s-form>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { validate } from '@sybz-components/utils'

const formData = ref({
  account: '123', // *用户账号
  date: [],
})

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    rules: [validate()],
    labelRender: () => {
      return <div class="cl-red">labelRender渲染label</div>
    },
    render: (item) => {
      return (
        <s-flex>
          <el-input
            placeholder="请输入render"
            modelValue={formData.value.account}
            onUpdate:modelValue={(val) => {
              formData.value.account = val
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
    comp: 's-date-range',
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
