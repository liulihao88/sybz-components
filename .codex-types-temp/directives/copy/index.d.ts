import type { Directive } from 'vue';
export interface CopyEl extends HTMLElement {
    copyValue: string;
    copyHideToast: boolean;
}
/** 文本复制指令（默认双击复制） */
declare const copy: Directive;
export default copy;
