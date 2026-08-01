<script setup lang="ts">
import { computed, ref, unref, watch } from 'vue'
import RenderComp from './renderComp.vue'
import { validateForm, isEmpty, $toast } from '@sybz-components/utils'
import SIcon from '@/components/icon/src/index.vue'
import STooltip from '@/components/tooltip/src/index.vue'
import STitle from '@/components/title/src/index.vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import {
  callEventHandler,
  cloneDefaultValue,
  getFormGap,
  getFormItemBasis,
  getValueByPath,
  hasValueByPath,
  setValueByPath,
  toVueEventProp,
} from './utils'
import type { FormInstance } from 'element-plus'
import type {
  SFormContext,
  SFormFieldItem,
  SFormProps,
  SFormRule,
  SFormTitleItem,
  SybzRecord,
} from '@/types/component-props'

type FormModel = SybzRecord
type FormField = SFormFieldItem | SFormTitleItem
type FormFieldList = SFormProps['fieldList']
type FormDynamic<T> = T | ((context: SFormContext) => T)
type FormAttrs = SybzRecord

const internalFieldKeys = new Set([
  'attrs',
  'bind',
  'componentProps',
  'column',
  'comp',
  'default',
  'defaultValue',
  'directives',
  'events',
  'formAttrs',
  'formItemAttrs',
  'formatValue',
  'imgAttrs',
  'isShow',
  'label',
  'labelRender',
  'labelSlotName',
  'modelEvent',
  'modelProp',
  'normalize',
  'onChange',
  'onUpdate',
  'placeholder',
  'prop',
  'render',
  'required',
  'rules',
  'slotName',
  'subTitle',
  'title',
  'titleSlotName',
  'trim',
  'transform',
  'type',
  'useSlot',
  'value',
  'valueProp',
])

