declare function close(): void;
declare var __VLS_10: {}, __VLS_12: {}, __VLS_29: {}, __VLS_31: {};
type __VLS_Slots = {} & {
    content?: (props: typeof __VLS_10) => any;
} & {
    footer?: (props: typeof __VLS_12) => any;
} & {
    default?: (props: typeof __VLS_29) => any;
} & {
    default?: (props: typeof __VLS_31) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    reConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}, {
    close: typeof close;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    confirm: (...args: any[]) => void;
    cancel: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    content: {
        type: StringConstructor;
        default: string;
    };
    reConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    dangerouslyUseHTMLString: {
        type: BooleanConstructor;
        default: boolean;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
}>> & {
    onConfirm?: (...args: any[]) => any;
    onCancel?: (...args: any[]) => any;
}, {
    content: string;
    title: string;
    reConfirm: boolean;
    width: string | number;
    dangerouslyUseHTMLString: boolean;
    theme: string;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
