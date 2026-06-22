type __VLS_Props = {
    description?: string;
    theme?: '' | 'chenghua';
    width?: string | number;
    height?: string | number;
    imgAttrs?: Record<string, any>;
    src?: string;
};
declare var __VLS_9: {}, __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
    image?: (props: typeof __VLS_9) => any;
} & {
    description?: (props: typeof __VLS_12) => any;
} & {
    default?: (props: typeof __VLS_14) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<__VLS_Props>, {
    description: string;
    theme: string;
    width: number;
    src: string;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<__VLS_Props>, {
    description: string;
    theme: string;
    width: number;
    src: string;
}>>>, {
    width: string | number;
    src: string;
    description: string;
    theme: "" | "chenghua";
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
