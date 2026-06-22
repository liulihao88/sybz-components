import type { PropType } from 'vue';
import type { RadioItem } from './radio';
declare var __VLS_13: {}, __VLS_22: any, __VLS_23: {
    value: string | number | boolean;
    label: string;
    slot?: string;
    disabled?: boolean;
} | {
    label: RadioItem;
    value: RadioItem;
} | {
    label: boolean;
    value: boolean;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_22>]?: (props: typeof __VLS_23) => any;
} & {
    default?: (props: typeof __VLS_13) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
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
        type: PropType<"button" | "radio">;
        validator: (value: string) => boolean;
        default: string;
    };
    options: {
        type: PropType<RadioItem[]>;
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
        type: PropType<"button" | "radio">;
        validator: (value: string) => boolean;
        default: string;
    };
    options: {
        type: PropType<RadioItem[]>;
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
    options: RadioItem[];
    showType: "button" | "radio";
    itemDisabled: Function;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
