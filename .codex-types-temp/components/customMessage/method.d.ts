import type { CreateMessageProps, MessageContext } from './types';
export declare const createMessage: (props: CreateMessageProps) => {
    id: string;
    vnode: import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
        [key: string]: any;
    }>;
    vm: import("vue").ComponentInternalInstance;
    props: {
        id: string;
        zIndex: number;
        onDestory: () => void;
        type?: "info" | "success" | "warning" | "danger";
        offset?: number;
        message?: string | import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
            [key: string]: any;
        }>;
        duration?: number;
        showClose?: boolean;
        transitionName?: string;
    };
    destory: () => void;
};
export declare const getLastInstance: () => MessageContext;
export declare const getLastBottomOffset: (id: string) => any;
export declare const closeAll: () => void;
