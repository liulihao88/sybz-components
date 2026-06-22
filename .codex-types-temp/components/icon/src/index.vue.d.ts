declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
    };
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    svgAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
    };
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    svgAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: (...args: any[]) => any;
}, {
    size: string | number;
    disabled: boolean;
    type: string;
    dangerouslyUseHTMLString: boolean;
    svgAttrs: Record<string, any>;
}, {}>, {
    default?: (props: {}) => any;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
