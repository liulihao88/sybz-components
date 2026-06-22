declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    total: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    used: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    iconAttrs: {
        type: ObjectConstructor;
        default: () => void;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
    };
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    warning: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    primary: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    danger: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    info: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    value: {
        type: (NumberConstructor | StringConstructor)[];
    };
    content: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    other: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
    };
    customColor: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    total: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    used: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    iconAttrs: {
        type: ObjectConstructor;
        default: () => void;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
    };
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    warning: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    primary: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    danger: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    info: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
    };
    value: {
        type: (NumberConstructor | StringConstructor)[];
    };
    content: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    other: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
    };
    customColor: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    iconAttrs: Record<string, any>;
    options: unknown[];
    other: string;
    customColor: boolean;
}, {}>, {
    default?: (props: {}) => any;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
