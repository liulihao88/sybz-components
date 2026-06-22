declare const SSelect: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
    }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        change: (...args: any[]) => void;
        "update:modelValue": (...args: any[]) => void;
        changeSelect: (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, {}, {}, {}, {
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
    changeSelect: (...args: any[]) => void;
}, string, {
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
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: (props: {
            index: number;
        }) => any;
        [x: number]: (props: {
            index: number;
        }) => any;
    } & {
        prefix?: (props: {}) => any;
    } & {
        label?: (props: any) => any;
    } & {
        default?: (props: {
            options: unknown[];
            item: unknown;
        }) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SSelect;
