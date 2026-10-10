<template>
  <div
    ref="rootRef"
    class="s-scroll"
    :class="{ 's-scroll--autosize': autosize, 's-scroll--left': verticalOnLeft }"
    :style="rootStyle"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <div ref="viewport" class="s-scroll__viewport" :style="viewportStyle" tabindex="0" @scroll.passive="onScroll">
      <div ref="contentRef" class="s-scroll__content"><slot /></div>
    </div>
    <div
      v-if="renderBar('y')"
      ref="verticalTrackRef"
      class="s-scroll__track s-scroll__track--y"
      :class="{ 'is-visible': barVisible('y') }"
      :style="verticalTrackStyle"
      @pointerdown="onTrackPointerDown($event, 'y')"
    >
      <div class="s-scroll__thumb" :style="verticalThumbStyle" @pointerdown.stop="onThumbPointerDown($event, 'y')" />
    </div>
    <div
      v-if="renderBar('x')"
      ref="horizontalTrackRef"
      class="s-scroll__track s-scroll__track--x"
      :class="{ 'is-visible': barVisible('x') }"
      :style="horizontalTrackStyle"
      @pointerdown="onTrackPointerDown($event, 'x')"
    >
      <div class="s-scroll__thumb" :style="horizontalThumbStyle" @pointerdown.stop="onThumbPointerDown($event, 'x')" />
    </div>
    <div v-if="barVisible('x') && barVisible('y')" class="s-scroll__corner" :style="cornerStyle" />
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch, type CSSProperties } from 'vue'
import { processWidth } from '@sybz-components/utils'
import type { SScrollEmits, SScrollProps } from './types'

defineOptions({ name: 'SScroll' })
const props = withDefaults(defineProps<SScrollProps>(), {
  autosize: false,
  type: 'hover',
  scrollbars: 'xy',
  offsetScrollbars: false,
  scrollbarSize: 8,
  scrollHideDelay: 1000,
  overscrollBehavior: 'auto',
})
const emit = defineEmits<SScrollEmits>()
const rootRef = ref<HTMLElement>()
const viewport = ref<HTMLElement>()
const contentRef = ref<HTMLElement>()
const verticalTrackRef = ref<HTMLElement>()
const horizontalTrackRef = ref<HTMLElement>()
const overflowingX = ref(false)
const overflowingY = ref(false)
const hovered = ref(false)
const scrolling = ref(false)
const x = ref(0)
const y = ref(0)
const clientWidth = ref(0)
const clientHeight = ref(0)
const scrollWidth = ref(0)
const scrollHeight = ref(0)
const direction = ref<'ltr' | 'rtl'>('ltr')
let resizeObserver: ResizeObserver | undefined
let hideTimer: ReturnType<typeof setTimeout> | undefined
let hoverHideTimer: ReturnType<typeof setTimeout> | undefined
let previousEdges = { top: true, bottom: false, left: true, right: false }

