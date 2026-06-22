declare var __VLS_10: {}, __VLS_12: {}, __VLS_14: {}, __VLS_17: {};
type __VLS_Slots = {} & {
    headerIcon?: (props: typeof __VLS_10) => any;
} & {
    header?: (props: typeof __VLS_12) => any;
} & {
    default?: (props: typeof __VLS_14) => any;
} & {
    footer?: (props: typeof __VLS_17) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    cancel: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    showFooter: {
        type: BooleanConstructor;
        default: any;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    showConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirmAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    cancelAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    enableConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirm: {
        type: FunctionConstructor;
    };
    fillSlot: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideHeaderIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
    cancel: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    showFooter: {
        type: BooleanConstructor;
        default: any;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    showConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirmAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    cancelAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    enableConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirm: {
        type: FunctionConstructor;
    };
    fillSlot: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideHeaderIcon: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    type: string;
    title: string;
    width: string | number;
    cancel: string | Function;
    theme: string;
    showConfirm: boolean;
    showFooter: boolean;
    cancelText: string;
    confirmText: string;
    showCancel: boolean;
    confirmAttrs: Record<string, any>;
    cancelAttrs: Record<string, any>;
    enableConfirm: boolean;
    fillSlot: boolean;
    hideHeaderIcon: boolean;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
