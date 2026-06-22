import type { AppContext, VNode } from 'vue';
import type { Ref } from '@vue/reactivity';
import { type ElMessageBoxOptions, type MessageOptions } from 'element-plus';
type Func<Args extends any[] = any[], Return = any> = (...args: Args) => Return;
type StorageValue = unknown;
type StorageMap = Record<string, any>;
type MaybeRef<T> = T | Ref<T>;
type WidthStyleResult = {
    width: string;
};
type ValidateTriggerType = 'blur' | 'change';
type ValidateInput = ValidateRules | ValidatePrimitiveValue;
type ValidateRuleResult = {
    required?: boolean;
    message?: string;
    trigger?: ValidateTriggerType[];
    validator?: (rule: any, value: any, callback: (error?: Error) => void) => void;
    min?: number;
    max?: number;
};
type ValidatePrimitiveValue = string | number | boolean | null | undefined;
type UuidOptionItem<T = any> = {
    label: string;
    value: T;
};
interface ToastOptions extends Partial<MessageOptions> {
    /**
     * 调用前是否先关闭全部消息提示。
     */
    closeAll?: boolean;
}
interface ClearStorageExcludeOptions {
    /**
     * 清空时需要保留的 key 列表。
     */
    exclude: string[];
}
type ClearStorageInput = string | string[] | ClearStorageExcludeOptions;
interface ValidFormOptions {
    /**
     * 校验失败时的提示文案。
     */
    message?: string;
    /**
     * 是否在提示文案后追加字段名。
     */
    detail?: boolean;
    /**
     * 是否显示错误提示。
     */
    showMessage?: boolean;
}
interface FormValidateTarget {
    validate: (callback: (valid: boolean, status: StorageMap) => void) => void;
}
interface UuidOptions {
    /**
     * `email` 模式下的邮箱后缀，默认 `@qq.com`。
     */
    emailStr?: string;
    /**
     * `time` 模式下追加的时间格式，默认 `{y}-{m}-{d} {h}:{i}:{s}`。
     */
    timeStr?: string;
    /**
     * 生成结果前缀。
     */
    startStr?: string;
    /**
     * 数组选项模式下的固定索引；不传时随机取值。
     */
    optionsIndex?: number | null;
}
interface ValidateRules {
    /**
     * 校验失败提示文案。
     */
    message?: string;
    /**
     * 最小值或最小长度。
     */
    min?: number;
    /**
     * 最大值或最大长度。
     */
    max?: number;
    /**
     * 对比值，例如 `same` 校验时使用。
     */
    value?: any;
    /**
     * 自定义正则。
     */
    reg?: RegExp;
    /**
     * 是否必填，默认 `true`。
     */
    required?: boolean;
    /**
     * 触发时机，常用 `['blur', 'change']`。
     */
    trigger?: ValidateTriggerType[];
}
interface CopyOptions extends ToastOptions {
    /**
     * 是否隐藏复制成功提示。
     */
    hideToast?: boolean;
}
type WidthInput = string | number | Ref<string | number>;
type ConfirmMessage = string | VNode | (() => VNode);
interface ConfirmOptions extends ElMessageBoxOptions {
    /**
     * 确认框主题。
     */
    theme?: '' | 'chenghua';
    /**
     * 手动传入 appContext，处理多应用或嵌套弹窗场景。
     */
    appContext?: AppContext | null;
}
interface TryCatchResult<T> {
    /**
     * 执行成功时返回的数据；失败时为 `null`。
     */
    data: T | null;
    /**
     * 执行失败时返回的异常；成功时为 `null`。
     */
    error: any;
}
/**
 * 显示消息提示。
 *
 * 支持三种常见写法：
 * 1. `$toast('保存成功')`
 * 2. `$toast('保存失败', 'e')`
 * 3. `$toast({ message: '自定义', type: 'warning' })`
 *
 * @param message 提示内容，支持纯文本、VNode、渲染函数，或完整配置对象。
 * @param type 提示类型，支持 `success/info/error/warning` 和简写 `s/i/e/w`，也支持直接传配置对象。
 * @param otherParams 额外配置，例如 `duration`、`customClass`、`closeAll`。
 * @returns 无返回值。
 *
 * @example
 * $toast('保存成功')
 *
 * @example
 * $toast('保存失败', 'e')
 *
 * @example
 * $toast({
 *   message: '自定义提示',
 *   type: 'warning',
 *   duration: 1000,
 *   closeAll: true,
 * })
 */
