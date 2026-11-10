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
  </s-flex>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref('')
const keyword = ref('')
const requestedKeyword = ref('')
const debounce = ref<boolean | number>(0)

const changeInput = (value: string) => {
  console.log('changeInput', value)
}
</script>
