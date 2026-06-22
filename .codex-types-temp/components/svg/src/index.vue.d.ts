declare const _default: import("vue").DefineComponent<{
    prefix: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
    };
    customStyle: {
        type: ObjectConstructor;
        default: () => void;
    };
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    prefix: {
        type: StringConstructor;
        default: string;
    };
    name: {
        type: StringConstructor;
        required: true;
    };
    color: {
        type: StringConstructor;
    };
    customStyle: {
        type: ObjectConstructor;
        default: () => void;
    };
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
}>>, {
    size: string | number;
    prefix: string;
    customStyle: Record<string, any>;
}, {}>;
export default _default;
