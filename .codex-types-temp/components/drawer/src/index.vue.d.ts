declare var __VLS_10: {}, __VLS_18: {}, __VLS_20: {};
type __VLS_Slots = {} & {
    header?: (props: typeof __VLS_10) => any;
} & {
    default?: (props: typeof __VLS_18) => any;
} & {
    footer?: (props: typeof __VLS_20) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    showFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    showConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrapperClosable: {
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
    detailAttrs: {
        type: ObjectConstructor;
        default: () => void;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    showFooter: {
        type: BooleanConstructor;
        default: boolean;
    };
    showConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCancel: {
        type: BooleanConstructor;
        default: boolean;
    };
    wrapperClosable: {
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
    detailAttrs: {
        type: ObjectConstructor;
        default: () => void;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    type: string;
    showConfirm: boolean;
    showFooter: boolean;
    cancelText: string;
    confirmText: string;
    showCancel: boolean;
    confirmAttrs: Record<string, any>;
    cancelAttrs: Record<string, any>;
    wrapperClosable: boolean;
    detailAttrs: Record<string, any>;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
