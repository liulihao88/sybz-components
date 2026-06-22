import type { MessageProps } from './types';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<MessageProps>, {
    type: string;
    duration: number;
    offset: number;
    transitionName: string;
}>, {
    bottomOffset: import("vue").ComputedRef<any>;
    visible: import("vue").Ref<boolean>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<MessageProps>, {
    type: string;
    duration: number;
    offset: number;
    transitionName: string;
}>>>, {
    type: "info" | "success" | "warning" | "danger";
    offset: number;
    duration: number;
    transitionName: string;
}, {}>, {
    default?: (props: {}) => any;
}>;
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
