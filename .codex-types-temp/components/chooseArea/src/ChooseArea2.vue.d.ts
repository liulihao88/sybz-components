export interface AreaItem {
    name: string;
    code: string;
    children?: AreaItem[];
}
export interface Data {
    name: string;
    code: string;
}
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: ArrayConstructor;
        default: () => any[];
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    change: (...args: any[]) => void;
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ArrayConstructor;
        default: () => any[];
    };
}>> & {
    onChange?: (...args: any[]) => any;
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    modelValue: unknown[];
}, {}>;
export default _default;
