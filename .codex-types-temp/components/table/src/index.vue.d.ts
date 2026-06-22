import { type PropType } from 'vue';
import type { TableInstance } from 'element-plus';
import type { TableColumnList, TableModelValue, TableRow, TableSelectionType } from './types';
declare var __VLS_53: {}, __VLS_93: string | false, __VLS_94: {
    row: any;
    scope: any;
    index: any;
    value: any;
}, __VLS_165: string | false, __VLS_166: {
    row: any;
    scope: any;
    index: any;
    value: any;
}, __VLS_199: string | false, __VLS_200: {
    row: any;
    scope: any;
    value: any;
    index: any;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_93>]?: (props: typeof __VLS_94) => any;
} & {
    [K in NonNullable<typeof __VLS_165>]?: (props: typeof __VLS_166) => any;
} & {
    [K in NonNullable<typeof __VLS_199>]?: (props: typeof __VLS_200) => any;
} & {
    default?: (props: typeof __VLS_53) => any;
};
declare const _default: __VLS_WithSlots<import("vue").DefineComponent<{
    data: {
        type: PropType<TableRow[]>;
        default: () => any[];
    };
    columns: {
        type: PropType<TableColumnList>;
        default: () => any[];
    };
    showPage: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIndex: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    pageNumber: {
        type: NumberConstructor;
        default: number;
    };
    pageSizes: {
        type: PropType<number[]>;
        default: () => number[];
    };
    total: {
        type: NumberConstructor;
    };
    columnEmptyText: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
    };
    indexAttrs: {
        type: PropType<Record<string, any>>;
        default: () => void;
    };
    asyncUpdate: {
        type: BooleanConstructor;
        default: boolean;
    };
    pageAttrs: {
        type: PropType<Record<string, any>>;
        default: () => void;
    };
    modelValue: {
        type: PropType<TableModelValue>;
        default: any;
    };
    selectionType: {
        type: PropType<TableSelectionType>;
        default: string;
    };
    selectionAttrs: {
        type: PropType<Record<string, any>>;
        default: () => void;
    };
}, {
    getTableRef: () => TableInstance;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "page-change": (payload: {
        pageNumber: number;
        pageSize: number;
    }) => void;
    "update:modelValue": (value: string | number | boolean | TableRow | TableRow[]) => void;
}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<TableRow[]>;
        default: () => any[];
    };
    columns: {
        type: PropType<TableColumnList>;
        default: () => any[];
    };
    showPage: {
        type: BooleanConstructor;
        default: boolean;
    };
    showIndex: {
        type: BooleanConstructor;
        default: boolean;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    theme: {
        type: StringConstructor;
        default: string;
        validator: (value: string) => boolean;
    };
    pageSize: {
        type: NumberConstructor;
        default: number;
    };
    pageNumber: {
        type: NumberConstructor;
        default: number;
    };
    pageSizes: {
        type: PropType<number[]>;
        default: () => number[];
    };
    total: {
        type: NumberConstructor;
    };
    columnEmptyText: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
    };
    indexAttrs: {
        type: PropType<Record<string, any>>;
        default: () => void;
    };
    asyncUpdate: {
        type: BooleanConstructor;
        default: boolean;
    };
    pageAttrs: {
        type: PropType<Record<string, any>>;
        default: () => void;
    };
    modelValue: {
        type: PropType<TableModelValue>;
        default: any;
    };
    selectionType: {
        type: PropType<TableSelectionType>;
        default: string;
    };
    selectionAttrs: {
        type: PropType<Record<string, any>>;
        default: () => void;
    };
}>> & {
    "onPage-change"?: (payload: {
        pageNumber: number;
        pageSize: number;
    }) => any;
    "onUpdate:modelValue"?: (value: string | number | boolean | TableRow | TableRow[]) => any;
}, {
    pageSize: number;
    pageSizes: number[];
    size: string;
    columnEmptyText: string;
    data: TableRow[];
    columns: TableColumnList;
    loading: boolean;
    theme: string;
    showPage: boolean;
    showIndex: boolean;
    pageNumber: number;
    indexAttrs: void;
    asyncUpdate: boolean;
    pageAttrs: void;
    modelValue: any;
    selectionType: TableSelectionType;
    selectionAttrs: void;
}, {}>, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
