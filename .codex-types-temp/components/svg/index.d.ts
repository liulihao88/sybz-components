declare const SSvg: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        prefix: {
            type: StringConstructor;
            default: string;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
        color: {
            type: StringConstructor;
        };
        customStyle: {
            type: ObjectConstructor;
            default: () => void;
        };
        size: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
    }>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        prefix: {
            type: StringConstructor;
            default: string;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
        color: {
            type: StringConstructor;
        };
        customStyle: {
            type: ObjectConstructor;
            default: () => void;
        };
        size: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
    }>>, {
        size: string | number;
        prefix: string;
        customStyle: Record<string, any>;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        prefix: {
            type: StringConstructor;
            default: string;
        };
        name: {
            type: StringConstructor;
            required: true;
        };
        color: {
            type: StringConstructor;
        };
        customStyle: {
            type: ObjectConstructor;
            default: () => void;
        };
        size: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
    }>>, {}, {}, {}, {}, {
        size: string | number;
        prefix: string;
        customStyle: Record<string, any>;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    prefix: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
    };
    customStyle: {
        type: ObjectConstructor;
        default: () => void;
    };
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    size: string | number;
    prefix: string;
    customStyle: Record<string, any>;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & import("vue").Plugin) & Record<string, any>;
export default SSvg;
