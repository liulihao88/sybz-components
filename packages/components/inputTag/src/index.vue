<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import SInput from '@/components/input'
import SIcon from '@/components/icon'
import STag from '@/components/tag'
import { $toast, isEmpty } from '@sybz-components/utils'
import { useStyleProps } from '@/hooks/useStyleProps'

defineOptions({
  name: 'SInputTag',
})

type InputTagValue = string | number | Record<string, any>

interface InputTagProps {
  /** 标签数组，支持字符串或对象数组 */
  modelValue?: InputTagValue[]
  /** 分隔符正则：输入或粘贴时按它切分成多个标签；传 false 关闭自动分割 */
  splitRegExp?: RegExp | string | false
  /** 单个标签的校验正则，校验失败时提示 message */
  regexp?: RegExp
  /** 校验失败提示文案 */
  message?: string
  /** 是否允许重复标签 */
  allowDuplicate?: boolean
  /** 最多允许的标签数量，0 表示不限制 */
  maxCount?: number
  /** 是否按对象数组处理，新增标签时写入 { name }；对象项 isDelete 为 0 时不可删除 */
  isComplex?: boolean
  /** 透传给内部 s-input 的属性 */
  inputAttrs?: Record<string, any>
  /** 透传给每个标签 s-tag 的属性，如 type / effect / size / round / theme */
  tagAttrs?: Record<string, any>
  /** 输入框占位文案 */
  placeholder?: string
  /** 是否只显示一行：默认 true，超出时左右滚动；设为 false 时自动换行、高度随标签数量变化 */
  singleLine?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 是否显示一键清空按钮 */
  clearable?: boolean
}

// 默认按中英文逗号、顿号、中英文分号和空白切分；小数点不在此列，345.456 会保持完整
const DEFAULT_SPLIT_REGEXP = /(?:,|，|、|;|；|\s)+/

const props = withDefaults(defineProps<InputTagProps>(), {
  modelValue: () => [],
  // 显式声明 undefined：类型里含 Boolean 时，缺省值会被 Vue 转成 false，导致默认分割失效
  splitRegExp: undefined,
  regexp: undefined,
  message: '输入有误',
  allowDuplicate: false,
  maxCount: 0,
  isComplex: false,
  inputAttrs: () => ({}),
  tagAttrs: () => ({}),
  placeholder: '输入后回车',
  singleLine: true,
  disabled: false,
  clearable: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: InputTagValue[]]
  change: [value: InputTagValue[]]
  add: [value: InputTagValue]
  remove: [value: InputTagValue, index: number]
  clear: []
}>()

const { style } = useStyleProps()
const containerRef = ref<HTMLElement>()
const tagListRef = ref<HTMLElement>()
const inputValue = ref('')
const tags = ref<InputTagValue[]>([])
const focused = ref(false)
const hoveredTagIndex = ref<number | null>(null)
const closeBadgeStyle = ref<Record<string, string>>({})
const closeBadgeHovered = ref(false)
const canHover = ref(true)
let closeHideTimer: ReturnType<typeof setTimeout> | undefined
let hoverMedia: MediaQueryList | undefined

const isDisabled = computed(() => props.disabled)
const showClear = computed(() => props.clearable && !isDisabled.value && tags.value.length > 0)

const isObjectItem = (item: unknown): item is Record<string, any> => typeof item === 'object' && item !== null

const getLabel = (item: unknown): string => {
  if (isObjectItem(item)) {
    return isEmpty(item.name) ? '' : String(item.name)
  }
  return isEmpty(item) ? '' : String(item)
}

const isLocked = (item: InputTagValue) => isObjectItem(item) && item.isDelete === 0

const canRemove = (item: InputTagValue) => !isDisabled.value && !isLocked(item)

// tagAttrs.closable 设为 false 时隐藏所有关闭按钮；锁定项和禁用态始终不可删除
const isClosable = (item: InputTagValue) => canRemove(item) && props.tagAttrs.closable !== false

const normalizeModel = (value: unknown): InputTagValue[] => {
  if (!Array.isArray(value)) return []
  return value.filter((item) => getLabel(item) !== '')
}

