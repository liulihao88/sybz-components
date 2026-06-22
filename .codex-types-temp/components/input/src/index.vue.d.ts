declare var __VLS_28: {}, __VLS_31: {}, __VLS_34: {}, __VLS_37: {}, __VLS_40: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_28) => any;
} & {
    prefix?: (props: typeof __VLS_31) => any;
} & {
    suffix?: (props: typeof __VLS_34) => any;
} & {
    append?: (props: typeof __VLS_37) => any;
} & {
    prepend?: (props: typeof __VLS_40) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    modelValue: {
        required: true;
    };
    boxStyle: {
        type: ObjectConstructor;
        default: () => void;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    maxlength: {
        type: (NumberConstructor | StringConstructor)[];
    };
    hideMaxLengthError: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxLengthErrorText: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    showWordLimit: {
        type: (BooleanConstructor | StringConstructor)[];
        default: string;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    disPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    subAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    tooltipAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    iconAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    hideTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: ArrayConstructor;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        required: true;
    };
    boxStyle: {
        type: ObjectConstructor;
        default: () => void;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    maxlength: {
        type: (NumberConstructor | StringConstructor)[];
    };
    hideMaxLengthError: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxLengthErrorText: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    showWordLimit: {
        type: (BooleanConstructor | StringConstructor)[];
        default: string;
    };
    block: {
        type: BooleanConstructor;
        default: boolean;
    };
    disPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    subAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    tooltipAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    iconAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    hideTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: ArrayConstructor;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    size: string;
    content: string;
    width: string | number;
    height: string | number;
    block: boolean;
    dangerouslyUseHTMLString: boolean;
    theme: string;
    tooltipAttrs: Record<string, any>;
    boxStyle: Record<string, any>;
    subAttrs: Record<string, any>;
    iconAttrs: Record<string, any>;
    hideMaxLengthError: boolean;
    maxLengthErrorText: string;
    showWordLimit: string | boolean;
    disPlaceholder: string;
    hideTooltip: boolean;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
