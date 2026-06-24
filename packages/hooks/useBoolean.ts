import { ref } from 'vue'
import type { Ref } from 'vue'

export interface UseBooleanReturn {
  state: Ref<boolean>
  set: (value: boolean) => void
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

const useBoolean = (initialValue = false): UseBooleanReturn => {
  const state = ref(Boolean(initialValue))

  const set = (value: boolean) => {
    state.value = Boolean(value)
  }
  const setTrue = () => set(true)
  const setFalse = () => set(false)
  const toggle = () => {
    state.value = !state.value
  }

  return {
    state,
    set,
    setTrue,
    setFalse,
    toggle,
  }
}

export default useBoolean
