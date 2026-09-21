import Json from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

const SJson = withInstall(Json)

export default SJson
export type * from './src/types'
