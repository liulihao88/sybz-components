declare const SPopconfirm: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: number;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
        reConfirm: {
            type: BooleanConstructor;
            default: boolean;
        };
        dangerouslyUseHTMLString: {
            type: BooleanConstructor;
            default: boolean;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
    }>> & {
        onConfirm?: (...args: any[]) => any;
        onCancel?: (...args: any[]) => any;
    }, {
        close: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        confirm: (...args: any[]) => void;
        cancel: (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: number;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
        reConfirm: {
            type: BooleanConstructor;
            default: boolean;
        };
        dangerouslyUseHTMLString: {
            type: BooleanConstructor;
            default: boolean;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
    }>> & {
        onConfirm?: (...args: any[]) => any;
        onCancel?: (...args: any[]) => any;
    }, {
        content: string;
        title: string;
        reConfirm: boolean;
        width: string | number;
        dangerouslyUseHTMLString: boolean;
        theme: string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: number;
        };
        content: {
            type: StringConstructor;
            default: string;
        };
        reConfirm: {
            type: BooleanConstructor;
            default: boolean;
        };
        dangerouslyUseHTMLString: {
            type: BooleanConstructor;
            default: boolean;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
    }>> & {
        onConfirm?: (...args: any[]) => any;
        onCancel?: (...args: any[]) => any;
    }, {
        close: () => void;
    }, {}, {}, {}, {
        content: string;
        title: string;
        reConfirm: boolean;
        width: string | number;
        dangerouslyUseHTMLString: boolean;
        theme: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    reConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}>> & {
    onConfirm?: (...args: any[]) => any;
    onCancel?: (...args: any[]) => any;
}, {
    close: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    confirm: (...args: any[]) => void;
    cancel: (...args: any[]) => void;
}, string, {
    content: string;
    title: string;
    reConfirm: boolean;
    width: string | number;
    dangerouslyUseHTMLString: boolean;
    theme: string;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        content?: (props: {}) => any;
    } & {
        footer?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SPopconfirm;
