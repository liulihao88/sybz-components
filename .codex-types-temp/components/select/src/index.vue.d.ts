declare var __VLS_24: {}, __VLS_27: any, __VLS_31: string | number, __VLS_32: {
    index: number;
}, __VLS_56: {
    options: unknown[];
    item: unknown;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_31>]?: (props: typeof __VLS_32) => any;
} & {
    prefix?: (props: typeof __VLS_24) => any;
} & {
    label?: (props: typeof __VLS_27) => any;
} & {
    default?: (props: typeof __VLS_56) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    modelValue: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPrefix: {
        type: BooleanConstructor;
        default: boolean;
    };
    showQuick: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    connect: {
        type: StringConstructor;
        default: string;
    };
    customLabel: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    disPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    itemDisabled: {
        type: FunctionConstructor;
        default: () => void;
    };
    url: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    urlParams: {
        type: ObjectConstructor;
        default: () => void;
    };
    optionsExpression: {
        type: StringConstructor;
        default: string;
    };
    emptyColor: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    tooltipAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    changeSelect: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: (StringConstructor | ArrayConstructor)[];
        default: string;
    };
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    multiple: {
        type: BooleanConstructor;
        default: boolean;
    };
    showAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    showPrefix: {
        type: BooleanConstructor;
        default: boolean;
    };
    showQuick: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    connect: {
        type: StringConstructor;
        default: string;
    };
    customLabel: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    disPlaceholder: {
        type: StringConstructor;
        default: string;
    };
    itemDisabled: {
        type: FunctionConstructor;
        default: () => void;
    };
    url: {
        type: (StringConstructor | FunctionConstructor)[];
        default: string;
    };
    urlParams: {
        type: ObjectConstructor;
        default: () => void;
    };
    optionsExpression: {
        type: StringConstructor;
        default: string;
    };
    emptyColor: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTooltip: {
        type: BooleanConstructor;
        default: boolean;
    };
    tooltipAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onChange?: (...args: any[]) => any;
    "onUpdate:modelValue"?: (...args: any[]) => any;
    onChangeSelect?: (...args: any[]) => any;
}, {
    multiple: boolean;
    size: string;
    type: string;
    title: string;
    width: string | number;
    label: string | unknown[];
    height: string | number;
    value: string;
    connect: string;
    dangerouslyUseHTMLString: boolean;
    theme: string;
    url: string | Function;
    tooltipAttrs: Record<string, any>;
    options: unknown[];
    showAll: boolean;
    customLabel: string | Function;
    showPrefix: boolean;
    disPlaceholder: string;
    itemDisabled: Function;
    showQuick: boolean;
    urlParams: Record<string, any>;
    optionsExpression: string;
    emptyColor: boolean;
    showTooltip: boolean;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
