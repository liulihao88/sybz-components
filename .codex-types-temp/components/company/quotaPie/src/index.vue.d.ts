import '@/utils/local/useEcharts';
declare const _default: import("vue").DefineComponent<{
    used: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    total: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    text: {
        type: StringConstructor;
        required: true;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    used: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    total: {
        type: (NumberConstructor | StringConstructor)[];
        required: true;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    text: {
        type: StringConstructor;
        required: true;
        default: string;
    };
}>>, {
    type: string;
    text: string;
}, {}>;
export default _default;
