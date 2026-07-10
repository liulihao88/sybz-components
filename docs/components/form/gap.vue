<script setup lang="ts">
import { computed, ref } from 'vue'

const gapNumber = ref(16)
const gap = computed(() => `${gapNumber.value}px`)

const formData = ref({
  name: '',
  phone: '',
  address: '',
  remark: '',
})

const fieldList = [
  {
    label: '姓名',
    prop: 'name',
  },
  {
    label: '手机号',
    prop: 'phone',
  },
  {
    label: '地址',
    prop: 'address',
  },
  {
    label: '备注',
    prop: 'remark',
  },
]
</script>

<template>
  <div class="form-gap-demo">
    <el-slider v-model="gapNumber" :min="0" :max="40" show-input />
    <s-form :model="formData" :field-list="fieldList" :column="2" :gap="gap" />
  </div>
</template>

<style scoped>
.form-gap-demo {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
