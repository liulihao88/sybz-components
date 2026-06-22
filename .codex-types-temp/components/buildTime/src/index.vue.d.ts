interface BuildTimeProps {
    componentsLabel?: string;
    utilsLabel?: string;
    emptyText?: string;
    inline?: boolean;
}
declare const _default: import("vue").DefineComponent<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<BuildTimeProps>, {
    componentsLabel: string;
    utilsLabel: string;
    emptyText: string;
    inline: boolean;
}>, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaultsLocal<__VLS_TypePropsToOption<BuildTimeProps>, {
    componentsLabel: string;
    utilsLabel: string;
    emptyText: string;
    inline: boolean;
}>>>, {
    emptyText: string;
    inline: boolean;
    componentsLabel: string;
    utilsLabel: string;
}, {}>;
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
type __VLS_PrettifyLocal<T> = {
    [K in keyof T as K]: T[K];
} & {};