const verticalOnLeft = computed(
  () => props.verticalScrollbarPosition === 'left' || (!props.verticalScrollbarPosition && direction.value === 'rtl'),
)
const resolvedSize = computed(() => (props.scrollbarSize <= 0 ? 0 : Math.max(2, props.scrollbarSize)))
const size = computed(() => `${resolvedSize.value}px`)
const allowsX = computed(() => props.scrollbars !== 'y')
const allowsY = computed(() => props.scrollbars !== 'x')
const rootStyle = computed<CSSProperties>(
  () =>
    ({
      width:
        props.width === undefined && props.w === undefined ? undefined : processWidth(props.width ?? props.w, true),
      height: props.autosize
        ? undefined
        : props.height === undefined && props.h === undefined
          ? undefined
          : processWidth(props.height ?? props.h, true),
      maxHeight: props.autosize && props.maxHeight !== undefined ? processWidth(props.maxHeight, true) : undefined,
      '--s-scrollbar-size': size.value,
    }) as CSSProperties,
)
const offsetX = computed(
  () =>
    props.offsetScrollbars === true ||
    props.offsetScrollbars === 'x' ||
    (props.offsetScrollbars === 'present' && barVisible('x')),
)
const offsetY = computed(
  () =>
    props.offsetScrollbars === true ||
    props.offsetScrollbars === 'y' ||
    (props.offsetScrollbars === 'present' && barVisible('y')),
)
const viewportStyle = computed<CSSProperties>(() => ({
  overflowX: allowsX.value ? 'auto' : 'hidden',
  overflowY: allowsY.value ? 'auto' : 'hidden',
  overscrollBehavior: props.overscrollBehavior,
  paddingBottom: offsetX.value ? size.value : undefined,
  paddingLeft: offsetY.value && verticalOnLeft.value ? size.value : undefined,
  paddingRight: offsetY.value && !verticalOnLeft.value ? size.value : undefined,
  maxHeight: props.autosize && props.maxHeight !== undefined ? processWidth(props.maxHeight, true) : undefined,
}))
const verticalTrackStyle = computed<CSSProperties>(() => ({
  width: size.value,
  bottom: barVisible('x') ? size.value : '0',
}))
const horizontalTrackStyle = computed<CSSProperties>(() => ({
  height: size.value,
  left: barVisible('y') && verticalOnLeft.value ? size.value : '0',
  right: barVisible('y') && !verticalOnLeft.value ? size.value : '0',
}))
const cornerStyle = computed<CSSProperties>(() => ({
  width: size.value,
  height: size.value,
  left: verticalOnLeft.value ? '0' : undefined,
  right: verticalOnLeft.value ? undefined : '0',
}))
const verticalTrackLength = computed(() => Math.max(0, clientHeight.value - (barVisible('x') ? resolvedSize.value : 0)))
const horizontalTrackLength = computed(() =>
  Math.max(0, clientWidth.value - (barVisible('y') ? resolvedSize.value : 0)),
)
function thumbLength(trackLength: number, visibleLength: number, contentLength: number) {
  return Math.min(trackLength, Math.max(10, (trackLength * visibleLength) / Math.max(contentLength, 1)))
}
const verticalThumbStyle = computed<CSSProperties>(() => {
  const length = thumbLength(verticalTrackLength.value, clientHeight.value, scrollHeight.value)
  const progress = y.value / Math.max(scrollHeight.value - clientHeight.value, 1)
  return { height: `${length}px`, transform: `translateY(${progress * (verticalTrackLength.value - length)}px)` }
})
const horizontalThumbStyle = computed<CSSProperties>(() => {
  const length = thumbLength(horizontalTrackLength.value, clientWidth.value, scrollWidth.value)
  const distance = Math.abs(x.value) / Math.max(scrollWidth.value - clientWidth.value, 1)
  const progress = direction.value === 'rtl' ? 1 - distance : distance
  return { width: `${length}px`, transform: `translateX(${progress * (horizontalTrackLength.value - length)}px)` }
})
function renderBar(axis: 'x' | 'y') {
  return resolvedSize.value > 0 && props.type !== 'never' && (axis === 'x' ? allowsX.value : allowsY.value)
}
function barVisible(axis: 'x' | 'y') {
  if (!renderBar(axis)) return false
  const overflowing = axis === 'x' ? overflowingX.value : overflowingY.value
  if (props.type === 'always') return true
  if (!overflowing) return false
  return (
    props.type === 'auto' || (props.type === 'hover' && hovered.value) || (props.type === 'scroll' && scrolling.value)
  )
}
function measure() {
  const element = viewport.value
  if (!element) return
  direction.value = getComputedStyle(rootRef.value ?? element).direction as 'ltr' | 'rtl'
  clientWidth.value = element.clientWidth
  clientHeight.value = element.clientHeight
  scrollWidth.value = element.scrollWidth
  scrollHeight.value = element.scrollHeight
  const previousOverflow = overflowingY.value
  overflowingX.value = allowsX.value && element.scrollWidth > element.clientWidth + 1
  overflowingY.value = allowsY.value && element.scrollHeight > element.clientHeight + 1
  if (previousOverflow !== overflowingY.value) emit('overflow-change', overflowingY.value)
  x.value = element.scrollLeft
  y.value = element.scrollTop
}
function onPointerEnter() {
  if (hoverHideTimer) clearTimeout(hoverHideTimer)
  hovered.value = true
}
function onPointerLeave() {
  if (hoverHideTimer) clearTimeout(hoverHideTimer)
  hoverHideTimer = setTimeout(() => {
    hovered.value = false
  }, props.scrollHideDelay)
}
function onScroll() {
  const element = viewport.value
  if (!element) return
  x.value = element.scrollLeft
  y.value = element.scrollTop
  emit('scroll-position-change', { x: x.value, y: y.value })
  const maxX = Math.max(0, element.scrollWidth - element.clientWidth)
  const maxY = Math.max(0, element.scrollHeight - element.clientHeight)
  const edges = {
    top: y.value <= 0,
    bottom: maxY > 0 && y.value >= maxY - 1,
    left: direction.value === 'rtl' ? maxX > 0 && Math.abs(x.value) >= maxX - 1 : x.value <= 0,
    right: direction.value === 'rtl' ? x.value >= 0 : maxX > 0 && x.value >= maxX - 1,
  }
  for (const edge of ['top', 'bottom', 'left', 'right'] as const) {
    if (edges[edge] && !previousEdges[edge]) {
      if (edge === 'top') emit('top-reached')
      else if (edge === 'bottom') emit('bottom-reached')
      else if (edge === 'left') emit('left-reached')
      else emit('right-reached')
    }
  }
  previousEdges = edges
  scrolling.value = true
  if (hideTimer) clearTimeout(hideTimer)
  hideTimer = setTimeout(() => {
    scrolling.value = false
  }, props.scrollHideDelay)
}
function onThumbPointerDown(event: PointerEvent, axis: 'x' | 'y') {
  if (!viewport.value) return
  event.preventDefault()
  cleanupDrag?.()
  const startPointer = axis === 'x' ? event.clientX : event.clientY
  const startScroll = axis === 'x' ? viewport.value.scrollLeft : viewport.value.scrollTop
  const track = axis === 'x' ? horizontalTrackRef.value : verticalTrackRef.value
  const trackLength = axis === 'x' ? (track?.clientWidth ?? 0) : (track?.clientHeight ?? 0)
  const visibleLength = axis === 'x' ? clientWidth.value : clientHeight.value
  const contentLength = axis === 'x' ? scrollWidth.value : scrollHeight.value
  const ratio =
    (contentLength - visibleLength) / Math.max(trackLength - thumbLength(trackLength, visibleLength, contentLength), 1)
  const move = (moveEvent: PointerEvent) => {
    const delta = (axis === 'x' ? moveEvent.clientX : moveEvent.clientY) - startPointer
    if (axis === 'x') viewport.value?.scrollTo({ left: startScroll + delta * ratio })
    else viewport.value?.scrollTo({ top: startScroll + delta * ratio })
  }
  const stop = () => {
    window.removeEventListener('pointermove', move)
    window.removeEventListener('pointerup', stop)
  }
  window.addEventListener('pointermove', move)
  window.addEventListener('pointerup', stop, { once: true })
  cleanupDrag = stop
}
let cleanupDrag: (() => void) | undefined
function onTrackPointerDown(event: PointerEvent, axis: 'x' | 'y') {
  const element = viewport.value
  const track = axis === 'x' ? horizontalTrackRef.value : verticalTrackRef.value
  if (!element || !track) return
  const rect = track.getBoundingClientRect()
  const fraction = axis === 'x' ? (event.clientX - rect.left) / rect.width : (event.clientY - rect.top) / rect.height
  if (axis === 'x')
    element.scrollTo({
      left: (direction.value === 'rtl' ? fraction - 1 : fraction) * (element.scrollWidth - element.clientWidth),
      behavior: 'smooth',
    })
  else element.scrollTo({ top: fraction * (element.scrollHeight - element.clientHeight), behavior: 'smooth' })
}
watch(
  () => [props.scrollbars, props.offsetScrollbars, props.maxHeight, props.height, props.width],
  () => nextTick(measure),
)
onMounted(() => {
  const element = viewport.value
  if (!element) return
  element.scrollLeft = props.startScrollPosition?.x ?? 0
  element.scrollTop = props.startScrollPosition?.y ?? 0
  measure()
  previousEdges = {
    top: element.scrollTop <= 0,
    bottom:
      element.scrollTop >= element.scrollHeight - element.clientHeight && element.scrollHeight > element.clientHeight,
    left:
      direction.value === 'rtl'
        ? Math.abs(element.scrollLeft) >= element.scrollWidth - element.clientWidth &&
          element.scrollWidth > element.clientWidth
        : element.scrollLeft === 0,
    right:
      direction.value === 'rtl'
        ? element.scrollLeft === 0
        : Math.abs(element.scrollLeft) >= element.scrollWidth - element.clientWidth &&
          element.scrollWidth > element.clientWidth,
  }
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(element)
    if (contentRef.value) resizeObserver.observe(contentRef.value)
  }
})
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  if (hideTimer) clearTimeout(hideTimer)
  if (hoverHideTimer) clearTimeout(hoverHideTimer)
  cleanupDrag?.()
})
defineExpose({ viewport, scrollTo: (options: ScrollToOptions) => viewport.value?.scrollTo(options) })
</script>

