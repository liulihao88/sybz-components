<script setup lang="ts">
import { ref } from 'vue'

const multiple = ref(false)
const loading = ref(false)
const singleValue = ref('北京')
const multipleValue = ref<string[]>(['北京', '上海'])
const requiredValue = ref('')
const requiredSelectRef = ref()
const options = ['北京', '上海', '广州']
const requiredRules = [{ required: true, message: '请选择城市', trigger: ['blur', 'change'] }]

const validateRequiredSelect = () => {
  requiredSelectRef.value?.validate()
}
</script>

<template>
  <s-flex direction="column" gap="12">
    <s-radio
      v-model="multiple"
      :options="[
        { label: 'false（默认）', value: false },
        { label: 'true', value: true },
      ]"
    />
    <s-radio v-model="loading" title="loading（true / false，默认 false）" type="boolean" />
    <s-select
      v-if="multiple"
      v-model="multipleValue"
      simple
      multiple
      :loading="loading"
      :options="options"
      title="simple=true（默认 false），multiple=true（默认 false）"
    />
    <s-select
      v-else
      v-model="singleValue"
      simple
      :loading="loading"
      :options="options"
      title="simple=true（默认 false），multiple=false（默认 false）"
    />
    <s-flex gap="small">
      <s-select
        ref="requiredSelectRef"
        v-model="requiredValue"
        simple
        :rules="requiredRules"
        :options="options"
        title="城市"
      />
      <s-button size="small" @click="validateRequiredSelect">校验</s-button>
    </s-flex>
  </s-flex>
</template>