watch(
  () => props.modelValue,
  (value) => {
    tags.value = normalizeModel(value)
  },
  { immediate: true, deep: true },
)

// 单行模式：新增标签后自动滚动到最右侧，保证新标签可见
const scrollTagsToEnd = () => {
  if (!props.singleLine) return
  const list = tagListRef.value
  if (list) list.scrollLeft = list.scrollWidth
}

watch(
  () => tags.value.length,
  (length, previous) => {
    if (previous !== undefined && length > previous) nextTick(scrollTagsToEnd)
  },
)

// 从换行切回单行时，滚到最右侧，保持新标签可见
watch(
  () => props.singleLine,
  (singleLine) => {
    if (singleLine) nextTick(scrollTagsToEnd)
  },
)

// splitRegExp 支持正则、正则字符串、false 和未设置；非法字符串按「不分割」处理，避免抛错
const splitPattern = computed<RegExp | null>(() => {
  const pattern = props.splitRegExp === undefined ? DEFAULT_SPLIT_REGEXP : props.splitRegExp
  if (!pattern) return null
  if (pattern instanceof RegExp) return pattern
  try {
    return new RegExp(pattern)
  } catch {
    return null
  }
})

const splitText = (text: string): string[] => {
  const pattern = splitPattern.value
  const parts = pattern ? text.split(pattern) : [text]
  return parts.map((part) => part.trim()).filter(Boolean)
}

const hasSeparator = (text: string) => Boolean(splitPattern.value && text.split(splitPattern.value).length > 1)

// 带 g 标志的正则 test 会记住 lastIndex，这里每次重置，保证连续校验结果一致
const isValidToken = (token: string) => {
  const regexp = props.regexp
  if (!regexp) return true
  regexp.lastIndex = 0
  const valid = regexp.test(token)
  regexp.lastIndex = 0
  return valid
}

const commitTokens = (tokens: string[], clearInput = true) => {
  if (!tokens.length) return

  if (tokens.some((token) => !isValidToken(token))) {
    $toast(props.message || '输入有误', 'e')
    return
  }

  const next = [...tags.value]
  const exists = new Set(next.map((item) => getLabel(item)))
  const added: InputTagValue[] = []
  let duplicated = false
  let overflow = false

  for (const token of tokens) {
    if (!props.allowDuplicate && exists.has(token)) {
      duplicated = true
      continue
    }

    if (props.maxCount > 0 && next.length >= props.maxCount) {
      overflow = true
      break
    }

    const item: InputTagValue = props.isComplex ? { name: token } : token
    next.push(item)
    added.push(item)
    if (!props.allowDuplicate) exists.add(token)
  }

  if (overflow) $toast(`最多添加 ${props.maxCount} 个标签`, 'w')
  if (duplicated) $toast('重复项不允许添加', 'w')
  // 重复项或超出数量限制时只提示、不清空输入，避免把用户刚输入的内容自动删掉
  if (!added.length) return

  if (clearInput) inputValue.value = ''
  tags.value = next
  emit('update:modelValue', next)
  emit('change', next)
  added.forEach((item) => emit('add', item))
}

const commit = (text?: string) => {
  const raw = (text ?? inputValue.value ?? '').trim()
  if (!raw) {
    inputValue.value = ''
    return
  }
  commitTokens(splitText(raw))
}

const handleEnter = (event: KeyboardEvent) => {
  // 中文输入法确认候选词时也会触发回车，此时不提交
  if (event.isComposing) return
  commit()
}

const handleBlur = () => {
  commit()
}

// 输入框为空时按退格删除最后一个标签，符合标签输入的常见习惯
const handleBackspace = (event: KeyboardEvent) => {
  if (event.isComposing || inputValue.value || !tags.value.length) return
  event.preventDefault()
  removeItem(tags.value.length - 1)
}

const handlePaste = (event: ClipboardEvent) => {
  if (isDisabled.value) return
  const text = event.clipboardData?.getData('text') ?? ''
  if (!hasSeparator(text)) return
  event.preventDefault()
  // 粘贴的标签直接入库，输入框里尚未提交的内容保持不动
  commitTokens(splitText(text), false)
}

