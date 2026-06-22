import { type Component, type PropType } from 'vue';
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    direction: {
        type: StringConstructor;
        default: string;
    };
    wrap: {
        type: () => "wrap" | "nowrap" | "wrap-reverse";
        default: string;
    };
    justify: {
        type: () => "end" | "start" | "center" | "normal" | "space-between" | "space-around" | "space-evenly";
        default: string;
    };
    align: {
        type: () => "end" | "stretch" | "start" | "center" | "normal" | "baseline";
        default: string;
    };
    flex: {
        type: StringConstructor;
        default: string;
    };
    gap: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    component: {
        type: PropType<string | Component>;
        default: string;
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    direction: {
        type: StringConstructor;
        default: string;
    };
    wrap: {
        type: () => "wrap" | "nowrap" | "wrap-reverse";
        default: string;
    };
    justify: {
        type: () => "end" | "start" | "center" | "normal" | "space-between" | "space-around" | "space-evenly";
        default: string;
    };
    align: {
        type: () => "end" | "stretch" | "start" | "center" | "normal" | "baseline";
        default: string;
    };
    flex: {
        type: StringConstructor;
        default: string;
    };
    gap: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    component: {
        type: PropType<string | Component>;
        default: string;
    };
}>>, {
    align: "end" | "stretch" | "start" | "center" | "normal" | "baseline";
    component: string;
    direction: string;
    flex: string;
    gap: string | number;
    wrap: "wrap" | "nowrap" | "wrap-reverse";
    justify: "end" | "start" | "center" | "normal" | "space-between" | "space-around" | "space-evenly";
}, {}>, {
    default?: (props: {}) => any;
}>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
