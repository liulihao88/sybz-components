<script setup lang="tsx">
import { ref, getCurrentInstance, reactive } from 'vue'
const { proxy } = getCurrentInstance()
const cusRules = {
  hobby: [proxy.validate('请选择111')],
}
function onChange(...rest) {
  console.log(`rest`, rest)
  console.log('onChange')
}
function onChangeSelect(...rest2) {
  console.log(`rest2`, rest2)
  console.log('onChangeSelect')
}
function onClear(...aaa) {
  console.log(`aaa`, aaa)
  console.log('onClear')
}

const model = ref({
  account: '', // *用户账号
  pwd: null, // *用户密码
  sex: 'sex2',
  lock: '',
  name: '',
  age: null,
  duration: 5,
  timeValue: [],
  markdownValue: '### 你好',
  's-json-desc': {
    age: 109,
  },
})
const rules = {
  account: [proxy.validate()],
  pwd: [proxy.validate()],
  name: [proxy.validate()],
  age: [proxy.validate()],
}
const fieldList = [
  {
    label: '账号',
    prop: 'account',
    placeholder: '我是特殊的placeholder',
    labelRender: () => {
      return <div style="color: blue">好了好了好了好了好了好了</div>
    },
  },
  {
    label: '密码1',
    prop: 'pwd',
    comp: 's-input',
    imgAttrs: {
      src: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
      style: {
        marginRight: '8px',
      },
    },
    attrs: {
      style: {
        width: '200px',
      },
      type: 'password',
      showPassword: true,
      clearable: false,
    },
  },

  {
    prop: 'name',
    useSlot: true,
  },
  {
    label: '选择爱好',
    prop: 'hobby',
    comp: 's-select',
    imgAttrs: {
      name: 'delete',
    },
    formAttrs: {
      rules: cusRules.hobby,
    },
    attrs: {
      label: 'name',
      multiple: true,
      onChange: onChange,
      onChangeSelect: onChangeSelect,
      onClear: onClear,
      value: 'id',
      options: [
        { name: '唱', id: 1 },
        { name: '跳', id: 2 },
        { name: 'rap', id: 3 },
      ],
    },
  },
  {
    label: '性别单选',
    subLabel: '这是单选的性别',
    prop: 'sex',

    comp: 's-radio',
    attrs: {
      variant: 'button',
      options: [
        { label: '小月月', value: 'sex1' },
        { label: '小鑫鑫', value: 'sex2' },
      ],
    },
  },
  {
    label: '是否开启开关',
    prop: 'lock',
    tooltip: '显示开关',
    comp: 's-switch',
  },
  {
    label: '年龄',
    prop: 'age',
    subLabel: '请写入实际年龄',
    comp: 's-input-number',
    tooltip: '显示实际年龄',
    copy: true,
    slots: { suffix: '岁' },
  },
  {
    label: '预计用时',
    prop: 'duration',
    render: ({ value, setFieldValue }) => (
      <s-input-number
        modelValue={value}
        onUpdate:modelValue={setFieldValue}
        min={5}
        max={120}
        step={10}
        precision={0}
        valueOnClear={5}
        v-slots={{ suffix: () => '分数' }}
      />
    ),
  },
  {
    label: '描述',
    value: 'desc',
    comp: 's-input',
    column: 1,
    attrs: {
      type: 'textarea',
    },
  },
  {
    label: '开始和结束日期',
    comp: 's-date-picker',
    value: 'timeValue',
    attrs: {
      type: 'daterange',
    },
  },
  {
    label: 's-json描述',
    value: 's-json-desc',
    comp: 's-json',
    column: 1,
    attrs: {
      lineNumbers: false,
      editable: false,
      // showStatus: false,
      width: '100%',
    },
  },
  {
    label: 's-markdown描述',
    value: 'markdownValue',
    comp: 's-markdown',
    column: 1,
    width: '100%',
    attrs: {
      editable: true,
      height: 200,
      disabled: false,
    },
  },
]

const gFormRef = ref()
async function isTest16() {
  await gFormRef.value.validate({ detail: false })
  console.log(`***** 222  97行 test/t1.vue  15:52:04`)
  proxy.log(`model`, model, '98行 test/t1.vue')
}
</script>

<template>
  <s-form ref="gFormRef" :model="model" :field-list="fieldList" :rules="rules" :column="2" size="large">
    <template #name-label>自定义label(使用useSlot)</template>
    <template #name>
      <s-input v-model="model.name" placeholder="我是name" width="300" />
    </template>
  </s-form>
  <el-button type="primary" @click="isTest16">测试36</el-button>
</template>

<style scoped lang="scss"></style>
