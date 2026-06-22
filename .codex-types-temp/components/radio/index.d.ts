declare const SRadio: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        type: {
            type: StringConstructor;
            validator: (value: string) => boolean;
            default: string;
        };
        showType: {
            type: import("vue").PropType<"button" | "radio">;
            validator: (value: string) => boolean;
            default: string;
        };
        options: {
            type: import("vue").PropType<import("./src/radio").RadioItem[]>;
            default: () => any[];
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        value: {
            type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
            default: string;
        };
        label: {
            type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
            default: string;
        };
        itemDisabled: {
            type: FunctionConstructor;
            default: () => void;
        };
    }>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        title: {
            type: StringConstructor;
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        type: {
            type: StringConstructor;
            validator: (value: string) => boolean;
            default: string;
        };
        showType: {
            type: import("vue").PropType<"button" | "radio">;
            validator: (value: string) => boolean;
            default: string;
        };
        options: {
            type: import("vue").PropType<import("./src/radio").RadioItem[]>;
            default: () => any[];
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        value: {
            type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
            default: string;
        };
        label: {
            type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
            default: string;
        };
        itemDisabled: {
            type: FunctionConstructor;
            default: () => void;
        };
    }>>, {
        type: string;
        label: string | number | boolean;
        border: boolean;
        value: string | number | boolean;
        theme: string;
        options: import("./src/radio").RadioItem[];
        showType: "button" | "radio";
        itemDisabled: Function;
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
        };
        theme: {
            type: StringConstructor;
            default: string;
            validator: (value: string) => boolean;
        };
        type: {
            type: StringConstructor;
            validator: (value: string) => boolean;
            default: string;
        };
        showType: {
            type: import("vue").PropType<"button" | "radio">;
            validator: (value: string) => boolean;
            default: string;
        };
        options: {
            type: import("vue").PropType<import("./src/radio").RadioItem[]>;
            default: () => any[];
        };
        border: {
            type: BooleanConstructor;
            default: boolean;
        };
        value: {
            type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
            default: string;
        };
        label: {
            type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
            default: string;
        };
        itemDisabled: {
            type: FunctionConstructor;
            default: () => void;
        };
    }>>, {}, {}, {}, {}, {
        type: string;
        label: string | number | boolean;
        border: boolean;
        value: string | number | boolean;
        theme: string;
        options: import("./src/radio").RadioItem[];
        showType: "button" | "radio";
        itemDisabled: Function;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    type: {
        type: StringConstructor;
        validator: (value: string) => boolean;
        default: string;
    };
    showType: {
        type: import("vue").PropType<"button" | "radio">;
        validator: (value: string) => boolean;
        default: string;
    };
    options: {
        type: import("vue").PropType<import("./src/radio").RadioItem[]>;
        default: () => any[];
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
        default: string;
    };
    label: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor)[];
        default: string;
    };
    itemDisabled: {
        type: FunctionConstructor;
        default: () => void;
    };
}>>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    type: string;
    label: string | number | boolean;
    border: boolean;
    value: string | number | boolean;
    theme: string;
    options: import("./src/radio").RadioItem[];
    showType: "button" | "radio";
    itemDisabled: Function;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: (props: {
            value: string | number | boolean;
            label: string;
            slot?: string;
            disabled?: boolean;
        } | {
            label: import("./src/radio").RadioItem;
            value: import("./src/radio").RadioItem;
        } | {
            label: boolean;
            value: boolean;
        }) => any;
        [x: number]: (props: {
            value: string | number | boolean;
            label: string;
            slot?: string;
            disabled?: boolean;
        } | {
            label: import("./src/radio").RadioItem;
            value: import("./src/radio").RadioItem;
        } | {
            label: boolean;
            value: boolean;
        }) => any;
        [x: symbol]: (props: {
            value: string | number | boolean;
            label: string;
            slot?: string;
            disabled?: boolean;
        } | {
            label: import("./src/radio").RadioItem;
            value: import("./src/radio").RadioItem;
        } | {
            label: boolean;
            value: boolean;
        }) => any;
    } & {
        default?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SRadio;