type MessageType = 'success' | 'info' | 'error' | 'warning';
type ShortType = 's' | 'i' | 'e' | 'w';
type ToastType = MessageType | ShortType;
export declare function $toast(message: string | ToastOptions | VNode | (() => VNode), type?: ToastType | ToastOptions, otherParams?: ToastOptions): void;
export declare namespace $toast {
    var success: (message: string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | ToastOptions | (() => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>), otherParams?: ToastOptions) => void;
    var info: (message: string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | ToastOptions | (() => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>), otherParams?: ToastOptions) => void;
    var error: (message: string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | ToastOptions | (() => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>), otherParams?: ToastOptions) => void;
    var warning: (message: string | VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }> | ToastOptions | (() => VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>), otherParams?: ToastOptions) => void;
}
/**
 * 写入浏览器缓存。
 *
 * @param storageName 缓存 key。
 * @param params 要保存的值；对象和数组会自动序列化。
 * @param isSession 是否写入 `sessionStorage`；默认写入 `localStorage`。
 * 在 SSR / Node 环境下会自动跳过，不会抛错。
 *
 * @example
 * setStorage('token', 'abc123')
 *
 * @example
 * setStorage('userInfo', { id: 1, name: 'andy' }, true)
 */
export declare function setStorage(storageName: string, params: StorageValue, isSession?: boolean): void;
/**
 * 读取浏览器缓存。
 *
 * @param data 缓存 key。
 * @param isSession 是否从 `sessionStorage` 读取；默认从 `localStorage` 读取。
 * @returns 读取到的缓存值；不存在或在 SSR 环境下时返回 `null`。
 *
 * @example
 * const token = getStorage('token')
 *
 * @example
 * const userInfo = getStorage('userInfo', true)
 */
export declare function getStorage<T = any>(data: string, isSession?: boolean): T | string | number | null;
/**
 * 清空浏览器缓存。
 *
 * @param str 要清空的 key；不传时清空全部，传 `exclude` 时表示保留指定 key。
 * @returns 无返回值。
 * 在 SSR / Node 环境下会自动跳过。
 *
 * @example
 * clearStorage()
 *
 * @example
 * clearStorage('loginId')
 *
 * @example
 * clearStorage({ exclude: ['token', 'theme'] })
 */
export declare function clearStorage(str?: ClearStorageInput): void;
/**
 * 将 Element Plus 表单校验封装为 Promise。
 *
 * @param ref 表单实例或表单实例的 `ref`。
 * @param options 校验配置。
 * @returns 校验通过时返回表单状态对象，失败时 reject 对应状态对象。
 *
 * @example
 * await validForm(formRef)
 *
 * @example
 * await validForm(formRef, { message: '请检查表单信息', detail: true })
 */
export declare function validForm(ref: MaybeRef<FormValidateTarget>, { message, detail, showMessage }?: ValidFormOptions): Promise<StorageMap>;
/**
 * 判断值是否为空。
 *
 * 默认采用更安全的“结构空值”语义：
 * `undefined`、`null`、空字符串、空数组、空对象、`NaN`、空 `Map` / `Set`、无效日期会返回 `true`。
 *
 * @param data 要判断的值。
 * @param strict 是否使用严格模式。默认 `true`；传 `false` 时会沿用旧语义，把 `0` 和 `false` 也视为空值。
 * @returns 是否为空。
 *
 * @example
 * isEmpty('   ')
 * // => true
 *
 * @example
 * isEmpty(0)
 * // => false
 *
 * @example
 * isEmpty(0, false)
 * // => true
 */
export declare function isEmpty(data: any, strict?: boolean): boolean;
/**
 * 合并两个对象。
 *
 * 当同名字段同时有值时，以第二个对象为准；当其中一个字段为空时，保留有值的一侧。
 *
 * @param obj1 第一个对象。
 * @param obj2 第二个对象。
 * @returns 合并后的对象。
 *
 * @example
 * merge(
 *   { name: '', age: 18, city: 'beijing' },
 *   { name: 'andy', age: 20, city: '' },
 * )
 */
export declare function merge<T extends StorageMap, U extends StorageMap>(obj1: T, obj2: U): T & U;
/**
 * 深拷贝数据；传入数组时可按次数重复展开。
 *
 * @param data 要克隆的数据。
 * @param times 当 `data` 是数组时的复制次数，默认 `1`。
 * @returns 克隆后的数据。
 *
 * @example
 * clone({ name: 'andy', info: { id: 1 } })
 *
 * @example
 * clone([1, 2, { name: 'andy' }], 2)
 * // => [1, 2, { name: 'andy' }, 1, 2, { name: 'andy' }]
 */
