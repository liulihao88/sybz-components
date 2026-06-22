declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    mounted: (...args: any[]) => void;
    clickOutside: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & {
    onMounted?: (...args: any[]) => any;
    onClickOutside?: (...args: any[]) => any;
}, {
    options: Record<string, any>;
}, {}>, {
    default?: (props: {}) => any;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
