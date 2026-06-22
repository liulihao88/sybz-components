declare const STabs: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
    }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, {}, {}, {}, {
        size: string;
        label: string;
        trigger: string;
        value: string;
        theme: string;
        subAttrs: Record<string, any>;
        options: unknown[];
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, {
    size: string;
    label: string;
    trigger: string;
    value: string;
    theme: string;
    subAttrs: Record<string, any>;
    options: unknown[];
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: (props: {}) => any;
    } & {
        [x: string]: (props: {}) => any;
        [x: number]: (props: {}) => any;
        [x: symbol]: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default STabs;
