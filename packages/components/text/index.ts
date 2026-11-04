import Text from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

const SText = withInstall(Text)
export default SText
export type { STextProps, STextType } from './src/types'
