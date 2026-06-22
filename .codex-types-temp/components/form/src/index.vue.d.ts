export interface FormSelfProps {
    fieldList: Record<string, any>;
    model: Record<string, any>;
    showFooter: boolean;
    column: 1 | 2 | 3 | 4 | 5 | 6;
    align: 'center' | 'top' | 'flex-end';
}
declare function validate(isResetFields?: boolean, otherParams?: {}): Promise<void>;
declare function resetFields(): void;
declare function clearValidate(): void;
declare var __VLS_22: string, __VLS_23: {
    item: any;
}, __VLS_36: any, __VLS_37: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_22>]?: (props: typeof __VLS_23) => any;
} & {
    [K in NonNullable<typeof __VLS_36>]?: (props: typeof __VLS_37) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<FormSelfProps>, {
    showFooter: boolean;
    column: number;
    align: string;
}>, {
    validate: typeof validate;
    clearValidate: typeof clearValidate;
    resetFields: typeof resetFields;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<FormSelfProps>, {
    showFooter: boolean;
    column: number;
    align: string;
}>>>, {
    column: 1 | 6 | 5 | 2 | 3 | 4;
    align: "top" | "center" | "flex-end";
    showFooter: boolean;
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
