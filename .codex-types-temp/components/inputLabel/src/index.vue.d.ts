declare function $getValue(): any[];
declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: ArrayConstructor;
        default(): any[];
    };
    isComplex: {
        type: BooleanConstructor;
        default: boolean;
    };
    regexp: {
        tupe: RegExpConstructor;
        default: string;
    };
    message: {
        tupe: StringConstructor;
        default: string;
    };
    inputAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}, {
    $getValue: typeof $getValue;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ArrayConstructor;
        default(): any[];
    };
    isComplex: {
        type: BooleanConstructor;
        default: boolean;
    };
    regexp: {
        tupe: RegExpConstructor;
        default: string;
    };
    message: {
        tupe: StringConstructor;
        default: string;
    };
    inputAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
}, {
    message: string;
    modelValue: unknown[];
    isComplex: boolean;
    regexp: string;
    inputAttrs: Record<string, any>;
}, {}>;
export default _default;
