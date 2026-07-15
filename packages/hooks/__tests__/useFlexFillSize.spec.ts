import { createApp, nextTick, shallowRef, type Ref } from 'vue'
import { afterEach, describe, expect, it } from 'vitest'

import { useFlexFillSize } from '../useFlexFillSize'

const mountedApps: ReturnType<typeof createApp>[] = []

const mountHook = (target: Ref<HTMLElement | null>, options?: Parameters<typeof useFlexFillSize>[1]) => {
  let result: ReturnType<typeof useFlexFillSize> | undefined
  const app = createApp({
    setup() {
      result = useFlexFillSize(target, options)
      return {}
    },
    template: '<div />',
  })
  const root = document.createElement('div')
  document.body.appendChild(root)
  app.mount(root)
  mountedApps.push(app)
  return result!
}

afterEach(() => {
  mountedApps.splice(0).forEach((app) => app.unmount())
  document.body.innerHTML = ''
})

describe('useFlexFillSize', () => {
  it('applies the default flex fill styles and initial size', async () => {
    const element = document.createElement('div')
    const target = shallowRef<HTMLElement | null>(null)
    const result = mountHook(target, { initialSize: { width: 120, height: 80 } })

    expect(result.width.value).toBe(120)
    expect(result.height.value).toBe(80)

    target.value = element
    await nextTick()

    expect(element.style.flex).toBe('1 1 0px')
    expect(element.style.minHeight).toBe('0')
    expect(element.style.minWidth).toBe('0')
    expect(element.style.overflow).toBe('hidden')
  })

  it('supports custom flex and overflow values', async () => {
    const element = document.createElement('div')
    const target = shallowRef<HTMLElement | null>(element)

    mountHook(target, { flex: '2 1 auto', overflow: 'auto' })
    await nextTick()

    expect(element.style.flex).toBe('2 1 auto')
    expect(element.style.overflow).toBe('auto')
  })

  it('restores styles when the target changes and when unmounted', async () => {
    const first = document.createElement('div')
    first.style.flex = '0 0 auto'
    first.style.overflow = 'visible'
    const second = document.createElement('div')
    const target = shallowRef<HTMLElement | null>(first)

    mountHook(target)
    await nextTick()
    target.value = second
    await nextTick()

    expect(first.style.flex).toBe('0 0 auto')
    expect(first.style.overflow).toBe('visible')
    expect(second.style.flex).toBe('1 1 0px')

    mountedApps.pop()?.unmount()

    expect(second.style.flex).toBe('')
    expect(second.style.overflow).toBe('')
  })
})
