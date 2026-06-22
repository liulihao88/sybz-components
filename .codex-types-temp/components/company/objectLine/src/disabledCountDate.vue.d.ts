declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
        default: () => number[];
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (NumberConstructor | StringConstructor | ArrayConstructor)[];
        default: () => number[];
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    modelValue: string | number | unknown[];
}, {}>;
export default _default;
