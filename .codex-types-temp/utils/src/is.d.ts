/**
 * `Object.prototype.toString` 的别名，适合在需要手动调用 `call` 时直接复用。
 *
 * @example
 * objectToString.call([])
 * // => '[object Array]'
 */
export declare const objectToString: () => string;
/**
 * 获取对象的完整类型字符串。
 *
 * @param value 需要判断的值。
 * @returns 形如 `[object Array]` 的类型结果。
 *
 * @example
 * toTypeString([])
 * // => '[object Array]'
 */
export declare const toTypeString: (value: unknown) => string;
/**
 * 获取对象的原始类型名称。
 *
 * @param value 需要判断的值。
 * @returns 形如 `Array`、`Date`、`Map` 的类型名。
 *
 * @example
 * toRawType(new Map())
 * // => 'Map'
 */
export declare const toRawType: (value: unknown) => string;
/**
 * 判断值是否为数组。
 *
 * @param value 需要判断的值。
 * @returns 是否为数组。
 *
 * @example
 * isArray([1, 2, 3])
 * // => true
 */
export declare const isArray: (arg: any) => arg is any[];
/**
 * 判断值是否为 `Map`。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `Map`。
 *
 * @example
 * isMap(new Map())
 * // => true
 */
export declare const isMap: (val: unknown) => val is Map<any, any>;
/**
 * 判断值是否为 `Set`。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `Set`。
 *
 * @example
 * isSet(new Set([1, 2, 3]))
 * // => true
 */
export declare const isSet: (val: unknown) => val is Set<any>;
/**
 * 判断值是否为 `Date` 对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `Date`。
 *
 * @example
 * isDate(new Date())
 * // => true
 */
export declare const isDate: (val: unknown) => val is Date;
/**
 * 判断值是否为正则对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `RegExp`。
 *
 * @example
 * isRegExp(/sybz/i)
 * // => true
 */
export declare const isRegExp: (val: unknown) => val is RegExp;
/**
 * 判断值是否为函数。
 *
 * @param val 需要判断的值。
 * @returns 是否为函数。
 *
 * @example
 * isFunction(() => {})
 * // => true
 */
export declare const isFunction: (val: unknown) => val is Function;
/**
 * 判断值是否为字符串。
 *
 * @param val 需要判断的值。
 * @returns 是否为字符串。
 *
 * @example
 * isString('sybz')
 * // => true
 */
export declare const isString: (val: unknown) => val is string;
/**
 * 判断字符串是否可以被转换成有效数字。
 *
 * @param val 需要判断的字符串。
 * @returns 是否可以安全转换成数字。
 *
 * @example
 * isStringNumber('12.5')
 * // => true
 *
 * @example
 * isStringNumber('12px')
 * // => false
 */
export declare const isStringNumber: (val: string) => boolean;
/**
 * 判断值是否为数字类型。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `number`。
 *
 * @example
 * isNumber(12)
 * // => true
 */
export declare const isNumber: (val: unknown) => val is number;
/**
 * 判断值是否为 `Symbol`。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `Symbol`。
 *
 * @example
 * isSymbol(Symbol('id'))
 * // => true
 */
export declare const isSymbol: (val: unknown) => val is symbol;
/**
 * 判断值是否为布尔值。
 *
 * @param val 需要判断的值。
 * @returns 是否为 `boolean`。
 *
 * @example
 * isBoolean(false)
 * // => true
 */
export declare const isBoolean: (val: unknown) => val is boolean;
/**
 * 判断值是否为对象且不为 `null`。
 *
 * @param val 需要判断的值。
 * @returns 是否为对象。
 *
 * @example
 * isObject({ id: 1 })
 * // => true
 */
export declare const isObject: (val: unknown) => val is Record<string | number | symbol, any>;
/**
 * 判断值是否为 Promise 风格对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为 Promise。
 *
 * @example
 * isPromise(Promise.resolve(1))
 * // => true
 */
export declare const isPromise: <T = any>(val: unknown) => val is Promise<T>;
/**
 * 判断值是否为普通对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为普通对象。
 *
 * @example
 * isPlainObject({ id: 1 })
 * // => true
 */
export declare const isPlainObject: (val: unknown) => val is Record<string | number | symbol, any>;
/**
 * 判断值是否为空普通对象。
 *
 * @param val 需要判断的值。
 * @returns 是否为空对象。
 *
 * @example
 * isEmptyObject({})
 * // => true
 */
export declare const isEmptyObject: (val: unknown) => val is Record<string | number | symbol, any>;
/**
 * 判断字符串是否为合法链接。
 *
 * @param url 需要判断的链接。
 * @returns 是否为合法 URL。
 *
 * @example
 * isUrl('https://sybz-components.com')
 * // => true
 */
export declare function isUrl(url: string): url is string;
/**
 * 判断节点是否为 `SVGElement`。
 *
 * @param tag 需要判断的节点。
 * @returns 是否为 `SVGElement`。
 *
 * @example
 * const svg = document.querySelector('svg')
 * isSVGElement(svg)
 */
export declare const isSVGElement: (tag: unknown) => tag is SVGElement;
/**
 * 判断对象是否为 Vue 组件配置。
 *
 * @param val 需要判断的值。
 * @returns 是否像一个 Vue 组件。
 *
 * @example
 * isComponent({
 *   render() {
 *     return null
 *   },
 * })
 */
export declare const isComponent: (val: unknown) => boolean;
/**
 * 判断当前运行环境是否为 iOS。
 *
 * @returns 是否为 iOS 设备。
 *
 * @example
 * if (isIOS()) {
 *   console.log('当前设备是 iOS')
 * }
 */
export declare function isIOS(): boolean;