<style scoped lang="scss">
.s-scroll {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  min-width: 0;
}
.s-scroll__viewport {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  scrollbar-width: none;
  outline: none;
}
.s-scroll__viewport::-webkit-scrollbar {
  display: none;
}
.s-scroll__viewport:focus-visible {
  outline: 2px solid var(--el-color-primary, #409eff);
  outline-offset: -2px;
}
.s-scroll--autosize .s-scroll__viewport {
  height: auto;
}
.s-scroll__content {
  display: table;
  min-width: 100%;
}
.s-scroll__track {
  position: absolute;
  z-index: 1;
  opacity: 0;
  pointer-events: none;
  border-radius: 100px;
  background: var(--el-fill-color-light, #f5f7fa);
  transition: opacity 0.15s;
  touch-action: none;
}
.s-scroll__track.is-visible {
  opacity: 1;
  pointer-events: auto;
}
.s-scroll__track--y {
  top: 0;
  right: 0;
}
.s-scroll--left .s-scroll__track--y {
  right: auto;
  left: 0;
}
.s-scroll__track--x {
  bottom: 0;
}
.s-scroll__thumb {
  position: relative;
  border-radius: inherit;
  background: var(--el-border-color-darker, #cdd0d6);
  cursor: grab;
}
.s-scroll__track--y .s-scroll__thumb {
  width: 100%;
}
.s-scroll__track--x .s-scroll__thumb {
  height: 100%;
}
.s-scroll__thumb:active {
  cursor: grabbing;
}
.s-scroll__corner {
  position: absolute;
  bottom: 0;
  background: var(--el-fill-color-light, #f5f7fa);
}
</style>
