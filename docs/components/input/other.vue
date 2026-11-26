<template>
  <s-flex gap="small" direction="column">
    <div>debounce（可选 false / true（500ms）/ 300 / 600；默认 0）：</div>
    <s-radio v-model="debounce" :options="[false, true, 300, 600]" />
    <s-input
      v-model="keyword"
      width="320"
      placeholder="输入后观察即时值和防抖事件"
      :debounce="debounce"
      @debounced-input="changeInput"
    />
    <div>v-model（即时）：{{ keyword }}</div>
    <div>debounced-input（用于请求）：{{ requestedKeyword }}</div>
    <s-input
      v-model="input"
      title="密码框"
      style="width: 240px"
      type="password"
      placeholder="Please input password"
      show-password
    />
    <s-input v-model="input" width="240" height="48" title="height: 48" placeholder="height: 48" />
    <div>rules（写法同 s-form，required: true 显示星号；trigger 默认 ['blur', 'change']）：</div>
    <s-flex gap="small">
      <s-input
        ref="requiredInputRef"
        v-model="requiredInput"
        :rules="requiredRules"
        width="240"
        placeholder="请输入名称"
      />
      <s-button size="small" @click="validateRequiredInput">校验</s-button>
    </s-flex>
    <div>error-mode（inline 默认 / toast），rules 的 trigger: [] 表示只在点击校验时提示：</div>
    <s-flex gap="small">
      <s-input
        ref="toastInputRef"
        v-model="toastInput"
        :rules="manualRules"
        error-mode="toast"
        width="240"
        placeholder="toast 模式"
      />
      <s-button size="small" @click="validateToastInput">校验</s-button>
    </s-flex>
  </s-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
const keyword = ref('')
const requestedKeyword = ref('')
const debounce = ref<boolean | number>(0)
const requiredInput = ref('')
const requiredInputRef = ref()
const toastInput = ref('')
const toastInputRef = ref()
const requiredRules = [{ required: true, message: '请输入名称', trigger: ['blur', 'change'] }]
const manualRules = [{ required: true, message: '请输入名称', trigger: [] }]

const changeInput = (value: string) => {
  console.log('changeInput', value)
}

const validateRequiredInput = () => {
  requiredInputRef.value?.validate()
}

const validateToastInput = () => {
  toastInputRef.value?.validate()
}
</script>
