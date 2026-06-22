declare const _default: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor[];
    };
    unit: {
        type: NumberConstructor[];
    };
    validator: {
        type: FunctionConstructor[];
    };
}, {
    /**
     * 暴露一个方法，供父组件在需要时（如提交表单前）手动调用校验
     * @returns {Promise} 返回一个 Promise，校验通过 resolve，失败 reject
     */
    validate(): Promise<unknown>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (...args: any[]) => void;
    "update:unit": (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor[];
    };
    unit: {
        type: NumberConstructor[];
    };
    validator: {
        type: FunctionConstructor[];
    };
}>> & {
    "onUpdate:modelValue"?: (...args: any[]) => any;
    "onUpdate:unit"?: (...args: any[]) => any;
}, {}, {}>;
export default _default;
