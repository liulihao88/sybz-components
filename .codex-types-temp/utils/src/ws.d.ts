type Timeout = ReturnType<typeof setTimeout>;
type Interval = ReturnType<typeof setInterval>;
type Nullable<T> = T | null;
/**
 * WebSocket 自动重连配置。
 */
export interface WSAutoReconnectOptions {
    /**
     * 最大重连次数，默认 `3`。
     */
    reconnectMaxCount?: number;
}
/**
 * WebSocket 心跳配置。
 */
export interface WSHeartbeatOptions {
    /**
     * 心跳消息内容，默认 `ping`。
     */
    message: string;
    /**
     * 心跳间隔，单位毫秒，默认 `3000`。
     */
    interval: number;
}
/**
 * `WS` 构造函数可选配置。
 */
export interface WSOptions {
    /**
     * 是否自动重连。
     *
     * - `true`: 使用默认重连策略
     * - `false`: 不自动重连
     * - 对象: 自定义重连次数
     */
    autoReconnect: boolean | WSAutoReconnectOptions;
    /**
     * 是否开启心跳。
     *
     * - `false`: 不发送心跳
     * - `true`: 使用默认心跳策略
     * - 对象: 自定义心跳内容和间隔
     */
    heartbeat: boolean | WSHeartbeatOptions;
    /**
     * 需要拼接到 url 上的查询参数。
     */
    query: Record<string, string>;
}
/**
 * WebSocket 轻量封装，支持自动连接、自动重连、心跳和 query 参数。
 *
 * @example
 * const ws = new WS('wss://example.com/ws', {
 *   autoReconnect: true,
 *   heartbeat: { message: 'ping', interval: 3000 },
 *   query: { token: 'demo-token' },
 * })
 *
 * ws.onMessage((message) => {
 *   console.log(message)
 * })
 *
 * ws.send('hello')
 */
export declare class WS {
    url: string;
    socket: WebSocket | null;
    reconnectCount: number;
    delay: Nullable<Timeout>;
    timer: Nullable<Interval>;
    autoReconnect: WSOptions['autoReconnect'];
    heartbeat: WSOptions['heartbeat'];
    query: WSOptions['query'];
    /**
     * 创建并立即连接一个 WebSocket 实例。
     *
     * @param url WebSocket 地址，例如 `wss://example.com/ws`。
     * @param options 连接配置，支持重连、心跳和 query 参数。
     *
     * @example
     * const ws = new WS('wss://example.com/ws', {
     *   autoReconnect: { reconnectMaxCount: 5 },
     *   heartbeat: { message: 'ping', interval: 5000 },
     *   query: { token: 'abc123' },
     * })
     */
    constructor(url?: string, options?: WSOptions);
    /**
     * 主动发起连接。
     *
     * 调用时会先关闭旧连接，再创建新的 WebSocket 实例。
     *
     * @example
     * const ws = new WS('wss://example.com/ws')
     * ws.connect()
     */
    connect(): void;
    /**
     * 注册连接成功后的处理逻辑，并在需要时开启心跳。
     *
     * @example
     * const ws = new WS('wss://example.com/ws')
     * ws.onOpen()
     */
    onOpen(): void;
    /**
     * 开启心跳发送。
     *
     * @example
     * const ws = new WS('wss://example.com/ws', {
     *   heartbeat: { message: 'ping', interval: 3000 },
     * })
     * ws.startHeartbeat()
     */
    startHeartbeat(): void;
    /**
     * 注册错误处理和自动重连逻辑。
     *
     * @example
     * const ws = new WS('wss://example.com/ws', { autoReconnect: true })
     * ws.onError()
     */
    onError(): void;
    /**
     * 关闭连接并清理相关定时器。
     *
     * @example
     * ws.close()
     */
    close(): void;
    /**
     * 监听服务端消息。
     *
     * 内部会优先尝试将消息解析为 JSON；解析失败时会回传原始 `MessageEvent`。
     *
     * @param callback 接收到消息时触发的回调。
     *
     * @example
     * ws.onMessage((message) => {
     *   console.log(message)
     * })
     */
    onMessage(callback: (data: unknown) => any): void;
    /**
     * 发送消息。
     *
     * - 如果连接已就绪，会立即发送
     * - 如果正在连接，会延迟发送
     * - 如果连接已关闭，会先重新连接再发送
     *
     * @param data 需要发送的消息内容。
     *
     * @example
     * ws.send('hello')
     *
     * @example
     * ws.send(JSON.stringify({ type: 'ping' }))
     */
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
}
export {};
