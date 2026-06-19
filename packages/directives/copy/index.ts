import { useEventListener } from '@vueuse/core'
import { copy as copyText, $toast } from '@sybz-components/utils'
import type { Directive, DirectiveBinding } from 'vue'

type CopyValue =
  | string
  | {
      value: string
      hideToast?: boolean
    }

export interface CopyEl extends HTMLElement {
  copyValue: string
  copyHideToast: boolean
}

function getCopyOptions(binding: DirectiveBinding<CopyValue>) {
  const bindingValue = binding.value
  const isObjectValue = typeof bindingValue === 'object' && bindingValue !== null
  const copyValue = isObjectValue ? bindingValue.value : bindingValue

  return {
    value: copyValue,
    hideToast: Boolean(binding.modifiers.hideToast || (isObjectValue && bindingValue.hideToast)),
  }
}

function setCopyOptions(el: CopyEl, binding: DirectiveBinding<CopyValue>) {
  const { value, hideToast } = getCopyOptions(binding)

  el.copyValue = value
  el.copyHideToast = hideToast
}

/** 文本复制指令（默认双击复制） */
const copy: Directive = {
  mounted(el: CopyEl, binding: DirectiveBinding<CopyValue>) {
    const { value } = getCopyOptions(binding)
    if (value) {
      setCopyOptions(el, binding)
      const arg = binding.arg ?? 'dblclick'
      // Register using addEventListener on mounted, and removeEventListener automatically on unmounted
      useEventListener(el, arg, () => {
        const success: boolean = copyText(el.copyValue, { hideToast: true })
        if (el.copyHideToast) {
          return
        }

        success
          ? $toast(`<span class="cl-blue">${el.copyValue}</span> 复制成功`, {
              dangerouslyUseHTMLString: true,
            })
          : $toast.error(`<span class="cl-blue">${el.copyValue}</span> 复制失败`, {
              dangerouslyUseHTMLString: true,
            })
      })
    } else {
      throw new Error('[Directive: copy]: need value! Like v-copy="modelValue"')
    }
  },
  updated(el: CopyEl, binding: DirectiveBinding<CopyValue>) {
    setCopyOptions(el, binding)
  },
}

export default copy
