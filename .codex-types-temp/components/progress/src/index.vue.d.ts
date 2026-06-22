declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    percentage: {
        type: NumberConstructor;
        required: true;
    };
    animationTime: {
        type: NumberConstructor;
        default: number;
    };
    isAnimation: {
        type: BooleanConstructor;
        default: boolean;
    };
    customColor: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    percentage: {
        type: NumberConstructor;
        required: true;
    };
    animationTime: {
        type: NumberConstructor;
        default: number;
    };
    isAnimation: {
        type: BooleanConstructor;
        default: boolean;
    };
    customColor: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    customColor: boolean;
    animationTime: number;
    isAnimation: boolean;
}, {}>, {
    default?: (props: {
        percentage: number;
    }) => any;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
