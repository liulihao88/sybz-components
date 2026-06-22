/**
 * `formatBytes` 的配置项。
 */
export interface FormatBytesOptions {
    /**
     * 小数位数，默认 `2`。
     */
    digit?: number;
    /**
     * 是否加千分位，默认 `false`。
     */
    thousands?: boolean;
    /**
     * 文本前缀，例如 `$`。
     */
    prefix?: string;
    /**
     * 文本后缀，例如 `/s`。
     */
    suffix?: string;
    /**
     * 取整方式，默认 `floor`。
     */
    roundType?: 'floor' | 'ceil' | 'round';
}
/**
 * `formatBytesConvert` 的配置项。
 */
export interface FormatBytesConvertOptions {
    /**
     * 是否使用千分位输出。
     */
    thounsands?: boolean;
    /**
     * 保留小数位数。
     */
    digit?: number;
}
/**
 * `formatImg` 的配置项。
 */
export interface FormatImgOptions {
    /**
     * 静态资源根目录，默认 `assets/images`。
     */
    basePath?: string;
}
/**
 * `formatToFixed` 的配置项。
 */
export interface FormatToFixedOptions {
    /**
     * 小数位数，默认 `2`。
     */
    digit?: number;
    /**
     * 文本前缀，例如 `$`。
     */
    prefix?: string;
    /**
     * 文本后缀，例如 `%`。
     */
    suffix?: string;
    /**
     * 是否保留原单位，默认 `true`。
     */
    unit?: boolean;
    /**
     * 是否添加千分位，默认 `false`。
     */
    thousands?: boolean;
}
export type FormatTimeInput = Date | string | number;
export type FormatTimeFallback = string | ((time: FormatTimeInput) => string);
/**
 * 将字节数格式化成更易读的单位字符串。
 *
 * @param bytes 字节数，支持数字和数字字符串。
 * @param options 配置项。
 * @returns 格式化后的字节字符串；如果输入不是合法数字，则原样返回。
 *
 * @example
 * formatBytes(1024)
 * // => '1.00 KB'
 *
 * @example
 * formatBytes(1040000, {
 *   digit: 3,
 *   prefix: '$',
 *   suffix: '/s',
 *   roundType: 'round',
 *   thousands: true,
 * })
 * // => '$1,015.625 KB/s'
 */
export declare function formatBytes(bytes: number | string, options?: FormatBytesOptions): string | number;
/**
 * 将带单位的字节字符串转换为原始字节数。
 *
 * @param oBytes 字节字符串，例如 `1.5GB`、`1,024 KB`，也支持纯数字。
 * @param options 配置项。
 * @returns 字节数；如启用了 `digit` 或 `thounsands`，返回格式化后的字符串。
 *
 * @example
 * formatBytesConvert('0.5GB')
 * // => 536870912
 *
 * @example
 * formatBytesConvert('1,234 GB', { thounsands: true })
 * // => '1,324,997,410,816'
 */
export declare function formatBytesConvert(oBytes: unknown, options?: FormatBytesConvertOptions): string | number | undefined;
/**
 * 为数字或数字字符串添加千分位分隔符。
 *
 * @param value 需要格式化的值。
 * @returns 添加千分位后的字符串；如果不符合规则则原样返回。
 *
 * @example
 * formatThousands(1234567)
 * // => '1,234,567'
 *
 * @example
 * formatThousands('1234.12MB')
 * // => '1,234.12MB'
 */
export declare function formatThousands(value: string | number): string | number;
/**
 * 将时间值格式化为指定模板字符串。
 *
 * 支持 `Date`、毫秒时间戳、秒级时间戳、ISO 字符串和普通日期字符串。
 * 纯日期字符串（如 `2022-03-04`）会按本地时区的 `00:00:00` 解析。
 *
 * @param time 时间值，默认当前时间。
 * @param cFormat 格式模板，默认 `{y}-{m}-{d} {h}:{i}:{s}`。
 * @param fallback 非法日期时的兜底返回值，默认返回原始输入。
 * @returns 格式化后的时间字符串。
 *
 * @example
 * formatTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
 *
 * @example
 * formatTime(1713926400, '{y}/{m}/{d}')
 * // => '2024/04/24'
 */
export declare function formatTime(time?: FormatTimeInput, cFormat?: string, fallback?: FormatTimeFallback): string;
/**
 * 将持续时间时间戳格式化为“天 / 时 / 分 / 秒”文本。
 *
 * @param timestamp 持续时间，单位毫秒。
 * @param cFormat 输出模板，默认 `{d}天{h}时{i}分{s}秒`。
 * @returns 格式化后的持续时间文本。
 *
 * @example
 * formatDurationTime(1162821)
 * // => '19分24秒'
 *
 * @example
 * formatDurationTime(5 * 60 * 1000, '{i}分{s}秒')
 * // => '05分00秒'
 */
export declare function formatDurationTime(timestamp: number, cFormat?: string): string;
/**
 * 获取 `assets` 目录下的静态资源地址。
 *
 * @param photoName 文件名；未带后缀时会自动补 `.png`。
 * @param addPath 额外子目录，例如 `menu`。
 * @param options 配置项。
 * @returns 静态资源的完整 URL；如果本身已是 `http/https` 地址，则原样返回。
 *
 * @example
 * formatImg('logo')
 *
 * @example
 * formatImg('avatar.png', 'user')
 */
export declare function formatImg(photoName: string, addPath?: string, { basePath }?: FormatImgOptions): string;
/**
 * 按指定小数位格式化数字，并可附带前后缀、单位和千分位。
 *
 * @param value 需要格式化的值。
 * @param options 小数位数或配置项。
 * @returns 格式化后的字符串。
 *
 * @example
 * formatToFixed('22.1', 2)
 * // => '22.10'
 *
 * @example
 * formatToFixed('22 TB', { digit: 2, unit: false, prefix: '$' })
 * // => '$22.00'
 */
export declare function formatToFixed(value: unknown, options?: FormatToFixedOptions | number): string;
/**
 * 将纯文本中的换行和制表符转换成可直接渲染的 HTML 片段。
 *
 * @param str 需要格式化的文本。
 * @returns 字符串输入会返回转换后的 HTML；非字符串输入会原样返回。
 *
 * @example
 * formatTextToHtml('第1行\n\t第2行')
 * // => '第1行<br>&nbsp;&nbsp;&nbsp;&nbsp;第2行'
 */
export declare function formatTextToHtml(str: string): string;
export declare function formatTextToHtml<T>(str: T): T;
