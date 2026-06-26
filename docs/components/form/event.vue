<template>
  <s-form ref="TFormDemo" :model="formData" :field-list="fieldList" :column="1" />
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue'
const cc = ref()

const formData = ref({
  account: 'wocwin', // *用户账号
  password: null, // *用户密码
})

const fieldList = [
  {
    label: '账号',
    prop: 'account',
    comp: 's-input',
    attrs: {
      width: '200',
      onBlur: () => {
        console.log(`***** onBlur 25行 docs/examples/SForm/event.vue`)
      },
      onInput: (val) => {
        console.log(`49 val`, val)
      },
      onFocus: () => {
        console.log(`***** onFocus 28行 docs/examples/SForm/event.vue`)
      },
      onClear: () => {
        console.log(`***** clear 35行 docs/examples/SForm/event.vue`)
      },
    },
  },
  {
    label: '性别',
    prop: 'sex',
    comp: 's-select',
    attrs: {
      options: [
        { label: '男人', value: 'man' },
        { label: '女人', value: 'woman' },
        { label: '中性人', value: 'middle' },
      ],
      width: '200',
      onChange: (...arr) => {
        console.log(`1131 46行 docs/examples/SForm/event.vue arr `, arr)
      },
      onChangeSelect: (...arr) => {
        console.log(`1131 46行 docs/examples/SForm/event.vue arr `, arr)
      },
    },
  },
]
</script>
