declare var __VLS_8: {}, __VLS_11: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_8) => any;
} & {
    content?: (props: typeof __VLS_11) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    width: {
        type: StringConstructor;
        default: string;
    };
    lineClamp: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showSlot: {
        type: BooleanConstructor;
        default: boolean;
    };
    effect: {
        default: string;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    width: {
        type: StringConstructor;
        default: string;
    };
    lineClamp: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showSlot: {
        type: BooleanConstructor;
        default: boolean;
    };
    effect: {
        default: string;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & {
    onClick?: (...args: any[]) => any;
}, {
    width: string;
    effect: string;
    dangerouslyUseHTMLString: boolean;
    lineClamp: string | number;
    showSlot: boolean;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
