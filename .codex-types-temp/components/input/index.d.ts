declare const SInput: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
    }>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
    }>>, {}, {}, {}, {}, {
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
}>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
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
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    } & {
        prefix?: (props: {}) => any;
    } & {
        suffix?: (props: {}) => any;
    } & {
        append?: (props: {}) => any;
    } & {
        prepend?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SInput;
