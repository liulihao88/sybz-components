<script setup lang="ts">
/**
 * <g-popover @confirm="confirm" trigger="click"></g-popover>
 */

defineOptions({
  name: 'SPopconfirm',
})
import { computed, onBeforeUnmount, ref, useAttrs } from 'vue'
import useGlobalComponentConfig from '@/hooks/useGlobalComponentConfig'
import SButton from '@/components/button/src/index.vue'

const attrs = useAttrs()
const isPopoverVisible = ref(false)
let showTimer: number | undefined

const handleShow = () => {
  window.clearTimeout(showTimer)
  showTimer = window.setTimeout(() => {
    document.removeEventListener('click', closePopoverOnClickOutside)
    document.addEventListener('click', closePopoverOnClickOutside)
  }, 0)
}

const removeClickOutsideListener = () => {
  window.clearTimeout(showTimer)
  document.removeEventListener('click', closePopoverOnClickOutside)
}

const closePopoverOnClickOutside = (event: MouseEvent) => {
  const popover = document.querySelector('.el-popover')

  if (!popover || !popover.contains(event.target as Node)) {
    close()
  }
}
const emits = defineEmits(['confirm', 'cancel'])
function confirm() {
  close()
  emits('confirm')
}
function close() {
  isPopoverVisible.value = false
  removeClickOutsideListener()
}
function cancel() {
  close()
  emits('cancel')
}
interface PopconfirmProps {
  title?: string
  width?: string | number
  content?: string
  reConfirm?: boolean
  dangerouslyUseHtmlString?: boolean
  theme?: '' | 'chenghua'
}

const props = withDefaults(defineProps<PopconfirmProps>(), {
  title: '确定删除吗?',
  width: 200,
  content: '',
  reConfirm: true,
  dangerouslyUseHtmlString: false,
  theme: '',
})

const mergedProps = useGlobalComponentConfig('popconfirm', props)

const normalizeClassValue = (value: unknown) => {
  if (Array.isArray(value)) return value.filter(Boolean).join(' ')

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .filter(([, active]) => active)
      .map(([className]) => className)
      .join(' ')
  }

  return value ? String(value) : ''
}

const popperClass = computed(() => {
  const attrPopperClass = normalizeClassValue(attrs['popper-class'] || attrs.popperClass)

  return [
    's-popconfirm__popper',
    mergedProps.value.theme === 'chenghua' ? 's-popconfirm__popper--chenghua' : '',
    attrPopperClass,
  ]
    .filter(Boolean)
    .join(' ')
})

const popconfirmButtonTheme = computed(() => {
  return mergedProps.value.theme === 'chenghua' ? 'chenghua' : ''
})

const safeContent = computed(() => String(mergedProps.value.content ?? ''))
const ALLOWED_CONTENT_TAGS = new Set([
  'b',
  'strong',
  'i',
  'em',
  'u',
  's',
  'br',
  'span',
  'code',
  'pre',
  'p',
  'ul',
  'ol',
  'li',
])

const sanitizeContentHtml = (content: string) => {
  if (typeof DOMParser === 'undefined' || typeof document === 'undefined') {
    return ''
  }

  const parsedDocument = new DOMParser().parseFromString(content, 'text/html')
  const cleanNode = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.COMMENT_NODE) {
        child.remove()
        return
      }

      if (child.nodeType !== Node.ELEMENT_NODE) {
        return
      }

      const element = child as HTMLElement
      const tagName = element.tagName.toLowerCase()

      if (!ALLOWED_CONTENT_TAGS.has(tagName)) {
        element.replaceWith(document.createTextNode(element.textContent ?? ''))
        return
      }

      Array.from(element.attributes).forEach((attr) => {
        element.removeAttribute(attr.name)
      })
      cleanNode(element)
    })
  }

  cleanNode(parsedDocument.body)
  return parsedDocument.body.innerHTML
}

const sanitizedContent = computed(() => sanitizeContentHtml(safeContent.value))

onBeforeUnmount(() => {
  removeClickOutsideListener()
})

defineExpose({
  close,
})
</script>

<template>
  <el-popover
    v-if="mergedProps.reConfirm"
    v-bind="$attrs"
    v-model:visible="isPopoverVisible"
    class="s-popconfirm__box"
    :title="mergedProps.title"
    :width="mergedProps.width"
    :popper-class="popperClass"
    @show="handleShow"
  >
    <slot name="content">
      <template v-if="mergedProps.content">
        <!-- eslint-disable vue/no-v-html -->
        <div v-if="mergedProps.dangerouslyUseHtmlString" class="s-popconfirm__content" v-html="sanitizedContent"></div>
        <!-- eslint-enable vue/no-v-html -->
        <div v-else class="s-popconfirm__content" v-text="safeContent"></div>
      </template>
    </slot>
    <div class="s-popconfirm__footer">
      <slot name="footer">
        <SButton size="small" type="info" :theme="popconfirmButtonTheme" @click="cancel">取消</SButton>
        <SButton size="small" type="primary" :theme="popconfirmButtonTheme" @click="confirm">确定</SButton>
      </slot>
    </div>
    <template #reference>
      <slot></slot>
    </template>
  </el-popover>
  <span
    v-else
    class="s-popconfirm__simple_box"
    :class="{ 's-popconfirm__simple_box--chenghua': mergedProps.theme === 'chenghua' }"
    @click="confirm"
  >
    <slot></slot>
  </span>
</template>

<style scoped lang="scss">
.s-popconfirm__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  text-align: right;
  margin: 0;
  margin-top: 16px;
}

.s-popconfirm__content {
  color: var(--el-text-color-regular);
  line-height: 1.6;
}

.s-popconfirm__simple_box:has(.el-button) + :deep(.el-button),
.el-button + .s-popconfirm__simple_box :deep(.el-button),
.s-popconfirm__simple_box:has(.el-button) + .s-popconfirm__simple_box:has(.el-button) {
  margin-left: 12px !important;
}

:global(.s-popconfirm__popper .s-popconfirm__content code) {
  display: inline-flex;
  align-items: center;
  min-height: 18px;
  padding: 0 5px;
  margin: 0 2px;
  border-radius: 4px;
  background: var(--el-fill-color-light);
  color: var(--el-color-primary);
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 12px;
  line-height: 18px;
  vertical-align: baseline;
}
</style>
