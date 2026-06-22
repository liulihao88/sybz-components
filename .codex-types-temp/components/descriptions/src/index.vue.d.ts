import { VNode } from 'vue';
type DescriptionsProps = {
    options: ItemOptions[];
    theme: '' | 'chenghua';
    column: number;
    labelWidth: any;
    showAll: boolean;
};
type ItemOptions = {
    label: string;
    value: any;
    labelSlot?: string;
    valueSlot?: string;
    labelRender?: (item: any) => VNode | string;
    render?: (item: any) => VNode | string;
    filter?: (value: any) => any;
    attrs?: Record<string, any>;
    labelAttrs?: Record<string, any>;
    valueAttrs?: Record<string, any>;
};
declare var __VLS_8: {}, __VLS_23: string, __VLS_24: {
    item: ItemOptions;
    label: string;
    value: any;
    index: number;
}, __VLS_37: string, __VLS_38: {
    item: ItemOptions;
    label: string;
    value: any;
    index: number;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_23>]?: (props: typeof __VLS_24) => any;
} & {
    [K in NonNullable<typeof __VLS_37>]?: (props: typeof __VLS_38) => any;
} & {
    default?: (props: typeof __VLS_8) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<DescriptionsProps>, {
    theme: string;
    column: number;
    labelWidth: string;
    showAll: boolean;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<DescriptionsProps>, {
    theme: string;
    column: number;
    labelWidth: string;
    showAll: boolean;
}>>>, {
    column: number;
    theme: "" | "chenghua";
    showAll: boolean;
    labelWidth: any;
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
