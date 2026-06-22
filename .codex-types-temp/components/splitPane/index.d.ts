export type { SplitPaneDirection, SplitPaneSetting } from './src/types';
declare const SSplitPane: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        splitSet: {
            type: import("vue").PropType<import("./src/types").SplitPaneSetting>;
            default: () => {};
        };
        split: {
            type: import("vue").PropType<import("./src/types").SplitPaneDirection>;
            default: string;
        };
        minPercent: {
            type: NumberConstructor;
            default: number;
        };
        defaultPercent: {
            type: NumberConstructor;
            default: number;
        };
        resizerSize: {
            type: (NumberConstructor | StringConstructor)[];
            default: number;
        };
        resetOnClick: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: NumberConstructor;
            default: any;
        };
    }>> & {
        "onUpdate:modelValue"?: (...args: any[]) => any;
        onResize?: (...args: any[]) => any;
    }, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        resize: (...args: any[]) => void;
        "update:modelValue": (...args: any[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        splitSet: {
            type: import("vue").PropType<import("./src/types").SplitPaneSetting>;
            default: () => {};
        };
        split: {
            type: import("vue").PropType<import("./src/types").SplitPaneDirection>;
            default: string;
        };
        minPercent: {
            type: NumberConstructor;
            default: number;
        };
        defaultPercent: {
            type: NumberConstructor;
            default: number;
        };
        resizerSize: {
            type: (NumberConstructor | StringConstructor)[];
            default: number;
        };
        resetOnClick: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: NumberConstructor;
            default: any;
        };
    }>> & {
        "onUpdate:modelValue"?: (...args: any[]) => any;
        onResize?: (...args: any[]) => any;
    }, {
        split: import("./src/types").SplitPaneDirection;
        modelValue: number;
        splitSet: {};
        minPercent: number;
        defaultPercent: number;
        resizerSize: string | number;
        resetOnClick: boolean;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        splitSet: {
            type: import("vue").PropType<import("./src/types").SplitPaneSetting>;
            default: () => {};
        };
        split: {
            type: import("vue").PropType<import("./src/types").SplitPaneDirection>;
            default: string;
        };
        minPercent: {
            type: NumberConstructor;
            default: number;
        };
        defaultPercent: {
            type: NumberConstructor;
            default: number;
        };
        resizerSize: {
            type: (NumberConstructor | StringConstructor)[];
            default: number;
        };
        resetOnClick: {
            type: BooleanConstructor;
            default: boolean;
        };
        modelValue: {
            type: NumberConstructor;
            default: any;
        };
    }>> & {
        "onUpdate:modelValue"?: (...args: any[]) => any;
        onResize?: (...args: any[]) => any;
    }, {}, {}, {}, {}, {
        split: import("./src/types").SplitPaneDirection;
        modelValue: number;
        splitSet: {};
        minPercent: number;
        defaultPercent: number;
        resizerSize: string | number;
        resetOnClick: boolean;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    splitSet: {
        type: import("vue").PropType<import("./src/types").SplitPaneSetting>;
        default: () => {};
    };
    split: {
        type: import("vue").PropType<import("./src/types").SplitPaneDirection>;
        default: string;
    };
    minPercent: {
        type: NumberConstructor;
        default: number;
    };
    defaultPercent: {
        type: NumberConstructor;
        default: number;
    };
    resizerSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    resetOnClick: {
        type: BooleanConstructor;
        default: boolean;
    };
    modelValue: {
        type: NumberConstructor;
        default: any;
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
    onResize?: (...args: any[]) => any;
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    resize: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, {
    split: import("./src/types").SplitPaneDirection;
    modelValue: number;
    splitSet: {};
    minPercent: number;
    defaultPercent: number;
    resizerSize: string | number;
    resetOnClick: boolean;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        paneL?: (props: {}) => any;
    } & {
        left?: (props: {}) => any;
    } & {
        paneR?: (props: {}) => any;
    } & {
        right?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default SSplitPane;