const removeItem = (index: number) => {
  const item = tags.value[index]
  if (!canRemove(item)) return

  const next = [...tags.value]
  next.splice(index, 1)
  tags.value = next
  emit('update:modelValue', next)
  emit('change', next)
  emit('remove', item, index)
}

const clearAll = () => {
  if (isDisabled.value || !tags.value.length) return
  tags.value = []
  emit('update:modelValue', [])
  emit('change', [])
  emit('clear')
}

const focus = () => {
  if (isDisabled.value) return
  containerRef.value?.querySelector<HTMLInputElement>('input')?.focus()
}

const handleFocusOut = (event: FocusEvent) => {
  const next = event.relatedTarget as Node | null
  if (next && containerRef.value?.contains(next)) return
  focused.value = false
}

const handleContainerClick = () => {
  // 延迟到浏览器处理完选区后再判断：拖选文字时保留选区，普通点击才聚焦输入框
  window.setTimeout(() => {
    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) return
    focus()
  }, 0)
}

const handleRootMouseDown = (event: MouseEvent) => {
  const target = event.target as HTMLElement | null
  // 只阻止关闭、清空按钮抢走输入框焦点，避免触发 blur 提交；其它区域保留复制能力
  if (target?.closest('.s-input-tag__close-badge, .el-tag__close, .s-input-tag__clear')) event.preventDefault()
}

const CLOSE_BADGE_SIZE = 16

const clearCloseHideTimer = () => {
  if (closeHideTimer !== undefined) {
    clearTimeout(closeHideTimer)
    closeHideTimer = undefined
  }
}

const hideHoverClose = () => {
  clearCloseHideTimer()
  closeBadgeHovered.value = false
  hoveredTagIndex.value = null
}

// 禁用时输入框会被移除，同步清掉聚焦态和关闭浮层
watch(isDisabled, (disabled) => {
  if (!disabled) return
  focused.value = false
  hideHoverClose()
})

const showHoverClose = computed(() => {
  const index = hoveredTagIndex.value
  if (!canHover.value || index === null) return false
  const item = tags.value[index]
  return Boolean(item) && isClosable(item)
})

// 关闭按钮浮层跟随标签右上角，限制在控件内部，避免被列表裁剪
const updateCloseBadgePosition = () => {
  const index = hoveredTagIndex.value
  const root = containerRef.value
  if (index === null || !root) return
  const item = root.querySelectorAll<HTMLElement>('.s-input-tag__item')[index]
  if (!item) return
  const tagRect = item.getBoundingClientRect()
  const rootRect = root.getBoundingClientRect()
  const offsetX = rootRect.left + root.clientLeft
  const offsetY = rootRect.top + root.clientTop
  const half = CLOSE_BADGE_SIZE / 2
  const left = Math.min(Math.max(tagRect.right - offsetX - half, 0), Math.max(root.clientWidth - CLOSE_BADGE_SIZE, 0))
  const top = Math.max(tagRect.top - offsetY - half, 0)
  closeBadgeStyle.value = { left: `${left}px`, top: `${top}px` }
}

// 单行滚动时，鼠标移入标签只滚动标签列表，保证标签完整可见
const revealTagInList = (item: HTMLElement) => {
  if (!props.singleLine) return
  const list = tagListRef.value
  if (!list) return
  const itemRect = item.getBoundingClientRect()
  const listRect = list.getBoundingClientRect()
  if (itemRect.left < listRect.left) {
    list.scrollLeft -= listRect.left - itemRect.left
  } else if (itemRect.right > listRect.right) {
    list.scrollLeft += itemRect.right - listRect.right
  }
}

const handleTagMouseEnter = (event: MouseEvent, index: number) => {
  clearCloseHideTimer()
  closeBadgeHovered.value = false
  if (!canHover.value || !isClosable(tags.value[index])) {
    hoveredTagIndex.value = null
    return
  }
  hoveredTagIndex.value = index
  const item = event.currentTarget as HTMLElement
  nextTick(() => {
    revealTagInList(item)
    updateCloseBadgePosition()
  })
}

const scheduleCloseHide = () => {
  clearCloseHideTimer()
  closeHideTimer = setTimeout(() => {
    if (closeBadgeHovered.value) return
    hideHoverClose()
  }, 120)
}

