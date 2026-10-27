import Backtop from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

const SBacktop = withInstall(Backtop)
export default SBacktop
export type { SBacktopProps, SBacktopEmits } from './src/types'