export declare function clone<T>(data: T[], times?: number): T[];
export declare function clone<T>(data: T, times?: number): T;
/**
 * 生成随机字符串，也支持手机号、邮箱、时间、数字、IP、端口等特殊模式。
 *
 * @param type 生成模式，支持空字符串、`phone`、`email`、`time`、`number`、`ip`、`port`，也支持传选项数组。
 * @param length 随机字符串或数字的长度，默认 `4`。
 * @param options 额外配置。
 * @returns 生成结果。
 *
 * @example
 * uuid()
 * // => 'aB3d'
 *
 * @example
 * uuid('phone')
 * // => '13603312460'
 *
 * @example
 * uuid('time', 0, { startStr: 'andy', timeStr: '{h}:{i}:{s}' })
 */
export declare function uuid(type?: string | Array<UuidOptionItem>, length?: number, options?: UuidOptions): string | number | any;
/**
 * 获取值的原始类型名称，返回值统一为小写字符串。
 *
 * @param type 要判断的值。
 * @returns 类型名称，例如 `array`、`date`、`object`、`null`。
 *
 * @example
 * getType(new RegExp())
 * // => 'regexp'
 *
 * @example
 * getType([])
 * // => 'array'
 */
export declare function getType(type: unknown): string;
/**
 * 一个辅助函数，用于在代码中创建一个暂停（延迟）。
 * 它返回一个 Promise，你可以在 `await` 后使用它来实现类似 "sleep" 的效果。
 *
 * @param delay - 等待的毫秒数。默认值为 0，表示不延迟。
 * @param fn - (可选) 一个在延迟结束后立即执行的函数。
 *
 * @returns 一个 Promise，当延迟结束后解析（resolve）。
 *
 * @example
 * // 基本用法：延迟 2 秒后打印消息
 * console.log('开始');
 * await sleep(2000);
 * console.log('2秒后执行');
 *
 * @example
 * // 带回调函数的用法：延迟 1 秒后执行清理工作
 * sleep(1000, () => {
 *   console.log('执行清理操作...');
 *   // 清理代码...
 * });
 *
 * @example
 * // 在循环中使用：每次迭代后延迟 500 毫秒
 * for (let i = 0; i < 5; i++) {
 *   console.log(`当前值: ${i}`);
 *   await sleep(500);
 * }
 */
export declare function sleep(delay?: number, fn?: () => void): Promise<void>;
/**
 * 为 `validate` 预置默认触发时机 `['blur', 'change']`。
 *
 * @param type 校验类型。
 * @param rules 校验规则。
 * @param pureValid 是否直接返回布尔值。
 * @returns 与 `validate` 一致。
 *
 * @example
 * const rule = validateTrigger('required', { message: '请输入名称' })
 */
export declare function validateTrigger(type?: string, rules?: ValidateRules, pureValid?: boolean): boolean | ValidateRuleResult;
export declare function validate(type?: string, rules?: ValidateInput, pureValid?: boolean): ValidateRuleResult | boolean;
/**
 * 复制文本到剪贴板。
 *
 * @param text 需要复制的文本。
 * @param toastParams 提示配置；传 `hideToast: true` 时不显示成功提示。
 * @returns 是否复制成功。
 *
 * @example
 * copy('这是要复制的文本')
 *
 * @example
 * copy('静默复制', { hideToast: true })
 */
export declare const copy: (text: string, toastParams?: CopyOptions) => boolean;
/**
 * 带变量名的日志输出封装。
 *
 * @param variableStr 变量名或标签名。
 * @param variable 需要打印的值。
 * @param otherInfo 附加信息，常用于手动传入文件路径。
 *
 * @example
 * const formData = { id: 1, name: 'andy' }
 * log('formData', formData)
 */
export declare function log(variableStr: string, variable: unknown, otherInfo?: string): void;
/**
 * 生成指定范围内的随机整数。
 *
 * @param min 最小值，默认 `0`。
 * @param max 最大值，默认 `10`。
 * @returns 随机整数。
 *
 * @example
 * random()
 *
 * @example
 * random(100, 999)
 */
export declare function random(min?: number, max?: number): number;
/**
 * 将驼峰命名转换为连接符命名。
 *
 * @param text 要转换的文本。
 * @param connect 连接符，默认 `-`。
 * @returns 转换后的文本。
 *
 * @example
 * toLine('NameAndy')
 * // => 'name-andy'
 *
 * @example
 * toLine('CompTitle', '_')
 * // => 'comp_title'
 */
