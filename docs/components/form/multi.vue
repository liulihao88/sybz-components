<script setup lang="ts">
import { ref } from 'vue'
import { validateForm } from '@sybz-components/utils'

// 每个单元一个 s-form，校验跨表单的业务规则（课时名不能和任何单元的课时重名）
const units = ref([{ name: '', lessons: [{ name: '' }] }])
const formRefs = ref<any[]>([])
const errors = ref<string[]>([])

const names = () => units.value.flatMap((unit) => unit.lessons.map((lesson) => lesson.name.trim()))
const rule = (unitIndex: number, lessonIndex: number) => ({
  trigger: 'blur',
  validator: (_: unknown, __: unknown, callback: (error?: Error) => void) => {
    const name = units.value[unitIndex].lessons[lessonIndex].name.trim()
    const dup = name && names().filter((item) => item === name).length > 1
    callback(dup ? new Error('课时名称与其他单元的课时重名') : undefined)
  },
})
const fieldList = (unitIndex: number) => [
  { label: '单元', prop: 'name', required: '请填写单元名称' },
  ...units.value[unitIndex].lessons.map((_, lessonIndex) => ({
    label: `课时 ${lessonIndex + 1}`,
    prop: `lessons.${lessonIndex}.name`,
    required: '请填写课时名称',
    rules: [rule(unitIndex, lessonIndex)],
  })),
]

async function submit() {
  errors.value = []
  const results = await Promise.allSettled(formRefs.value.map((form) => validateForm(form, { showMessage: false })))
  errors.value = results.flatMap((result) => (result.status === 'rejected' ? Object.keys(result.reason) : []))
}
</script>

<template>
  <s-flex direction="column" gap="small" align="flex-start">
    <s-form
      v-for="(unit, unitIndex) in units"
      :key="unit"
      :ref="(el: any) => (formRefs[unitIndex] = el)"
      :model="unit"
      :field-list="fieldList(unitIndex)"
    />
    <s-flex gap="small">
      <s-button @click="units.push({ name: '', lessons: [{ name: '' }] })">添加单元</s-button>
      <s-button type="primary" @click="submit">校验全部表单</s-button>
    </s-flex>
    <s-text v-if="errors.length" color="danger">未通过字段：{{ errors.join('、') }}</s-text>
  </s-flex>
</template>
