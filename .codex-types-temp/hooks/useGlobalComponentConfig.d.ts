import { type ComputedRef } from 'vue';
export declare const GLOBAL_COMPONENT_CONFIG_KEY = "GLOBAL_COMPONENT_CONFIG";
export declare const GLOBAL_COMPONENT_COMMON_PROPS_KEY = "__globalProps";
declare const useGlobalComponentConfig: <T extends Record<string, any>>(componentKey: string, props: T) => ComputedRef<T & Record<string, any>>;
export default useGlobalComponentConfig;
