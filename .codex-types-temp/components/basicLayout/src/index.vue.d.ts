declare var __VLS_1: {}, __VLS_9: {}, __VLS_17: {}, __VLS_19: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_1) => any;
} & {
    icon?: (props: typeof __VLS_9) => any;
} & {
    default?: (props: typeof __VLS_17) => any;
} & {
    footer?: (props: typeof __VLS_19) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    boxStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    headerStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    bodyStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    footerStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    scroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapsible: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapseTrigger: {
        type: StringConstructor;
        default: string;
        validator: (value: unknown) => boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    boxStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    headerStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    bodyStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    footerStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    scroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    square: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapsible: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapseTrigger: {
        type: StringConstructor;
        default: string;
        validator: (value: unknown) => boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    size: string;
    title: string;
    scroll: boolean;
    border: boolean;
    theme: string;
    modelValue: boolean;
    boxStyle: Record<string, any>;
    headerStyle: Record<string, any>;
    bodyStyle: Record<string, any>;
    footerStyle: Record<string, any>;
    square: boolean;
    collapsible: boolean;
    collapseTrigger: string;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
