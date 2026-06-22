declare const SInputNumber: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        boxStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        height: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        subAttrs: {
            type: ObjectConstructor;
            default: () => {};
        };
    }>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
            default: string;
        };
        boxStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        height: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        subAttrs: {
            type: ObjectConstructor;
            default: () => {};
        };
    }>>, {
        size: string;
        title: string;
        width: string | number;
        height: string | number;
        theme: string;
        boxStyle: Record<string, any>;
        subAttrs: Record<string, any>;
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
        boxStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        height: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        size: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        subAttrs: {
            type: ObjectConstructor;
            default: () => {};
        };
    }>>, {}, {}, {}, {}, {
        size: string;
        title: string;
        width: string | number;
        height: string | number;
        theme: string;
        boxStyle: Record<string, any>;
        subAttrs: Record<string, any>;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    boxStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    subAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    size: string;
    title: string;
    width: string | number;
    height: string | number;
    theme: string;
    boxStyle: Record<string, any>;
    subAttrs: Record<string, any>;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: (props: any) => any;
        [x: number]: (props: any) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SInputNumber;