const handleTagMouseLeave = () => {
  if (!canHover.value) return
  scheduleCloseHide()
}

const handleCloseBadgeEnter = () => {
  clearCloseHideTimer()
  closeBadgeHovered.value = true
}

const handleCloseBadgeLeave = () => {
  closeBadgeHovered.value = false
  scheduleCloseHide()
}

const handleCloseBadgeClick = () => {
  const index = hoveredTagIndex.value
  if (index === null) return
  removeItem(index)
  hideHoverClose()
}

const handleHoverMediaChange = (event: MediaQueryListEvent) => {
  canHover.value = event.matches
  hideHoverClose()
}

const handleViewportResize = () => hideHoverClose()

onMounted(() => {
  hoverMedia = window.matchMedia('(hover: hover)')
  canHover.value = hoverMedia.matches
  if (hoverMedia.addEventListener) {
    hoverMedia.addEventListener('change', handleHoverMediaChange)
  } else {
    hoverMedia.addListener(handleHoverMediaChange)
  }
  window.addEventListener('resize', handleViewportResize)
})

onBeforeUnmount(() => {
  clearCloseHideTimer()
  window.removeEventListener('resize', handleViewportResize)
  if (hoverMedia?.removeEventListener) {
    hoverMedia.removeEventListener('change', handleHoverMediaChange)
  } else {
    hoverMedia?.removeListener?.(handleHoverMediaChange)
  }
})

watch(() => tags.value, hideHoverClose)

const $getValue = () => tags.value

defineExpose({
  $getValue,
  clearAll,
  focus,
})
</script>

<template>
  <div
    ref="containerRef"
    class="s-input-tag"
    :class="{ 'is-focus': focused, 'is-disabled': isDisabled, 'has-clear': showClear }"
    :style="style"
    @click="handleContainerClick"
    @mousedown.capture="handleRootMouseDown"
    @focusin="focused = true"
    @focusout="handleFocusOut"
  >
    <div class="s-input-tag__content" :class="{ 'has-tags': tags.length > 0, 'is-wrap': !singleLine }">
      <!-- 单行模式用滚动容器包裹标签；换行模式让标签直接参与 content 的 flex 布局。两处标签结构需保持一致 -->
      <div v-if="singleLine" ref="tagListRef" class="s-input-tag__list" @scroll="updateCloseBadgePosition">
        <s-tag
          v-for="(item, index) in tags"
          :key="index"
          v-bind="tagAttrs"
          class="s-input-tag__item"
          :class="{ 'is-locked': isLocked(item) }"
          :closable="!canHover && isClosable(item)"
          @mouseenter="handleTagMouseEnter($event, index)"
          @mouseleave="handleTagMouseLeave"
          @close="removeItem(index)"
        >
          <slot name="tag" :item="item" :index="index" :label="getLabel(item)">{{ getLabel(item) }}</slot>
        </s-tag>
      </div>

      <template v-else>
        <s-tag
          v-for="(item, index) in tags"
          :key="index"
          v-bind="tagAttrs"
          class="s-input-tag__item"
          :class="{ 'is-locked': isLocked(item) }"
          :closable="!canHover && isClosable(item)"
          @mouseenter="handleTagMouseEnter($event, index)"
          @mouseleave="handleTagMouseLeave"
          @close="removeItem(index)"
        >
          <slot name="tag" :item="item" :index="index" :label="getLabel(item)">{{ getLabel(item) }}</slot>
        </s-tag>
      </template>

      <s-input
        v-if="!isDisabled"
        v-model="inputValue"
        class="s-input-tag__input"
        v-bind="inputAttrs"
        :placeholder="placeholder"
        :dis-placeholder="placeholder"
        :clearable="false"
        @keydown.enter.prevent="handleEnter"
        @keydown.backspace="handleBackspace"
        @blur="handleBlur"
        @paste="handlePaste"
      />
    </div>

    <span
      v-if="showHoverClose"
      class="s-input-tag__close-badge"
      :style="closeBadgeStyle"
      role="button"
      aria-label="删除标签"
      @mouseenter="handleCloseBadgeEnter"
      @mouseleave="handleCloseBadgeLeave"
      @mousedown.prevent
      @click.stop="handleCloseBadgeClick"
    >
      <s-icon icon="close" size="10px" />
    </span>

    <s-icon
      v-if="showClear"
      class="s-input-tag__clear"
      icon="circle-close"
      size="14px"
      @mousedown.prevent
      @click.stop="clearAll"
    />
  </div>
