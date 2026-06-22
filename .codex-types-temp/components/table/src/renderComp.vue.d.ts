import { type PropType } from 'vue';
import type { STableButton, STableColumn, TableRender, TableRow, TableScope } from './types';
declare const _default: import("vue").DefineComponent<{
    render: PropType<TableRender>;
    scope: PropType<TableScope<TableRow>>;
    row: PropType<TableRow>;
    value: {
        type: PropType<any>;
        default: any;
    };
    column: PropType<STableColumn<TableRow>>;
    action: PropType<STableButton<TableRow>>;
    index: NumberConstructor;
}, unknown, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    render: PropType<TableRender>;
    scope: PropType<TableScope<TableRow>>;
    row: PropType<TableRow>;
    value: {
        type: PropType<any>;
        default: any;
    };
    column: PropType<STableColumn<TableRow>>;
    action: PropType<STableButton<TableRow>>;
    index: NumberConstructor;
}>>, {
    value: any;
}, {}>;
export default _default;
