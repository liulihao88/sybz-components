import { computed, nextTick, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import { $toast } from '@sybz-components/utils'
import { useFormItem } from 'element-plus'
import type { SFieldErrorMode, SFieldValidateResult, SFormRule } from '../types/component-props'

export interface UseFieldValidateOptions {
  /** 校验规则，写法同 s-form / el-form-item 的 rules */
  rules: () => SFormRule | SFormRule[] | undefined
  /** 错误显示方式，默认 inline */
  errorMode?: () => SFieldErrorMode | undefined
  /** 字段标题，required 规则没写 message 时用于生成默认提示 */
  label?: () => string | undefined
  /** 默认提示前缀，如 请输入 / 请选择 */
  messagePrefix?: string
  /** 执行 el-form-item 校验，trigger 传 '' 表示校验全部规则 */
  runValidate: (trigger: string) => Promise<SFieldValidateResult>
}

export interface UseFieldValidateReturn {
  /** 是否独立使用：在 s-form 内为 false，由 el-form-item 接管校验 */
  standalone: boolean
  /** 是否展示必填星号：规则中存在 required: true 时展示 */
  isRequired: ComputedRef<boolean>
  /** 是否处于错误态（用于红色边框） */
  isError: ComputedRef<boolean>
  /** 是否展示底部错误文案：inline 模式下才展示 */
  showErrorMessage: ComputedRef<boolean>
  errorMessage: Ref<string>
  /** 挂到组件根节点的必填、错误类名 */
  fieldClass: ComputedRef<Record<string, boolean>>
  /** 补全默认 trigger 和 message 后的规则 */
  normalizedRules: ComputedRef<SFormRule[]>
  /** 手动触发校验；在 s-form 内会转交给 el-form-item；showMessage=false 时静默不弹 toast */
  validate: (options?: { showMessage?: boolean }) => Promise<boolean>
  clearValidate: () => void
  handleBlur: () => void
  handleChange: () => void
}

/**
 * 为独立使用的表单控件提供与 s-form 一致的 rules 校验。
 *
 * - rules 写法与 s-form / el-form-item 完全相同，trigger 默认 ['blur', 'change']。
 * - trigger 传 [] 表示失焦、变更都不校验，只在手动 validate() 时校验。
 * - errorMode = 'inline'：底部错误文案 + 红色边框，按规则 trigger 自动校验。
 * - errorMode = 'toast'：顶部 $toast + 红色边框，只在手动 validate() 时提示。
 * - 在 s-form（el-form-item）内不显示星号和错误文案，校验交给 el-form-item。
 */
export default function useFieldValidate(options: UseFieldValidateOptions): UseFieldValidateReturn {
  const { formItem } = useFormItem()
  const standalone = !formItem
  const errorMessage = ref('')

  const defaultMessage = computed(() => {
    const prefix = options.messagePrefix || '请输入'
    const label = options.label?.()

    return label ? `${prefix}${label}` : prefix
  })

  const normalizedRules = computed<SFormRule[]>(() => {
    const source = options.rules?.()
    const rules = Array.isArray(source) ? source : source ? [source] : []

    return rules.filter(Boolean).map((rule) => {
      const nextRule: SFormRule = {
        trigger: ['blur', 'change'],
        ...rule,
      }

      // 与 s-form 的 mergeRules 一致：没有自定义校验和提示时补默认提示。
      if (!nextRule.validator && !nextRule.message) {
        nextRule.message = defaultMessage.value
      }

      return nextRule
    })
  })

  const errorMode = computed<SFieldErrorMode>(() => (options.errorMode?.() === 'toast' ? 'toast' : 'inline'))
  const isRequired = computed(() => standalone && normalizedRules.value.some((rule) => Boolean(rule.required)))
  const isError = computed(() => standalone && !!errorMessage.value)
  const showErrorMessage = computed(() => isError.value && errorMode.value === 'inline')

  const matchesTrigger = (trigger: 'blur' | 'change') =>
    normalizedRules.value.some((rule) => {
      if (!rule.trigger) return true
      return Array.isArray(rule.trigger) ? rule.trigger.includes(trigger) : rule.trigger === trigger
    })

  let validateId = 0

  const applyResult = (id: number, result: SFieldValidateResult) => {
    if (id !== validateId) return

    errorMessage.value = result.valid ? '' : result.message || defaultMessage.value
  }

  const runValidate = async (trigger: string) => {
    const id = ++validateId
    const result = await options.runValidate(trigger)
    applyResult(id, result)
    return result
  }

  const validate = async (validateOptions: { showMessage?: boolean } = {}) => {
    if (formItem?.prop) {
      try {
        const valid = await formItem.validate('')
        return valid !== false
      } catch {
        return false
      }
    }

    if (!normalizedRules.value.length) {
      errorMessage.value = ''
      return true
    }

    const result = await runValidate('')

    if (!result.valid && errorMode.value === 'toast' && validateOptions.showMessage !== false) {
      $toast.error(result.message || defaultMessage.value)
    }

    return result.valid
  }

  const clearValidate = () => {
    // 让仍在执行的异步校验结果失效。
    validateId += 1
    errorMessage.value = ''
    formItem?.clearValidate()
  }

  const handleBlur = () => {
    if (!standalone || errorMode.value === 'toast' || !matchesTrigger('blur')) return
    void runValidate('blur')
  }

  const handleChange = () => {
    if (!standalone || errorMode.value === 'toast' || !matchesTrigger('change')) return
    // 先占位校验序号，避免 nextTick 之后才执行的自动校验覆盖期间的手动 validate()。
    const id = ++validateId
    // v-model 的父级更新在下一个 tick 才写回 props，等模型同步后再校验。
    void nextTick()
      .then(() => options.runValidate('change'))
      .then((result) => applyResult(id, result))
  }

  const fieldClass = computed(() => ({
    'is-required': isRequired.value,
    'is-error': isError.value,
  }))

  return {
    standalone,
    isRequired,
    isError,
    showErrorMessage,
    errorMessage,
    fieldClass,
    normalizedRules,
    validate,
    clearValidate,
    handleBlur,
    handleChange,
  }
}
