declare const useZIndex: (initialValue?: number) => {
    currentZIndex: import("vue").ComputedRef<number>;
    nextZIndex: () => number;
    initialZIndex: import("vue").Ref<number>;
};
export default useZIndex;
