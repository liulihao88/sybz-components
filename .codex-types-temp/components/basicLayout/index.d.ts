declare const SBasicLayout: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
    }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, {}, {}, {}, {
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, {
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
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        header?: (props: {}) => any;
    } & {
        icon?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        footer?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SBasicLayout;
