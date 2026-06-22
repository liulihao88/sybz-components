declare var __VLS_1: {
    class: string;
}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_1) => any;
} & {
    title?: (props: typeof __VLS_3) => any;
} & {
    default?: (props: typeof __VLS_5) => any;
} & {
    right?: (props: typeof __VLS_7) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    subTitle: {
        type: StringConstructor;
        default: string;
    };
    subAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    inner: {
        type: BooleanConstructor;
        default: boolean;
    };
    t: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    b: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    l: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    tb: {
        type: (NumberConstructor | StringConstructor)[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    subTitle: {
        type: StringConstructor;
        default: string;
    };
    subAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    inner: {
        type: BooleanConstructor;
        default: boolean;
    };
    t: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    b: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    l: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    tb: {
        type: (NumberConstructor | StringConstructor)[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    size: string;
    type: string;
    title: string;
    height: string | number;
    t: string | number;
    b: string | number;
    theme: string;
    subTitle: string;
    subAttrs: Record<string, any>;
    inner: boolean;
    l: string | number;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
