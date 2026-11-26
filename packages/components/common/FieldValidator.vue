<template>
  <div class="s-field-validator" aria-hidden="true">
    <ElForm :model="validatorModel">
      <ElFormItem ref="itemRef" prop="value" :rules="rules" :show-message="false" />
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'
import type { FormItemInstance } from 'element-plus'
import type { SFormRule, SFieldValidateResult } from '../../types/component-props'

defineOptions({
  name: 'SFieldValidator',
})

const props = withDefaults(
  defineProps<{
    modelValue?: unknown
    rules?: SFormRule[]
  }>(),
  {
    modelValue: undefined,
    rules: () => [],
  },
)

const itemRef = ref<FormItemInstance>()
const validatorModel = computed(() => ({ value: props.modelValue }))

const validate = (trigger: string): Promise<SFieldValidateResult> =>
  new Promise((resolve) => {
    const item = itemRef.value

    if (!item || !props.rules.length) {
      resolve({ valid: true, message: '' })
      return
    }

    item.validate(trigger, (isValid, invalidFields) => {
      resolve({
        valid: isValid,
        message: isValid ? '' : (invalidFields?.value?.[0]?.message ?? ''),
      })
    })
  })

defineExpose({ validate })
</script>

<style scoped lang="scss">
.s-field-validator {
  display: none;
}
</style>
