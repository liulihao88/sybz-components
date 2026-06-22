declare const SItem: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: (NumberConstructor | StringConstructor)[];
            required: true;
        };
        value: {
            type: (NumberConstructor | StringConstructor)[];
            required: true;
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        height: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        labelStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        valueStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        itemStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        imgStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        boxStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        type: {
            type: StringConstructor;
            default: string;
            validator: (value: unknown) => boolean;
        };
        attrs: {
            type: ObjectConstructor;
            default: () => void;
        };
    }>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: (NumberConstructor | StringConstructor)[];
            required: true;
        };
        value: {
            type: (NumberConstructor | StringConstructor)[];
            required: true;
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        height: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        labelStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        valueStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        itemStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        imgStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        boxStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        type: {
            type: StringConstructor;
            default: string;
            validator: (value: unknown) => boolean;
        };
        attrs: {
            type: ObjectConstructor;
            default: () => void;
        };
    }>>, {
        type: string;
        attrs: Record<string, any>;
        width: string | number;
        height: string | number;
        src: string;
        boxStyle: Record<string, any>;
        labelStyle: Record<string, any>;
        valueStyle: Record<string, any>;
        itemStyle: Record<string, any>;
        imgStyle: Record<string, any>;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        src: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: (NumberConstructor | StringConstructor)[];
            required: true;
        };
        value: {
            type: (NumberConstructor | StringConstructor)[];
            required: true;
        };
        width: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        height: {
            type: (NumberConstructor | StringConstructor)[];
            default: string;
        };
        labelStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        valueStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        itemStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        imgStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        boxStyle: {
            type: ObjectConstructor;
            default: () => {};
        };
        type: {
            type: StringConstructor;
            default: string;
            validator: (value: unknown) => boolean;
        };
        attrs: {
            type: ObjectConstructor;
            default: () => void;
        };
    }>>, {}, {}, {}, {}, {
        type: string;
        attrs: Record<string, any>;
        width: string | number;
        height: string | number;
        src: string;
        boxStyle: Record<string, any>;
        labelStyle: Record<string, any>;
        valueStyle: Record<string, any>;
        itemStyle: Record<string, any>;
        imgStyle: Record<string, any>;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    src: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    value: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    labelStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    valueStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    itemStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    imgStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    boxStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    type: {
        type: StringConstructor;
        default: string;
        validator: (value: unknown) => boolean;
    };
    attrs: {
        type: ObjectConstructor;
        default: () => void;
    };
}>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    type: string;
    attrs: Record<string, any>;
    width: string | number;
    height: string | number;
    src: string;
    boxStyle: Record<string, any>;
    labelStyle: Record<string, any>;
    valueStyle: Record<string, any>;
    itemStyle: Record<string, any>;
    imgStyle: Record<string, any>;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        img?: (props: {}) => any;
    } & {
        label?: (props: {}) => any;
    } & {
        value?: (props: {}) => any;
    } & {
        value?: (props: {}) => any;
    } & {
        label?: (props: {}) => any;
    } & {
        img?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SItem;
