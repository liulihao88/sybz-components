import '@/utils/local/useEcharts';
declare const _default: import("vue").DefineComponent<{
    data: {
        type: ArrayConstructor;
        default: () => any[];
    };
    options: {
        type: ObjectConstructor;
        default: () => {
            count: string;
            size: string;
            format: string;
        };
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: ArrayConstructor;
        default: () => any[];
    };
    options: {
        type: ObjectConstructor;
        default: () => {
            count: string;
            size: string;
            format: string;
        };
    };
}>>, {
    data: unknown[];
    options: Record<string, any>;
}, {}>;
export default _default;
