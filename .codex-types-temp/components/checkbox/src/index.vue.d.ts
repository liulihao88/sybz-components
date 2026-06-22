declare var __VLS_17: {}, __VLS_26: any, __VLS_27: any;
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_26>]?: (props: typeof __VLS_27) => any;
} & {
    default?: (props: typeof __VLS_17) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
    };
    options: {
        type: ObjectConstructor;
        default: () => any[];
    };
    showType: {
        type: StringConstructor;
        validator: (value: string) => boolean;
        default: string;
    };
    modelValue: {
        type: ArrayConstructor;
        defalut: () => any[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    attrs: {
        type: ObjectConstructor;
        default: () => void;
    };
    customDisabled: {
        type: FunctionConstructor;
        default: () => void;
    };
    customLabel: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    gap: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: string;
    };
    options: {
        type: ObjectConstructor;
        default: () => any[];
    };
    showType: {
        type: StringConstructor;
        validator: (value: string) => boolean;
        default: string;
    };
    modelValue: {
        type: ArrayConstructor;
        defalut: () => any[];
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    attrs: {
        type: ObjectConstructor;
        default: () => void;
    };
    customDisabled: {
        type: FunctionConstructor;
        default: () => void;
    };
    customLabel: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    gap: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    type: string;
    attrs: Record<string, any>;
    label: string;
    value: string;
    gap: string | number;
    theme: string;
    options: Record<string, any>;
    showType: string;
    showAll: boolean;
    customDisabled: Function;
    customLabel: string | Function;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
