declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {}, __VLS_9: {}, __VLS_11: {};
type __VLS_Slots = {} & {
    img?: (props: typeof __VLS_1) => any;
} & {
    label?: (props: typeof __VLS_3) => any;
} & {
    value?: (props: typeof __VLS_5) => any;
} & {
    value?: (props: typeof __VLS_7) => any;
} & {
    label?: (props: typeof __VLS_9) => any;
} & {
    img?: (props: typeof __VLS_11) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
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
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
