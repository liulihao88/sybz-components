<template>
  <Transition name="s-backtop-fade">
    <div
      v-if="visible"
      ref="backtopRef"
      class="s-backtop"
      :class="{ 's-backtop--dragging': dragging }"
      :style="[style, { right: `${dragPosition?.right ?? right}px`, bottom: `${dragPosition?.bottom ?? bottom}px` }]"
      role="button"
      tabindex="0"
      aria-label="回到顶部"
      @click="handleClick"
      @pointerdown="handlePointerDown"
      @pointermove="handlePointerMove"
      @pointerup="handlePointerUp"
      @pointercancel="handlePointerCancel"
      @keydown.enter.prevent="handleKeyboard"
      @keydown.space.prevent="handleKeyboard"
    >
      <slot>
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 4.5h14M12 19V8m0 0-5 5m5-5 5 5" />
        </svg>
      </slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useStyleProps } from '@/hooks/useStyleProps'
import type { SBacktopEmits, SBacktopProps } from './types'

defineOptions({ name: 'SBacktop' })
const props = withDefaults(defineProps<SBacktopProps>(), {
  visibilityHeight: 200,
  right: 40,
  bottom: 40,
  duration: 500,
})
const emit = defineEmits<SBacktopEmits>()
const { style } = useStyleProps()
const visible = ref(false)
const backtopRef = ref<HTMLElement | null>(null)
const dragging = ref(false)
const dragPosition = ref<{ right: number; bottom: number } | null>(null)
let dragStart: { x: number; y: number; right: number; bottom: number } | null = null
let pressTimer: ReturnType<typeof setTimeout> | undefined
let suppressClick = false
let container: HTMLElement | Window | undefined
let frame = 0

function clearPressTimer() {
  if (pressTimer) clearTimeout(pressTimer)
  pressTimer = undefined
}

function handlePointerDown(event: PointerEvent) {
  if (event.button !== 0 || !event.isPrimary || !backtopRef.value) return
  clearPressTimer()
  const rect = backtopRef.value.getBoundingClientRect()
  dragStart = {
    x: event.clientX,
    y: event.clientY,
    right: window.innerWidth - rect.right,
    bottom: window.innerHeight - rect.bottom,
  }
  backtopRef.value.setPointerCapture(event.pointerId)
  pressTimer = setTimeout(() => {
    dragging.value = true
    suppressClick = true
    pressTimer = undefined
  }, 350)
}

function handlePointerMove(event: PointerEvent) {
  if (!dragStart) return
  const dx = event.clientX - dragStart.x
  const dy = event.clientY - dragStart.y
  if (!dragging.value) {
    if (Math.hypot(dx, dy) > 6) {
      clearPressTimer()
      suppressClick = true
    }
    return
  }
  event.preventDefault()
  const rect = backtopRef.value?.getBoundingClientRect()
  dragPosition.value = {
    right: Math.max(0, Math.min(window.innerWidth - (rect?.width ?? 0), dragStart.right - dx)),
    bottom: Math.max(0, Math.min(window.innerHeight - (rect?.height ?? 0), dragStart.bottom - dy)),
  }
}

function endPointer(event: PointerEvent) {
  clearPressTimer()
  dragStart = null
  dragging.value = false
  if (backtopRef.value?.hasPointerCapture(event.pointerId)) backtopRef.value.releasePointerCapture(event.pointerId)
  if (suppressClick) setTimeout(() => (suppressClick = false), 0)
}

function handlePointerUp(event: PointerEvent) {
  endPointer(event)
}

function handlePointerCancel(event: PointerEvent) {
  endPointer(event)
}

function scrollTop() {
  return container === window
    ? window.scrollY || document.documentElement.scrollTop
    : ((container as HTMLElement)?.scrollTop ?? 0)
}

function setScrollTop(top: number) {
  if (container === window) window.scrollTo(0, top)
  else (container as HTMLElement)?.scrollTo(0, top)
}

function updateVisibility() {
  visible.value = scrollTop() >= props.visibilityHeight
}

function bindTarget() {
  container?.removeEventListener('scroll', updateVisibility)
  if (frame) cancelAnimationFrame(frame)
  frame = 0
  container = props.target ? (document.querySelector<HTMLElement>(props.target) ?? undefined) : window
  container?.addEventListener('scroll', updateVisibility, { passive: true })
  visible.value = false
  if (container) updateVisibility()
}

function handleClick(event: MouseEvent) {
  if (suppressClick) {
    suppressClick = false
    return
  }
  emit('click', event)
  if (!container) return
  if (frame) cancelAnimationFrame(frame)
  const start = scrollTop()
  const duration = Math.max(0, props.duration)
  if (!start || !duration) {
    setScrollTop(0)
    return
  }
  const startedAt = performance.now()
  const animate = (now: number) => {
    const progress = Math.min((now - startedAt) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    setScrollTop(start * (1 - eased))
    frame = progress < 1 ? requestAnimationFrame(animate) : 0
  }
  frame = requestAnimationFrame(animate)
}

function handleKeyboard() {
  if (container) (document.activeElement as HTMLElement)?.click()
}

onMounted(bindTarget)
watch(() => props.target, bindTarget)
watch(() => props.visibilityHeight, updateVisibility)
watch(
  () => [props.right, props.bottom],
  () => (dragPosition.value = null),
)
onBeforeUnmount(() => {
  clearPressTimer()
  container?.removeEventListener('scroll', updateVisibility)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<style scoped lang="scss">
.s-backtop {
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--el-bg-color-overlay, #fff);
  color: var(--el-color-primary, #409eff);
  box-shadow: var(--el-box-shadow-lighter, 0 0 6px rgb(0 0 0 / 12%));
  cursor: pointer;
  touch-action: none;
  user-select: none;
}
.s-backtop--dragging {
  cursor: grabbing;
}
.s-backtop:hover {
  background: var(--el-fill-color-light, #f5f7fa);
}
.s-backtop:focus-visible {
  outline: 2px solid var(--el-color-primary, #409eff);
  outline-offset: 2px;
}
.s-backtop-fade-enter-active,
.s-backtop-fade-leave-active {
  transition: opacity 0.2s;
}
.s-backtop-fade-enter-from,
.s-backtop-fade-leave-to {
  opacity: 0;
}
</style>
