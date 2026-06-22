import { type PropType } from 'vue';
import type { SplitPaneDirection, SplitPaneSetting } from './types';
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {};
type __VLS_Slots = {} & {
    paneL?: (props: typeof __VLS_1) => any;
} & {
    left?: (props: typeof __VLS_3) => any;
} & {
    paneR?: (props: typeof __VLS_5) => any;
} & {
    right?: (props: typeof __VLS_7) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    splitSet: {
        type: PropType<SplitPaneSetting>;
        default: () => {};
    };
    split: {
        type: PropType<SplitPaneDirection>;
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    resize: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    splitSet: {
        type: PropType<SplitPaneSetting>;
        default: () => {};
    };
    split: {
        type: PropType<SplitPaneDirection>;
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
    split: SplitPaneDirection;
    modelValue: number;
    splitSet: {};
    minPercent: number;
    defaultPercent: number;
    resizerSize: string | number;
    resetOnClick: boolean;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
