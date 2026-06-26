<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { $toast } from '@sybz-components/utils'

const timeValue = ref(1000)
const handleClick = () => {
  $toast('handleClick')
}
</script>

<template>
  <div>
    <s-switch v-model="timeValue" active-text="防抖" inactive-text="防抖" :active-value="1000" :inactive-value="0" />
    <s-button :time="timeValue" icon="plus" @click="handleClick">1秒防抖</s-button>
    <s-button :loading="false" :time="timeValue" @click="handleClick">一秒防抖, 但不显示loading</s-button>
  </div>
</template>
