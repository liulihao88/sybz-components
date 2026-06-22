declare const SIcon: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        name: {
            type: StringConstructor;
            required: true;
        };
        color: {
            type: StringConstructor;
        };
        size: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        type: {
            type: StringConstructor;
            default: string;
        };
        svgAttrs: {
            type: ObjectConstructor;
            default: () => {};
        };
        dangerouslyUseHTMLString: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onClick?: (...args: any[]) => any;
    }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        click: (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        name: {
            type: StringConstructor;
            required: true;
        };
        color: {
            type: StringConstructor;
        };
        size: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        type: {
            type: StringConstructor;
            default: string;
        };
        svgAttrs: {
            type: ObjectConstructor;
            default: () => {};
        };
        dangerouslyUseHTMLString: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onClick?: (...args: any[]) => any;
    }, {
        size: string | number;
        disabled: boolean;
        type: string;
        dangerouslyUseHTMLString: boolean;
        svgAttrs: Record<string, any>;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        name: {
            type: StringConstructor;
            required: true;
        };
        color: {
            type: StringConstructor;
        };
        size: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        disabled: {
            type: BooleanConstructor;
            default: boolean;
        };
        type: {
            type: StringConstructor;
            default: string;
        };
        svgAttrs: {
            type: ObjectConstructor;
            default: () => {};
        };
        dangerouslyUseHTMLString: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & {
        onClick?: (...args: any[]) => any;
    }, {}, {}, {}, {}, {
        size: string | number;
        disabled: boolean;
        type: string;
        dangerouslyUseHTMLString: boolean;
        svgAttrs: Record<string, any>;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
    };
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    svgAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: (...args: any[]) => any;
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, {
    size: string | number;
    disabled: boolean;
    type: string;
    dangerouslyUseHTMLString: boolean;
    svgAttrs: Record<string, any>;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        default?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SIcon;
