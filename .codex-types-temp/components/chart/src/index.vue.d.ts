type __VLS_Props = {
    width?: string;
    height?: string;
    id?: string;
    option: Record<string, any>;
    theme?: string;
    isEmpty: boolean | ((options: Record<string, any>) => boolean);
    description: string;
};
declare var __VLS_1: {}, __VLS_9: {};
type __VLS_Slots = {} & {
    empty?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_9) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<__VLS_Props>, {
    height: string;
    isEmpty: boolean;
    width: string;
    description: string;
    id: () => string;
}>, {
    initChart: () => void;
    resizeChart: (() => Promise<void>) & {
        cancel: () => void;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    [x: string]: (...args: unknown[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<__VLS_Props>, {
    height: string;
    isEmpty: boolean;
    width: string;
    description: string;
    id: () => string;
}>>>, {
    width: string;
    id: string;
    height: string;
    isEmpty: boolean | ((options: Record<string, any>) => boolean);
    description: string;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<Required<T>[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaultsLocal<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
