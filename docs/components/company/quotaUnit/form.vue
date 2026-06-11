<script setup>
import { ref, getCurrentInstance } from 'vue'

import { $toast, formatBytesConvert } from '@sybz-components/utils'

const { proxy } = getCurrentInstance()
const form = ref({
  quota: '1.0',
  quotaType: 'hard',
})
const QUOTA_OPTIONS = [
  { label: '硬配额', value: 'hard' },
  { label: '软配额', value: 'soft' },
]
const totalQuota = ref(0)
const sFormRef = ref(null)
const fieldList = [
  {
    label: '默认配额大小',
    prop: 'quota',
    useSlot: true,
  },
  {
    label: '存储桶配额类型',
    prop: 'quotaType',
    comp: 's-radio',
    useSlot: true,
    attrs: {
      width: 300,
      clearable: false,
      options: QUOTA_OPTIONS,
    },
  },
]

function quotaRules(rule, value, callback, unit, lower, upper) {
  if (formatBytesConvert(value + unit) < formatBytesConvert(lower)) {
    callback(new Error(`桶配额下限为 ${lower}`))
  } else if (formatBytesConvert(value + unit) > formatBytesConvert(upper)) {
    callback(new Error(`剩余可用容量为 ${upper}`))
  } else {
    callback()
  }
}
const validateQuota = (rule, value, callback) => {
  quotaRules(rule, value, callback, form.value.quotaUnit, '1GB', totalQuota.value)
}
const rules = {
  // quota: [proxy.validate()],
}
</script>

<template>
  <div class="">
    <s-basic-layout class="h-block">
      <template #header>
        <s-title :title="metaTitle" />
      </template>
      <s-form ref="sFormRef" :fieldList="fieldList" :model="form" :rules="rules" class="custom-form-item" align="top">
        <template #quota>
          <SQuotaUnit v-model="form.quota" v-model:unit="form.quotaUnit" :validator="validateQuota" label="" />
          <s-warning :content="`最高可配 <code>${totalQuota}</code>`" class="m-t-16" type="warning" width="700" />
        </template>
        <!-- <el-form-item label="" prop="">
          <div class="m-t-16">
            <s-warning :content="`最高可配 <code>${totalQuota}</code>`" class="" type="warning" width="700" />
          </div>
        </el-form-item> -->
        <template #quotaType>
          <s-radio v-model="form.quotaType" :options="QUOTA_OPTIONS" :clearable="false" />
          <div class="m-t-16">
            <g-dif-warning type="quota" style="width: 700px" />
          </div>
        </template>
      </s-form>
      <template #footer></template>
    </s-basic-layout>
  </div>
</template>

<style lang="scss" scoped>
.custom-form-item :deep(.el-form-item__error) {
  position: absolute;
  top: 32px; /* 输入框高度 + 间距 */
  left: 0;
  width: 100%;
  margin: 4px 0 0;
}
</style>