export declare function toLine(text: string, connect?: string): string;
/**
 * 将宽度值规范化为可直接用于样式的结果。
 *
 * @param initValue 宽度值，支持数字、数字字符串、CSS 长度字符串和 `ref`。
 * @param isBase 为 `true` 时直接返回宽度字符串；否则返回 `{ width }` 对象。
 * @returns 宽度字符串或宽度样式对象；无效值返回空字符串或空对象。
 *
 * @example
 * processWidth(200)
 * // => { width: '200px' }
 *
 * @example
 * processWidth('50%', true)
 * // => '50%'
 */
export declare function processWidth(initValue: WidthInput, isBase: true): string;
export declare function processWidth(initValue: WidthInput, isBase?: false): WidthStyleResult | {};
/**
 * 创建节流函数。
 *
 * @param fn 需要节流执行的函数。
 * @param delay 节流间隔，单位毫秒，默认 `1000`。
 * @returns 节流后的函数。
 *
 * @example
 * const onResize = throttle(() => {
 *   console.log('resize')
 * }, 300)
 */
export declare function throttle<T extends Func>(fn: T, delay?: number): (...args: Parameters<T>) => void;
/**
 * 统一处理 Promise 或任务函数执行结果。
 *
 * 推荐优先传入函数，这样可以同时捕获同步 `throw` 和异步 `reject`。
 *
 * @param task Promise，或返回值 / Promise 的函数。
 * @param sendLoading 可选的 loading `ref`。
 * @returns 包含 `data` 和 `error` 的结果对象。
 *
 * @example
 * const loading = ref(false)
 * const { data, error } = await tryCatch(() => fetchUserData(), loading)
 *
 * @example
 * const { data, error } = await tryCatch(Promise.resolve({ id: 1 }))
 *
 * @example
 * const { data, error } = await tryCatch(() => {
 *   if (!form.name) throw new Error('请输入名称')
 *   return submitForm(form)
 * })
 */
export declare function tryCatch<T>(task: Promise<T>, sendLoading?: Ref<boolean> | null): Promise<TryCatchResult<T>>;
export declare function tryCatch<T>(task: () => T | Promise<T>, sendLoading?: Ref<boolean> | null): Promise<TryCatchResult<T>>;
/**
 * 防抖函数返回值类型。
 */
type DebouncedFunction<T extends Func> = ((...args: Parameters<T>) => Promise<Awaited<ReturnType<T>>>) & {
    cancel: () => void;
};
/**
 * 创建防抖函数。
 *
 * @param func 需要防抖执行的函数。
 * @param delay 延迟时间，单位毫秒，默认 `500`。
 * @param immediate 是否在第一次调用时立即执行。
 * @param resultCallback 每次真正执行后触发的结果回调。
 * @returns 带 `cancel()` 方法的防抖函数。
 *
 * @example
 * const search = debounce((keyword: string) => {
 *   return keyword.trim()
 * }, 300)
 *
 * await search('sybz')
 */
export declare function debounce<T extends Func>(func: T, delay?: number, immediate?: boolean, resultCallback?: (result: ReturnType<T>) => void): DebouncedFunction<T>;
/**
 * 打开确认框。
 *
 * 相比直接调用 `ElMessageBox.confirm`，这里额外处理了默认参数、嵌套弹窗挂载点和 `appContext`。
 *
 * @param message 确认框内容，支持字符串、VNode 或渲染函数。
 * @param options MessageBox 配置项。
 * @param appContext 可选的 Vue 应用上下文。
 * @returns `ElMessageBox.confirm` 返回的 Promise。
 *
 * @example
 * await confirm('确定删除吗？')
 *
 * @example
 * await confirm('确认提交？', {
 *   showCancelButton: true,
 *   appendTo: '#dialogRoot',
 * })
 */
export declare function confirm(message: ConfirmMessage, options?: ConfirmOptions, appContext?: AppContext | null): Promise<import("element-plus").MessageBoxData>;
/**
 * 读取根节点上的 CSS 自定义变量。
 *
 * @param propertyName CSS 变量名，例如 `--blue`。
 * @returns CSS 变量的值。
 *
 * @example
 * getVariable('--vp-c-brand-1')
 */
export declare function getVariable(propertyName: string, fallback?: string): string;
/**
 * 返回当前 @sybz-components/utils 包的构建时间。
 *
 * @returns 构建时间字符串。
 *
 * @example
 * getUtilsBuildTime()
 */
export declare function getUtilsBuildTime(fallback?: string): string;
/**
 * 返回当前 utils 包的构建时间。
 *
 * @returns 构建时间字符串。
 *
 * @example
 * test()
 */
export declare function test(): string;
export {};
