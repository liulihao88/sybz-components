declare const _default: import("vue").DefineComponent<{
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    beforeChange: {
        type: FunctionConstructor;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    beforeChange: {
        type: FunctionConstructor;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}>>, {
    width: string | number;
    theme: string;
}, {}>;
export default _default;
