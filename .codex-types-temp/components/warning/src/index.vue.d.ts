interface Props {
    content: string;
    title?: string;
    theme?: '' | 'chenghua';
    type?: 'info' | 'simple' | 'warning' | 'error';
    width?: string | number;
    dangerouslyUseHTMLString?: boolean;
    icon?: boolean;
    size?: 'small' | 'default';
    dotted?: boolean;
    customStyle?: Record<string, any>;
    iconAttrs?: Record<string, any>;
    left?: boolean | number | string;
}
declare var __VLS_11: {}, __VLS_13: {};
type __VLS_Slots = {} & {
    title?: (props: typeof __VLS_11) => any;
} & {
    content?: (props: typeof __VLS_13) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<Props>, {
    title: string;
    theme: string;
    type: string;
    width: string;
    dangerouslyUseHTMLString: boolean;
    icon: boolean;
    size: string;
    dotted: boolean;
    customStyle: () => {};
    iconAttrs: () => {};
    left: boolean;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<Props>, {
    title: string;
    theme: string;
    type: string;
    width: string;
    dangerouslyUseHTMLString: boolean;
    icon: boolean;
    size: string;
    dotted: boolean;
    customStyle: () => {};
    iconAttrs: () => {};
    left: boolean;
}>>>, {
    size: "small" | "default";
    type: "error" | "info" | "warning" | "simple";
    title: string;
    width: string | number;
    left: string | number | boolean;
    dangerouslyUseHTMLString: boolean;
    icon: boolean;
    theme: "" | "chenghua";
    customStyle: {};
    iconAttrs: {};
    dotted: boolean;
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
