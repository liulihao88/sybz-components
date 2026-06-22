declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    value: {
        type: (NumberConstructor | StringConstructor)[];
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
    };
    primary: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor)[];
    };
    warning: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor)[];
    };
    danger: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor)[];
    };
    info: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor)[];
    };
    other: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    config: {
        type: ObjectConstructor;
        default: () => {};
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    value: {
        type: (NumberConstructor | StringConstructor)[];
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
    };
    primary: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor)[];
    };
    warning: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor)[];
    };
    danger: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor)[];
    };
    info: {
        type: (NumberConstructor | BooleanConstructor | StringConstructor | ArrayConstructor)[];
    };
    other: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    config: {
        type: ObjectConstructor;
        default: () => {};
    };
}>>, {
    size: string;
    config: Record<string, any>;
    theme: string;
    options: unknown[];
    other: string;
}, {}>, {
    default?: (props: {}) => any;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
