declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    boxStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
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
    subAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    boxStyle: {
        type: ObjectConstructor;
        default: () => {};
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
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
    subAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}>>, {
    size: string;
    title: string;
    width: string | number;
    height: string | number;
    theme: string;
    boxStyle: Record<string, any>;
    subAttrs: Record<string, any>;
}, {}>, {
    [x: string]: (props: any) => any;
    [x: number]: (props: any) => any;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
