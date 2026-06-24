import type { Ref } from 'vue'
import useBoolean from './useBoolean'

export interface UseLoadingReturn {
  loading: Ref<boolean>
  setLoading: (value: boolean) => void
  startLoading: () => void
  stopLoading: () => void
  withLoading: <T>(handler: () => T | Promise<T>) => Promise<T>
}

const useLoading = (initialValue = false): UseLoadingReturn => {
  const { state: loading, set: setLoading, setTrue: startLoading, setFalse: stopLoading } = useBoolean(initialValue)

  const withLoading = async <T>(handler: () => T | Promise<T>) => {
    startLoading()

    try {
      return await handler()
    } finally {
      stopLoading()
    }
  }

  return {
    loading,
    setLoading,
    startLoading,
    stopLoading,
    withLoading,
  }
}

export default useLoading