</template>

<style scoped lang="scss">
.s-input-tag {
  --s-input-tag-height: 32px;

  position: relative;
  display: block;
  box-sizing: border-box;
  width: 100%;
  min-height: var(--s-input-tag-height);
  padding: 3px 8px;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base, 4px);
  background-color: var(--el-fill-color-blank);
  color: var(--el-text-color-regular);
  font-size: 12px;
  line-height: 1;
  cursor: text;
  transition: border-color 0.2s;

  &:hover:not(.is-disabled) {
    border-color: var(--el-border-color-hover);
  }

  &.is-focus:not(.is-disabled) {
    // 只保留 1px 边框，避免和 inset 阴影叠加成 2px 粗边框
    border-color: var(--el-color-primary);
  }

  &.is-disabled {
    border-color: var(--el-disabled-border-color);
    background-color: var(--el-disabled-bg-color);
    cursor: not-allowed;
  }

  &.has-clear {
    padding-right: 26px;
  }
}

.s-input-tag__content {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  min-height: 24px;

  // singleLine 为 false：标签自动换行，高度随标签数量变化
  &.is-wrap {
    flex-wrap: wrap;
  }

  &:not(.has-tags) {
    gap: 0;
  }
}

// 标签固定一行，超出时左右滚动；输入框始终保留在右侧
.s-input-tag__list {
  display: flex;
  flex: 0 1 auto;
  align-items: center;
  gap: 4px;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.s-input-tag__item {
  max-width: 100%;
  user-select: text;

  &.is-locked {
    cursor: not-allowed;
    opacity: 0.6;
  }
}

.is-disabled .s-input-tag__item {
  opacity: 0.6;
}

// 标签关闭按钮：浮层定位在标签右上角，不占布局，避免换行边缘 hover 时上下抖动
.s-input-tag__close-badge {
  position: absolute;
  z-index: 3;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  border: 1px solid var(--el-border-color);
  border-radius: 50%;
  background-color: var(--el-bg-color);
  color: var(--el-text-color-secondary);
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%);
  cursor: pointer;
  transition:
    color 0.15s,
    border-color 0.15s;

  &:hover {
    color: var(--el-color-danger);
    border-color: var(--el-color-danger);
  }
}

// 内层输入框只保留输入能力，边框、背景和间距都由外层容器承担
.s-input-tag .s-input-tag__input {
  flex: 1 1 auto;
  width: auto;
  min-width: 80px;

  :deep(.el-input__wrapper),
  :deep(.el-input__wrapper:hover),
  :deep(.el-input__wrapper.is-focus) {
    min-height: 24px;
    padding: 0 2px;
    background-color: transparent;
    box-shadow: none;
  }

  :deep(.el-input__inner) {
    height: 22px;
    // 覆盖 s-input 为原生清空图标预留的 22px，否则占位文案会偏左
    margin-right: 0 !important;
    color: inherit;
    font-size: 12px;
  }

  :deep(.el-input__suffix) {
    margin-left: 0;
  }

  :deep(.el-input__inner::placeholder) {
    color: var(--el-text-color-placeholder);
  }
}

// 一键清空：相对整个控件垂直居中，只在鼠标移入时显示
.s-input-tag__clear {
  position: absolute;
  top: 50%;
  right: 8px;
  width: 14px;
  height: 14px;
  color: var(--el-text-color-placeholder);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-50%);
  transition:
    opacity 0.15s,
    color 0.2s;

  &:hover {
    color: var(--el-color-danger);
  }
}

.s-input-tag:hover .s-input-tag__clear {
  opacity: 1;
  pointer-events: auto;
}

// 触屏设备没有 hover，清空按钮常显；单个标签仍使用 el-tag 自带的关闭按钮
@media (hover: none) {
  .s-input-tag__clear {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
