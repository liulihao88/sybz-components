declare const SForm: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        column: {
            type: import("vue").PropType<1 | 6 | 5 | 2 | 3 | 4>;
            required: true;
            default: number;
        };
        align: {
            type: import("vue").PropType<"top" | "center" | "flex-end">;
            required: true;
            default: string;
        };
        showFooter: {
            type: import("vue").PropType<boolean>;
            required: true;
            default: boolean;
        };
        fieldList: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
        model: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
    }>>, {
        validate: (isResetFields?: boolean, otherParams?: {}) => Promise<void>;
        clearValidate: () => void;
        resetFields: () => void;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        column: {
            type: import("vue").PropType<1 | 6 | 5 | 2 | 3 | 4>;
            required: true;
            default: number;
        };
        align: {
            type: import("vue").PropType<"top" | "center" | "flex-end">;
            required: true;
            default: string;
        };
        showFooter: {
            type: import("vue").PropType<boolean>;
            required: true;
            default: boolean;
        };
        fieldList: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
        model: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
    }>>, {
        column: 1 | 6 | 5 | 2 | 3 | 4;
        align: "top" | "center" | "flex-end";
        showFooter: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        column: {
            type: import("vue").PropType<1 | 6 | 5 | 2 | 3 | 4>;
            required: true;
            default: number;
        };
        align: {
            type: import("vue").PropType<"top" | "center" | "flex-end">;
            required: true;
            default: string;
        };
        showFooter: {
            type: import("vue").PropType<boolean>;
            required: true;
            default: boolean;
        };
        fieldList: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
        model: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
    }>>, {
        validate: (isResetFields?: boolean, otherParams?: {}) => Promise<void>;
        clearValidate: () => void;
        resetFields: () => void;
    }, {}, {}, {}, {
        column: 1 | 6 | 5 | 2 | 3 | 4;
        align: "top" | "center" | "flex-end";
        showFooter: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    column: {
        type: import("vue").PropType<1 | 6 | 5 | 2 | 3 | 4>;
        required: true;
        default: number;
    };
    align: {
        type: import("vue").PropType<"top" | "center" | "flex-end">;
        required: true;
        default: string;
    };
    showFooter: {
        type: import("vue").PropType<boolean>;
        required: true;
        default: boolean;
    };
    fieldList: {
        type: import("vue").PropType<Record<string, any>>;
        required: true;
    };
    model: {
        type: import("vue").PropType<Record<string, any>>;
        required: true;
    };
}>>, {
    validate: (isResetFields?: boolean, otherParams?: {}) => Promise<void>;
    clearValidate: () => void;
    resetFields: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, {
    column: 1 | 6 | 5 | 2 | 3 | 4;
    align: "top" | "center" | "flex-end";
    showFooter: boolean;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: (props: {
            item: any;
        }) => any;
    } & {
        [x: string]: (props: {}) => any;
        [x: number]: (props: {}) => any;
        [x: symbol]: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SForm;
