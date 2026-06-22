declare const _default: import("vue").DefineComponent<{
    objectCount: {
        type: ArrayConstructor;
        default: () => any[];
    };
    objectSize: {
        type: ArrayConstructor;
        default: () => any[];
    };
}, {
    dateRange: import("vue").Ref<number[]>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    dateChange: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    objectCount: {
        type: ArrayConstructor;
        default: () => any[];
    };
    objectSize: {
        type: ArrayConstructor;
        default: () => any[];
    };
}>> & {
    onDateChange?: (...args: any[]) => any;
}, {
    objectCount: unknown[];
    objectSize: unknown[];
}, {}>;
export default _default;
