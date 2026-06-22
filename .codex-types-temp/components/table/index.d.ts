export type { STableButton, STableColumn, STableEmits, STableExpose, STablePageAttrs, STableProps, STableResolvedColumn, TableCellContext, TableCallbackContext, TableColumnList, TableContextHandler, TableFilter, TableFilterContext, TableLegacyHandler, TableMaybeFn, TableModelValue, TablePageChangePayload, TableRender, TableRow, TableScope, TableSelectionType, } from './src/types.ts';
declare const STable: ({
    new (...args: any[]): import("vue").CreateComponentPublicInstance<Readonly<import("vue").ExtractPropTypes<{
        data: {
            type: import("vue").PropType<import("./src/types.ts").TableRow[]>;
            default: () => any[];
        };
        columns: {
            type: import("vue").PropType<import("./src/types.ts").TableColumnList>;
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
            type: import("vue").PropType<number[]>;
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
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
        asyncUpdate: {
            type: BooleanConstructor;
            default: boolean;
        };
        pageAttrs: {
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
        modelValue: {
            type: import("vue").PropType<import("./src/types.ts").TableModelValue>;
            default: any;
        };
        selectionType: {
            type: import("vue").PropType<import("./src/types.ts").TableSelectionType>;
            default: string;
        };
        selectionAttrs: {
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
    }>> & {
        "onPage-change"?: (payload: {
            pageNumber: number;
            pageSize: number;
        }) => any;
        "onUpdate:modelValue"?: (value: string | number | boolean | import("./src/types.ts").TableRow | import("./src/types.ts").TableRow[]) => any;
    }, {
        getTableRef: () => import("element-plus/es/components/table/index.mjs").TableInstance;
    }, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
        "page-change": (payload: {
            pageNumber: number;
            pageSize: number;
        }) => void;
        "update:modelValue": (value: string | number | boolean | import("./src/types.ts").TableRow | import("./src/types.ts").TableRow[]) => void;
    }, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & Readonly<import("vue").ExtractPropTypes<{
        data: {
            type: import("vue").PropType<import("./src/types.ts").TableRow[]>;
            default: () => any[];
        };
        columns: {
            type: import("vue").PropType<import("./src/types.ts").TableColumnList>;
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
            type: import("vue").PropType<number[]>;
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
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
        asyncUpdate: {
            type: BooleanConstructor;
            default: boolean;
        };
        pageAttrs: {
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
        modelValue: {
            type: import("vue").PropType<import("./src/types.ts").TableModelValue>;
            default: any;
        };
        selectionType: {
            type: import("vue").PropType<import("./src/types.ts").TableSelectionType>;
            default: string;
        };
        selectionAttrs: {
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
    }>> & {
        "onPage-change"?: (payload: {
            pageNumber: number;
            pageSize: number;
        }) => any;
        "onUpdate:modelValue"?: (value: string | number | boolean | import("./src/types.ts").TableRow | import("./src/types.ts").TableRow[]) => any;
    }, {
        pageSize: number;
        pageSizes: number[];
        size: string;
        columnEmptyText: string;
        data: import("./src/types.ts").TableRow[];
        columns: import("./src/types.ts").TableColumnList;
        loading: boolean;
        theme: string;
        showPage: boolean;
        showIndex: boolean;
        pageNumber: number;
        indexAttrs: void;
        asyncUpdate: boolean;
        pageAttrs: void;
        modelValue: any;
        selectionType: import("./src/types.ts").TableSelectionType;
        selectionAttrs: void;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import("vue").ExtractPropTypes<{
        data: {
            type: import("vue").PropType<import("./src/types.ts").TableRow[]>;
            default: () => any[];
        };
        columns: {
            type: import("vue").PropType<import("./src/types.ts").TableColumnList>;
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
            type: import("vue").PropType<number[]>;
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
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
        asyncUpdate: {
            type: BooleanConstructor;
            default: boolean;
        };
        pageAttrs: {
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
        modelValue: {
            type: import("vue").PropType<import("./src/types.ts").TableModelValue>;
            default: any;
        };
        selectionType: {
            type: import("vue").PropType<import("./src/types.ts").TableSelectionType>;
            default: string;
        };
        selectionAttrs: {
            type: import("vue").PropType<Record<string, any>>;
            default: () => void;
        };
    }>> & {
        "onPage-change"?: (payload: {
            pageNumber: number;
            pageSize: number;
        }) => any;
        "onUpdate:modelValue"?: (value: string | number | boolean | import("./src/types.ts").TableRow | import("./src/types.ts").TableRow[]) => any;
    }, {
        getTableRef: () => import("element-plus/es/components/table/index.mjs").TableInstance;
    }, {}, {}, {}, {
        pageSize: number;
        pageSizes: number[];
        size: string;
        columnEmptyText: string;
        data: import("./src/types.ts").TableRow[];
        columns: import("./src/types.ts").TableColumnList;
        loading: boolean;
        theme: string;
        showPage: boolean;
        showIndex: boolean;
        pageNumber: number;
        indexAttrs: void;
        asyncUpdate: boolean;
        pageAttrs: void;
        modelValue: any;
        selectionType: import("./src/types.ts").TableSelectionType;
        selectionAttrs: void;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import("vue").ComponentOptionsBase<Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: import("vue").PropType<import("./src/types.ts").TableRow[]>;
        default: () => any[];
    };
    columns: {
        type: import("vue").PropType<import("./src/types.ts").TableColumnList>;
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
        type: import("vue").PropType<number[]>;
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
        type: import("vue").PropType<Record<string, any>>;
        default: () => void;
    };
    asyncUpdate: {
        type: BooleanConstructor;
        default: boolean;
    };
    pageAttrs: {
        type: import("vue").PropType<Record<string, any>>;
        default: () => void;
    };
    modelValue: {
        type: import("vue").PropType<import("./src/types.ts").TableModelValue>;
        default: any;
    };
    selectionType: {
        type: import("vue").PropType<import("./src/types.ts").TableSelectionType>;
        default: string;
    };
    selectionAttrs: {
        type: import("vue").PropType<Record<string, any>>;
        default: () => void;
    };
}>> & {
    "onPage-change"?: (payload: {
        pageNumber: number;
        pageSize: number;
    }) => any;
    "onUpdate:modelValue"?: (value: string | number | boolean | import("./src/types.ts").TableRow | import("./src/types.ts").TableRow[]) => any;
}, {
    getTableRef: () => import("element-plus/es/components/table/index.mjs").TableInstance;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "page-change": (payload: {
        pageNumber: number;
        pageSize: number;
    }) => void;
    "update:modelValue": (value: string | number | boolean | import("./src/types.ts").TableRow | import("./src/types.ts").TableRow[]) => void;
}, string, {
    pageSize: number;
    pageSizes: number[];
    size: string;
    columnEmptyText: string;
    data: import("./src/types.ts").TableRow[];
    columns: import("./src/types.ts").TableColumnList;
    loading: boolean;
    theme: string;
    showPage: boolean;
    showIndex: boolean;
    pageNumber: number;
    indexAttrs: void;
    asyncUpdate: boolean;
    pageAttrs: void;
    modelValue: any;
    selectionType: import("./src/types.ts").TableSelectionType;
    selectionAttrs: void;
}, {}, string, {}> & import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps & (new () => {
    $slots: {
        [x: string]: (props: {
            row: any;
            scope: any;
            index: any;
            value: any;
        }) => any;
    } & {
        [x: string]: (props: {
            row: any;
            scope: any;
            index: any;
            value: any;
        }) => any;
    } & {
        [x: string]: (props: {
            row: any;
            scope: any;
            value: any;
            index: any;
        }) => any;
    } & {
        default?: (props: {}) => any;
    };
}) & import("vue").Plugin) & Record<string, any>;
export default STable;
