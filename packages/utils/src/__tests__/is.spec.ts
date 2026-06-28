import { describe, expect, it } from 'vitest'
import {
  isArray,
  isBoolean,
  isComponent,
  isDate,
  isEmptyObject,
  isFunction,
  isIOS,
  isMap,
  isNumber,
  isObject,
  isPlainObject,
  isPromise,
  isRegExp,
  isSVGElement,
  isSet,
  isString,
  isStringNumber,
  isSymbol,
  isUrl,
  toRawType,
  toTypeString,
} from '../is'

describe('is utils', () => {
  it('detects raw types', () => {
    expect(toTypeString([])).toBe('[object Array]')
    expect(toRawType(new Map())).toBe('Map')
  })

  it('detects collection and object types', () => {
    expect(isArray([])).toBe(true)
    expect(isMap(new Map())).toBe(true)
    expect(isSet(new Set())).toBe(true)
    expect(isDate(new Date())).toBe(true)
    expect(isRegExp(/sybz/)).toBe(true)
    expect(isPlainObject({ id: 1 })).toBe(true)
    expect(isPlainObject([])).toBe(false)
    expect(isEmptyObject({})).toBe(true)
    expect(isObject(null)).toBe(false)
    expect(isObject({})).toBe(true)
  })

  it('detects primitive and function types', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isString('sybz')).toBe(true)
    expect(isStringNumber('12.5')).toBe(true)
    expect(isStringNumber('12px')).toBe(false)
    expect(isNumber(12)).toBe(true)
    expect(isNumber(Number.NaN)).toBe(true)
    expect(isSymbol(Symbol('id'))).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('detects promise-like values and components', () => {
    expect(isPromise(Promise.resolve(1))).toBe(true)
    expect(isPromise({ then: () => {}, catch: () => {} })).toBe(true)
    expect(isComponent({ render: () => null })).toBe(true)
    expect(isComponent({ setup: () => ({}) })).toBe(true)
    expect(isComponent({})).toBe(false)
  })

  it('detects URLs and svg elements', () => {
    expect(isUrl('https://sybz-components.com')).toBe(true)
    expect(isUrl('localhost')).toBe(false)

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    expect(isSVGElement(svg)).toBe(true)
    expect(isSVGElement(document.createElement('div'))).toBe(false)
  })

  it('detects iOS user agents', () => {
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      configurable: true,
    })
    expect(isIOS()).toBe(true)

    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Macintosh; Intel Mac OS X)',
      configurable: true,
    })
    expect(isIOS()).toBe(false)
  })
})
