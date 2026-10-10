import Scroll from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

const SScroll = withInstall(Scroll)
export default SScroll
export type { SScrollAxis, SScrollEmits, SScrollOffset, SScrollPosition, SScrollProps, SScrollType } from './src/types'
