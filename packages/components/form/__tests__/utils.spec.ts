import { describe, expect, it } from 'vitest'
import {
  cloneDefaultValue,
  getFormGap,
  getFormItemBasis,
  getValueByPath,
  hasValueByPath,
  normalizeFormPath,
  setValueByPath,
  toVueEventProp,
} from '../src/utils'

describe('form path utils', () => {
  it('normalizes dot and bracket paths', () => {
    expect(normalizeFormPath('domains.0.value')).toEqual(['domains', '0', 'value'])
    expect(normalizeFormPath('domains[1].children[0].name')).toEqual(['domains', '1', 'children', '0', 'name'])
  })

  it('gets and sets deep object values', () => {
    const model: Record<string, any> = {}

    setValueByPath(model, 'domains.0.value', 'first')
    setValueByPath(model, 'user.profile.name', 'Andy')

    expect(model).toEqual({
      domains: [{ value: 'first' }],
      user: {
        profile: {
          name: 'Andy',
        },
      },
    })
    expect(getValueByPath(model, 'domains[0].value')).toBe('first')
    expect(getValueByPath(model, 'user.profile.name')).toBe('Andy')
  })

  it('detects whether a deep path already exists', () => {
    const model = {
      user: {
        name: undefined,
      },
    }

    expect(hasValueByPath(model, 'user.name')).toBe(true)
    expect(hasValueByPath(model, 'user.age')).toBe(false)
  })

  it('clones default values before writing them into model', () => {
    const value = {
      list: [{ label: 'A' }],
      date: new Date('2026-01-01T00:00:00.000Z'),
    }
    const cloned = cloneDefaultValue(value)

    expect(cloned).toEqual(value)
    expect(cloned).not.toBe(value)
    expect(cloned.list).not.toBe(value.list)
    expect(cloned.list[0]).not.toBe(value.list[0])
    expect(cloned.date).not.toBe(value.date)
  })
})

describe('form event utils', () => {
  it('converts schema event names to vue listener props', () => {
    expect(toVueEventProp('change')).toBe('onChange')
    expect(toVueEventProp('update:modelValue')).toBe('onUpdate:modelValue')
    expect(toVueEventProp('update:model-value')).toBe('onUpdate:modelValue')
    expect(toVueEventProp('onBlur')).toBe('onBlur')
  })
})

describe('form layout utils', () => {
  it('parses gap values with processWidth rules', () => {
    expect(getFormGap()).toBe('')
    expect(getFormGap(16)).toBe('16px')
    expect(getFormGap('1rem')).toBe('1rem')
    expect(getFormGap('wrong')).toBe('')
  })

  it('keeps old basis when gap is not configured', () => {
    expect(getFormItemBasis(2)).toBe('50%')
    expect(getFormItemBasis(3, 'wrong')).toBe(`${100 / 3}%`)
    expect(getFormItemBasis(1, 16)).toBe('100%')
  })

  it('calculates flex basis with gap included only for multiple columns', () => {
    expect(getFormItemBasis(2, 16)).toBe('calc((100% - 16px * 1) / 2)')
    expect(getFormItemBasis(3, '1rem')).toBe('calc((100% - 1rem * 2) / 3)')
  })
})
