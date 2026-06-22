declare const SChart: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        width: {
            type: import("vue").PropType<string>;
            default: string;
        };
        id: {
            type: import("vue").PropType<string>;
            default: () => string;
        };
        height: {
            type: import("vue").PropType<string>;
            default: string;
        };
        isEmpty: {
            type: import("vue").PropType<boolean | ((options: Record<string, any>) => boolean)>;
            required: true;
            default: boolean;
        };
        option: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
        description: {
            type: import("vue").PropType<string>;
            required: true;
            default: string;
        };
        theme: {
            type: import("vue").PropType<string>;
        };
    }>>, {
        initChart: () => void;
        resizeChart: (() => Promise<void>) & {
            cancel: () => void;
        };
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        [x: string]: (...args: unknown[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        width: {
            type: import("vue").PropType<string>;
            default: string;
        };
        id: {
            type: import("vue").PropType<string>;
            default: () => string;
        };
        height: {
            type: import("vue").PropType<string>;
            default: string;
        };
        isEmpty: {
            type: import("vue").PropType<boolean | ((options: Record<string, any>) => boolean)>;
            required: true;
            default: boolean;
        };
        option: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
        description: {
            type: import("vue").PropType<string>;
            required: true;
            default: string;
        };
        theme: {
            type: import("vue").PropType<string>;
        };
    }>>, {
        width: string;
        id: string;
        height: string;
        isEmpty: boolean | ((options: Record<string, any>) => boolean);
        description: string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        width: {
            type: import("vue").PropType<string>;
            default: string;
        };
        id: {
            type: import("vue").PropType<string>;
            default: () => string;
        };
        height: {
            type: import("vue").PropType<string>;
            default: string;
        };
        isEmpty: {
            type: import("vue").PropType<boolean | ((options: Record<string, any>) => boolean)>;
            required: true;
            default: boolean;
        };
        option: {
            type: import("vue").PropType<Record<string, any>>;
            required: true;
        };
        description: {
            type: import("vue").PropType<string>;
            required: true;
            default: string;
        };
        theme: {
            type: import("vue").PropType<string>;
        };
    }>>, {
        initChart: () => void;
        resizeChart: (() => Promise<void>) & {
            cancel: () => void;
        };
    }, {}, {}, {}, {
        width: string;
        id: string;
        height: string;
        isEmpty: boolean | ((options: Record<string, any>) => boolean);
        description: string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    width: {
        type: import("vue").PropType<string>;
        default: string;
    };
    id: {
        type: import("vue").PropType<string>;
        default: () => string;
    };
    height: {
        type: import("vue").PropType<string>;
        default: string;
    };
    isEmpty: {
        type: import("vue").PropType<boolean | ((options: Record<string, any>) => boolean)>;
        required: true;
        default: boolean;
    };
    option: {
        type: import("vue").PropType<Record<string, any>>;
        required: true;
    };
    description: {
        type: import("vue").PropType<string>;
        required: true;
        default: string;
    };
    theme: {
        type: import("vue").PropType<string>;
    };
}>>, {
    initChart: () => void;
    resizeChart: (() => Promise<void>) & {
        cancel: () => void;
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    [x: string]: (...args: unknown[]) => void;
}, string, {
    width: string;
    id: string;
    height: string;
    isEmpty: boolean | ((options: Record<string, any>) => boolean);
    description: string;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        empty?: (props: {}) => any;
    } & {
        default?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SChart;
