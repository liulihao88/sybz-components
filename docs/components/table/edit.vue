<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
const { proxy } = getCurrentInstance()
import { validate } from '@sybz-components/utils'
const header = [
  {
    label: '名字',
    title: 'name',
  },
  {
    label: '年龄',
    title: '18',
  },
]
const edit = async ({ row, scope }) => {
  if (row.isEdit) {
    await proxy.delay(1000)
    proxy.$toast('保存成功')
    return (form.value.data[scope.$index].isEdit = false)
  }
  form.value.data[scope.$index].isEdit = !form.value.data[scope.$index].isEdit
}
const columns = [
  {
    label: '名字',
    prop: 'name',
    useSlot: true,
  },
  {
    label: '年龄',
    prop: 'age',
    useSlot: true,
  },
  {
    label: '操作',
    prop: 'operation',
    btns: [
      {
        content: ({ row }) => {
          if (row?.isEdit) {
            return '保存'
          } else {
            return '编辑'
          }
        },
        type: 'primary',
        handler: edit,
      },
    ],
  },
]

const formRules = ref({
  name: [proxy.validate()],
  age: [validate(), validate('between', { min: 1, max: 100 })],
})

const form = ref({
  data: [
    {
      name: '名字1',
      age: '12',
      id: 1,
    },
    {
      name: '名字2',
      age: '20',
      id: 2,
    },
  ],
})
const formRef = ref(null)
const submitForm = async () => {
  await proxy.validateForm(formRef, { detail: false })
  proxy.$toast('编辑成功')
}
</script>

<template>
  <div class="table-box">
    <el-form ref="formRef" :model="form" size="small">
      <s-table :columns="columns" :data="form.data">
        <template #name="{ scope, row }">
          <template v-if="row.isEdit">
            <el-form-item :prop="'data.' + scope.$index + '.name'" :rules="formRules.name" class="">
              <s-input v-model="form.data[scope.$index].name" size="small" />
            </el-form-item>
          </template>
          <template v-else>
            {{ row.name }}
          </template>
        </template>

        <template #age="{ scope, row }">
          <el-form-item :prop="'data.' + scope.$index + '.age'" :rules="formRules.age" class="">
            <s-input v-model="form.data[scope.$index].age" size="small" />
          </el-form-item>
        </template>
      </s-table>
    </el-form>

    <el-button type="primary" @click="submitForm()">Submit</el-button>
  </div>
</template>

<style scoped lang="scss">
.table-box {
  :deep(.el-table__body .el-table__cell) {
    height: 54px;
    line-height: 54px;
  }
}
</style>