defineOptions({
  name: 'SForm',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<SFormProps>(), {
  theme: 'default',
  showFooter: import.meta.env.DEV ? true : false,
  column: 1,
  align: 'top',
  autoSetDefaultValue: true,
  gap: '16px',
  trim: true,
})
const mergedProps = useGlobalComponentConfig('form', props)

const sFormRef = ref<FormInstance>()
const formModel = computed<FormModel>(() => (unref(mergedProps.value.model as FormModel) || {}) as FormModel)
const formItems = computed<FormField[]>(() => {
  const fieldList = mergedProps.value.fieldList as FormFieldList
  return Array.isArray(fieldList) ? fieldList : Object.values(fieldList || {})
})
const shouldShowFooter = computed(() => mergedProps.value.footer ?? mergedProps.value.showFooter)
const formGap = computed(() => getFormGap(mergedProps.value.gap))
const hasMultipleColumns = computed(
  () => Number(mergedProps.value.column) > 1 || formItems.value.some((item) => Number(item.column) > 1),
)
const useGap = computed(() => Boolean(formGap.value) && hasMultipleColumns.value)
const formStyle = computed(() => (useGap.value ? { '--s-form-gap': formGap.value } : undefined))
const formClass = computed(() => ({
  's-form--gap': useGap.value,
  's-form--chenghua': mergedProps.value.theme === 'chenghua',
  's-form--shijingshan': mergedProps.value.theme === 'shijingshan',
}))
const formAlign = computed(() => mergedProps.value.align)

const getFieldProp = (item: FormField) => item.prop || (typeof item.value === 'string' ? item.value : undefined)

const getFieldValue = (item: FormField) => {
  const prop = getFieldProp(item)
  return prop ? getValueByPath(formModel.value, prop) : undefined
}

const setFieldValue = (item: FormField, value: unknown) => {
  const prop = getFieldProp(item)

  if (!prop) {
    return
  }

  setValueByPath(formModel.value, prop, value)
}

const getValue = (prop: string) => getValueByPath(formModel.value, prop)

const setValue = (prop: string, value: unknown) => {
  setValueByPath(formModel.value, prop, value)
}

const getRenderProps = (item: FormField, index: number): SFormContext => {
  const prop = getFieldProp(item)

  return {
    option: item,
    model: formModel.value,
    value: getFieldValue(item),
    prop,
    index,
    formRef: sFormRef.value,
    getValue,
    setValue,
    setFieldValue: (value: unknown) => setFieldValue(item, value),
  }
}

const resolveDynamic = <T,>(source: FormDynamic<T> | undefined, item: FormField, index: number, fallback: T): T => {
  if (typeof source === 'function') {
    return (source as (context: SFormContext) => T)(getRenderProps(item, index))
  }

  return source === undefined ? fallback : source
}

const resolveRecord = (source: FormDynamic<FormAttrs> | undefined, item: FormField, index: number) => {
  const result = resolveDynamic<FormAttrs>(source, item, index, {})
  return result || {}
}

const getPlaceholderPrefix = (item: FormField) => {
  const comp = String(item.comp || 's-input').toLowerCase()
  const inputType = String(item.type || '').toLowerCase()

  if (
    comp.includes('select') ||
    comp.includes('date') ||
    comp.includes('time') ||
    comp.includes('cascader') ||
    inputType.includes('select')
  ) {
    return '请选择'
  }

  if (
    comp.includes('input') ||
    comp.includes('textarea') ||
    comp.includes('autocomplete') ||
    inputType.includes('input') ||
    inputType.includes('password')
  ) {
    return '请输入'
  }

  return ''
}

const getPlaceholder = (item: FormField) => {
  if (item.placeholder) {
    return item.placeholder
  }

  const prefix = getPlaceholderPrefix(item)
  return prefix && item.label ? `${prefix}${item.label}` : ''
}

const getRequiredMessage = (item: FormField) => {
  if (typeof item.required === 'string') {
    return item.required
  }

  const prefix = getPlaceholderPrefix(item) || '请输入'
  return item.label ? `${prefix}${item.label}` : prefix
}

const getFormItemAttrs = (item: FormField, index: number) => {
  return {
    ...resolveRecord(item.formAttrs, item, index),
    ...resolveRecord(item.formItemAttrs, item, index),
  }
}

const mergeRules = (item: FormField, index: number) => {
  const formItemAttrs = getFormItemAttrs(item, index)
  const rulesSource = item.rules ?? formItemAttrs.rules
  const resolvedRules = resolveDynamic<SFormRule | SFormRule[] | undefined>(rulesSource, item, index, undefined)
  const rules = (Array.isArray(resolvedRules) ? resolvedRules : resolvedRules ? [resolvedRules] : []).filter(Boolean)

  if (item.required && !rules.some((rule) => rule.required)) {
    rules.unshift({
      required: true,
      message: getRequiredMessage(item),
    })
  }

  if (isEmpty(rules)) {
    return undefined
  }

  return rules.map((rule) => {
    const mergeObj = {
      trigger: ['blur', 'change'],
      ...rule,
    }

    if (!mergeObj.validator && !mergeObj.message) {
      mergeObj.message = getRequiredMessage(item)
    }

    return mergeObj
  })
}

const getChildStyle = (item: FormField) => {
  const column = item.column || mergedProps.value.column

  return {
    flex: `0 1 ${getFormItemBasis(column, useGap.value ? mergedProps.value.gap : undefined)}`,
  }
}

const getFormItemBind = (item: FormField, index: number) => {
  const formItemAttrs = getFormItemAttrs(item, index)

  return {
    ...formItemAttrs,
    prop: getFieldProp(item),
    label: item.label,
    rules: mergeRules(item, index),
    style: [getChildStyle(item), formItemAttrs.style],
  }
}

const parseIsShow = (item: FormField, index: number) => {
  return resolveDynamic<boolean>(item.isShow, item, index, true)
}

const isTitleItem = (item: FormField) => item.type === 'title'

const getTitleSlotName = (item: FormField) => item.titleSlotName || item.slotName || getFieldProp(item)

const getFieldSlotName = (item: FormField) => item.slotName || getFieldProp(item)

const getLabelSlotName = (item: FormField) => item.labelSlotName || `${getFieldProp(item)}-label`

const getTitleAttrs = (item: FormField, index: number): FormAttrs => {
  return {
    title: item.title || item.label || '',
    subTitle: item.subTitle || '',
    theme: mergedProps.value.theme,
    type: 'form',
    ...resolveRecord(item.attrs, item, index),
  }
}

const getDirectFieldAttrs = (item: FormField) => {
  const result: FormAttrs = {}

  Object.keys(item).forEach((key) => {
    if (internalFieldKeys.has(key)) {
      return
    }

    const value = item[key]
    if (value !== undefined) {
      result[key] = value
    }
  })

  if (item.type && item.type !== 'title') {
    result.type = item.type
  }

  return result
}

const getDisplayValue = (item: FormField, index: number) => {
  const value = getFieldValue(item)

  if (typeof item.formatValue === 'function') {
    return item.formatValue(value, getRenderProps(item, index))
  }

  return value
}

const getComponentAttrs = (item: FormField, index: number) => {
  const componentDefaults = mergedProps.value.componentDefaults || {}
  const componentName = typeof item.comp === 'string' ? item.comp.toLowerCase() : item.comp ? '' : 's-input'
  const attrs: FormAttrs = {
    ...(componentName.startsWith('s-') ? { theme: mergedProps.value.theme } : {}),
    clearable: true,
    filterable: true,
    width: '100%',
    placeholder: getPlaceholder(item),
    ...componentDefaults,
    ...getDirectFieldAttrs(item),
    ...resolveRecord(item.componentProps, item, index),
    ...resolveRecord(item.bind, item, index),
    ...resolveRecord(item.attrs, item, index),
  }

  const disabled = resolveDynamic<boolean | undefined>(item.disabled, item, index, undefined)

  if (disabled !== undefined) {
    attrs.disabled = disabled
  }

  const prop = getFieldProp(item)

  if (prop) {
    const modelProp = item.modelProp || item.valueProp || 'modelValue'
    const modelEvent = item.modelEvent || `update:${modelProp}`
    const modelHandlerName = toVueEventProp(modelEvent)
    const originalModelHandler = attrs[modelHandlerName]

    attrs[modelProp] = getDisplayValue(item, index)
    attrs[modelHandlerName] = (...args: unknown[]) => {
      const rawValue = args[0]
      const context = getRenderProps(item, index)
      const nextValue =
        typeof item.normalize === 'function'
          ? item.normalize(rawValue, context)
          : typeof item.transform === 'function'
            ? item.transform(rawValue, context)
            : rawValue

      setFieldValue(item, nextValue)
      callEventHandler(originalModelHandler, args)
    }
  }

  const schemaEvents = {
    ...resolveRecord(item.events, item, index),
  }

  if (item.onChange) {
    schemaEvents.change = item.onChange
  }

  if (item.onUpdate) {
    schemaEvents[item.modelEvent || `update:${item.modelProp || item.valueProp || 'modelValue'}`] = item.onUpdate
  }

  Object.entries(schemaEvents).forEach(([eventName, handler]) => {
    const handlerName = toVueEventProp(eventName)
    const originalHandler = attrs[handlerName]

    attrs[handlerName] = (...args: unknown[]) => {
      callEventHandler(originalHandler, args)

      if (typeof handler === 'function') {
        handler(args[0], getRenderProps(item, index), ...args.slice(1))
      }
    }
  })

  return attrs
}

const getDefaultValue = (item: FormField) => {
  if ('defaultValue' in item) {
    return item.defaultValue
  }

  return item.default
}

const applyDefaultValues = () => {
  if (!mergedProps.value.autoSetDefaultValue) {
    return
  }

  formItems.value.forEach((item) => {
    const prop = getFieldProp(item)
    const defaultValue = getDefaultValue(item)

    if (
      !prop ||
      defaultValue === undefined ||
      (hasValueByPath(formModel.value, prop) && getValueByPath(formModel.value, prop) !== undefined)
    ) {
      return
    }

    setValueByPath(formModel.value, prop, cloneDefaultValue(defaultValue))
  })
}

const shouldTrimField = (item: FormField) => item.trim ?? mergedProps.value.trim

const trimFieldsBeforeValidate = () => {
  formItems.value.forEach((item) => {
    const prop = getFieldProp(item)

    if (!prop || !shouldTrimField(item)) {
      return
    }

    const value = getFieldValue(item)

    if (typeof value === 'string') {
      setFieldValue(item, value.trim())
    }
  })
}

async function validate(isResetFieldsOrParams: boolean | SybzRecord = false, otherParams: SybzRecord = {}) {
  const isResetFields = typeof isResetFieldsOrParams === 'boolean' ? isResetFieldsOrParams : false
  const params = typeof isResetFieldsOrParams === 'boolean' ? otherParams : isResetFieldsOrParams

  trimFieldsBeforeValidate()
  await validateForm(sFormRef.value, params)

  if (isResetFields) {
    resetFields()
  }

  return formModel.value
}

const validateField: FormInstance['validateField'] = (...args) => sFormRef.value?.validateField(...args)

const submit = () => validate()

function resetFields() {
  sFormRef.value?.resetFields()
}

function clearValidate(props?: string | string[]) {
  sFormRef.value?.clearValidate(props)
}

function scrollToField(prop: string) {
  sFormRef.value?.scrollToField(prop)
}

function getModel() {
  return formModel.value
}

function getFields() {
  return formItems.value
}

function getField(prop: string) {
  return formItems.value.find((item) => getFieldProp(item) === prop)
}

function getVisibleFields() {
  return formItems.value.filter((item, index) => parseIsShow(item, index))
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
    message: `<pre style="max-height: 90vh; overflow-y: auto; overflow-x: hidden">${JSON.stringify(formItems.value, null, 2)}</pre>`,
    type: 'success',
    duration: 0,
    showClose: true,
  })
}

