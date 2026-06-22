declare const SCheckbox: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
    }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, {}, {}, {}, {
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, {
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
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: (props: any) => any;
        [x: number]: (props: any) => any;
        [x: symbol]: (props: any) => any;
    } & {
        default?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SCheckbox;
