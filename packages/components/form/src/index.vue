<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import RenderComp from './renderComp.vue'
import { validForm, isEmpty, $toast } from '@sybz-components/utils'
import SIcon from '@/components/icon/src/index.vue'
import STooltip from '@/components/tooltip/src/index.vue'

type FormModel = Record<string, unknown>
type RenderFunction = (...args: unknown[]) => unknown

interface FormRule {
  [key: string]: unknown
  message?: string
  trigger?: string | string[]
  validator?: unknown
}

interface FormImageAttrs {
  [key: string]: unknown
  name?: string
  src?: string
}

interface FormFieldItem {
  [key: string]: unknown
  attrs?: Record<string, unknown>
  column?: FormSelfProps['column']
  comp?: string
  directives?: Record<string, unknown>
  formItemAttrs?: Record<string, unknown>
  imgAttrs?: FormImageAttrs
  isShow?: boolean | ((item: FormFieldItem) => boolean)
  label?: string
  labelRender?: RenderFunction
  placeholder?: string
  prop?: string
  render?: RenderFunction
  rules?: FormRule[]
  useSlot?: boolean
}

type FormFieldList = FormFieldItem[] | Record<string, FormFieldItem>

interface FormValidateTarget {
  validate: (callback: (valid: boolean, status: Record<string, unknown>) => void) => void
  resetFields: () => void
  clearValidate: () => void
}

defineOptions({
  name: 'SForm',
  inheritAttrs: false,
})

export interface FormSelfProps {
  fieldList: FormFieldList
  model: FormModel
  showFooter?: boolean
  column?: 1 | 2 | 3 | 4 | 5 | 6
  align?: 'center' | 'top' | 'flex-end'
}

const props = withDefaults(defineProps<FormSelfProps>(), {
  showFooter: import.meta.env.DEV ? true : false,
  column: 1,
  align: 'top',
})

const sFieldList = ref<FormFieldList>(props.fieldList)
const formModel = ref<FormModel>(props.model)
const formItems = computed(() => (Array.isArray(sFieldList.value) ? sFieldList.value : Object.values(sFieldList.value)))

// placeholder的显示
const getPlaceholder = (row: FormFieldItem) => {
  if (row.comp && typeof row.comp === 'string') {
    if (row.comp.includes('input')) {
      return row.placeholder ?? '请输入' + row.label
    } else if (row.comp.includes('select') || row.comp.includes('date')) {
      return row.placeholder ?? '请选择' + row.label
    }
  }
  return row.placeholder ?? ''
}

const sFormRef = ref<FormValidateTarget>()
async function validate(isResetFields = false, otherParams: Record<string, unknown> = {}) {
  await validForm(sFormRef.value, otherParams)
  if (isResetFields) {
    resetFields()
  }
}
const submit = () => {
  validate()
}
function resetFields() {
  sFormRef.value?.resetFields()
}

function clearValidate() {
  sFormRef.value?.clearValidate()
}
function mergeRules(rules?: FormRule[]) {
  if (isEmpty(rules)) {
    return ''
  }
  const defaultRulesObj = {
    trigger: ['blur', 'change'],
  }
  const mRules = rules.map((v) => {
    const mergeObj = Object.assign({}, defaultRulesObj, v)
    if (!mergeObj.validator && !mergeObj.message) {
      mergeObj.message = '请输入'
    }
    return mergeObj
  })
  return mRules
}

// label与输入框的布局方式
const getChildWidth = (item: FormFieldItem) => {
  return `flex: 0 1 ${100 / (item.column || props.column)}%;`
}

const parseIsShow = (item: FormFieldItem) => {
  if (item.isShow === undefined) {
    return true
  }
  if (typeof item.isShow === 'function') {
    return item.isShow(item)
  }
  return item.isShow
}

const showFormValue = () => {
  $toast({
    dangerouslyUseHTMLString: true,
    message: `<pre style="max-height: 90vh; overflow-y: auto; overflow-x: hidden">${JSON.stringify(formModel.value, null, 2)}</pre>`,
    type: 'success',
    duration: 0,
    showClose: true,
  })
}
const showFieldListValue = () => {
  $toast({
    dangerouslyUseHTMLString: true,
    message: `<pre style="max-height: 90vh; overflow-y: auto; overflow-x: hidden">${JSON.stringify(sFieldList.value, null, 2)}</pre>`,
    type: 'success',
    duration: 0,
    showClose: true,
  })
}

watch(
  () => props.fieldList,
  (val) => {
    sFieldList.value = val
  },
  {
    deep: true,
    immediate: true,
  },
)

watch(
  () => props.model,
  (val) => {
    formModel.value = val
  },
  {
    deep: true,
    immediate: true,
  },
)

defineExpose({
  validate: validate,
  clearValidate: clearValidate,
  resetFields: resetFields,
})
</script>

<template>
  <div>
    <el-form ref="sFormRef" :model="formModel" v-bind="{ 'label-width': 'auto', ...$attrs }" class="s-form">
      <template v-for="(v, i) in formItems" :key="i">
        <el-form-item
          v-if="parseIsShow(v)"
          :prop="v.prop"
          :label="v.label"
          v-bind="v.formItemAttrs"
          :style="getChildWidth(v)"
          :rules="mergeRules(v.rules)"
        >
          <template #label>
            <template v-if="v.labelRender">
              <render-comp :render="v.labelRender" :item="v" />
            </template>
            <template v-else>
              <slot :name="v.prop + '-label'" :item="v">
                <img v-if="v.imgAttrs?.src" :src="v.imgAttrs?.src" class="s-form__label-image" v-bind="v.imgAttrs" />
                <s-icon
                  v-else-if="v.imgAttrs?.name"
                  :name="v.imgAttrs?.name"
                  class="s-form__label-icon"
                  v-bind="v.imgAttrs"
                />
                <s-tooltip :content="v.label" />
              </slot>
            </template>
          </template>
          <template v-if="v.useSlot">
            <slot :name="v.prop"></slot>
          </template>
          <template v-else-if="v.render">
            <render-comp :render="v.render" :item="v" />
          </template>
          <template v-else>
            <component
              :is="v.comp || 's-input'"
              v-model="formModel[v.prop!]"
              v-directives="v.directives"
              :placeholder="getPlaceholder(v)"
              :rules="v.rules"
              v-bind="{ clearable: true, filterable: true, width: '100%', ...v.attrs }"
            ></component>
          </template>
        </el-form-item>
      </template>
    </el-form>
    <s-flex v-if="showFooter" justify="center">
      <el-button type="primary" size="small" @click="submit">提交</el-button>
      <el-button type="" size="small" @click="resetFields">重置</el-button>
      <el-button type="danger" size="small" @click="clearValidate">清除校验</el-button>
      <el-button type="danger" size="small" @click="showFormValue">查看form的值</el-button>
      <el-button type="danger" size="small" @click="showFieldListValue">查看fieldList的值</el-button>
    </s-flex>
  </div>
</template>

<style lang="scss" scoped>
.s-form {
  display: flex;
  flex-wrap: wrap;
}

.s-form__label-image {
  height: 16px;
}

.s-form__label-icon {
  margin-right: 4px;
}
:deep(.el-form-item) {
  align-items: v-bind('props.align');

  .el-form-item__content {
    display: flex;
    align-items: stretch;

    .el-input,
    .el-select,
    .el-date-editor,
    .el-input-number,
    .el-textarea,
    .s-input,
    .s-select,
    .s-date-picker {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
