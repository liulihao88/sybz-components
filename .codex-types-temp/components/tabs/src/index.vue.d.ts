declare var __VLS_7: {}, __VLS_17: string, __VLS_18: {}, __VLS_21: any, __VLS_22: {};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_17>]?: (props: typeof __VLS_18) => any;
} & {
    [K in NonNullable<typeof __VLS_21>]?: (props: typeof __VLS_22) => any;
} & {
    default?: (props: typeof __VLS_7) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    modelValue: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
        required: true;
    };
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    subAttrs: {
        type: ObjectConstructor;
        default: () => void;
    };
    trigger: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
        required: true;
    };
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    subAttrs: {
        type: ObjectConstructor;
        default: () => void;
    };
    trigger: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    size: string;
    label: string;
    trigger: string;
    value: string;
    theme: string;
    subAttrs: Record<string, any>;
    options: unknown[];
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
