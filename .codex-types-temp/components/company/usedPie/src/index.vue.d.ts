import '@/utils/local/useEcharts';
declare const _default: import("vue").DefineComponent<{
    used: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    total: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    options: {
        type: ObjectConstructor;
        default: () => void;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    used: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    total: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    options: {
        type: ObjectConstructor;
        default: () => void;
    };
}>>, {
    total: string | number;
    used: string | number;
    options: Record<string, any>;
}, {}>;
export default _default;
