import { PropType } from 'vue';
declare const _default: import("vue").DefineComponent<{
    col: {
        type: PropType<number | number[]>;
        default: number;
    };
    gap: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    gutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    justify: {
        type: PropType<"end" | "start" | "center" | "space-between" | "space-around">;
        default: string;
    };
    align: {
        type: PropType<"bottom" | "top" | "middle">;
        default: string;
    };
    colAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    col: {
        type: PropType<number | number[]>;
        default: number;
    };
    gap: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    gutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    justify: {
        type: PropType<"end" | "start" | "center" | "space-between" | "space-around">;
        default: string;
    };
    align: {
        type: PropType<"bottom" | "top" | "middle">;
        default: string;
    };
    colAttrs: {
        type: ObjectConstructor;
        default: () => {};
    };
}>>, {
    align: "bottom" | "top" | "middle";
    col: number | number[];
    gap: string | number;
    justify: "end" | "start" | "center" | "space-between" | "space-around";
    gutter: string | number;
    colAttrs: Record<string, any>;
}, {}>;
export default _default;
