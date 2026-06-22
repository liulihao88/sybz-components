interface SButtonSelfProps {
    time?: number;
    content?: string;
    tooltipAttrs?: Record<string, any>;
    dangerouslyUseHTMLString?: boolean;
    theme?: '' | 'chenghua';
    variant?: '' | 'outline' | 'gradient';
    size?: '' | 'small' | 'default' | 'large';
    width?: string | number;
    height?: string | number;
}
declare var __VLS_18: string | number, __VLS_19: {
    index: number;
}, __VLS_32: string | number, __VLS_33: {
    index: number;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_18>]?: (props: typeof __VLS_19) => any;
} & {
    [K in NonNullable<typeof __VLS_32>]?: (props: typeof __VLS_33) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<SButtonSelfProps>, {
    time: number;
    content: string;
    tooltipAttrs: () => {};
    dangerouslyUseHTMLString: boolean;
    theme: string;
    variant: string;
    size: string;
    width: string;
    height: string;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (...args: any[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<SButtonSelfProps>, {
    time: number;
    content: string;
    tooltipAttrs: () => {};
    dangerouslyUseHTMLString: boolean;
    theme: string;
    variant: string;
    size: string;
    width: string;
    height: string;
}>>> & {
    onClick?: (...args: any[]) => any;
}, {
    size: "" | "small" | "default" | "large";
    content: string;
    width: string | number;
    height: string | number;
    time: number;
    variant: "" | "outline" | "gradient";
    dangerouslyUseHTMLString: boolean;
    theme: "" | "chenghua";
    tooltipAttrs: {};
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_TypePropsToOption<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<Required<T>[K]>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaultsLocal<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_PrettifyLocal<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