watch(
  () => mergedProps.value.model,
  () => applyDefaultValues(),
  {
    immediate: true,
  },
)

watch(
  () => mergedProps.value.fieldList,
  () => applyDefaultValues(),
  {
    deep: true,
    immediate: true,
  },
)

defineExpose({
  clearValidate,
  formRef: sFormRef,
  getField,
  getFields,
  getModel,
  getValue,
  getVisibleFields,
  resetFields,
  scrollToField,
  setValue,
  submit,
  validate,
  validateField,
  sFormRef,
})
</script>

<template>
  <div>
    <el-form
      ref="sFormRef"
      :model="formModel"
      v-bind="{ 'label-width': 'auto', ...$attrs }"
      class="s-form"
      :class="formClass"
      :style="formStyle"
    >
      <template v-for="(v, i) in formItems" :key="getFieldProp(v) || i">
        <div v-if="parseIsShow(v, i) && isTitleItem(v)" class="s-form__title-item">
          <template v-if="v.useSlot && getTitleSlotName(v)">
            <slot :name="getTitleSlotName(v)" v-bind="getRenderProps(v, i)"></slot>
          </template>
          <template v-else-if="v.render">
            <render-comp :render="v.render" :context="getRenderProps(v, i)" />
          </template>
          <template v-else>
            <s-title v-bind="getTitleAttrs(v, i)">
              <template v-if="v.labelRender" #title>
                <render-comp :render="v.labelRender" :context="getRenderProps(v, i)" />
              </template>
            </s-title>
          </template>
        </div>
        <el-form-item v-else-if="parseIsShow(v, i)" v-bind="getFormItemBind(v, i)">
          <template #label>
            <template v-if="v.labelRender">
              <render-comp :render="v.labelRender" :context="getRenderProps(v, i)" />
            </template>
            <template v-else>
              <slot :name="getLabelSlotName(v)" v-bind="getRenderProps(v, i)">
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
          <template v-if="v.useSlot && getFieldSlotName(v)">
            <slot :name="getFieldSlotName(v)" v-bind="getRenderProps(v, i)"></slot>
          </template>
          <template v-else-if="v.render">
            <render-comp :render="v.render" :context="getRenderProps(v, i)" />
          </template>
          <template v-else>
            <component
              :is="v.comp || 's-input'"
              v-directives="v.directives"
              v-bind="getComponentAttrs(v, i)"
            ></component>
          </template>
        </el-form-item>
      </template>
    </el-form>

    <s-flex v-if="shouldShowFooter" justify="center">
      <el-button type="primary" size="small" @click="submit">提交</el-button>
      <el-button type="" size="small" @click="resetFields">重置</el-button>
      <el-button type="danger" size="small" @click="clearValidate()">清除校验</el-button>
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

.s-form--gap {
  column-gap: var(--s-form-gap);
}

.s-form__title-item {
  flex: 0 0 100%;
  width: 100%;
}

.s-form__label-image {
  height: 16px;
}

.s-form__label-icon {
  margin-right: 4px;
}

.s-form--chenghua {
  --s-form-label-color: #000000;
  --s-form-font-family: 'PingFang SC', sans-serif;
}

.s-form--shijingshan {
  --s-form-label-color: #4b5563;
  --s-form-font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.s-form--chenghua,
.s-form--shijingshan {
  font-family: var(--s-form-font-family);

  :deep(.el-form-item__label) {
    color: var(--s-form-label-color);
    font-weight: 500;
  }

  :deep(.el-form-item__error) {
    font-family: var(--s-form-font-family);
  }

  :deep(.el-form-item__label .s-tooltip-box__text) {
    color: inherit;
  }
}
:deep(.el-form-item) {
  align-items: v-bind('formAlign');

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
