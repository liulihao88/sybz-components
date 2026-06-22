export interface SButtonSelfProps {
    time?: number;
    tip?: string;
    placement?: string;
    tipProps?: Record<string, any>;
    isDebounce?: boolean;
    theme?: '' | 'chenghua';
    variant?: '' | 'outline' | 'gradient';
    width?: string | number;
    height?: string | number;
}
export type SButtonProps = SButtonSelfProps;
