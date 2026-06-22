declare const SDrawer: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
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
    }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "update:modelValue": (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
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
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
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
    }, {}, {}, {}, {}, {
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
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, {
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
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        header?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        footer?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SDrawer;
