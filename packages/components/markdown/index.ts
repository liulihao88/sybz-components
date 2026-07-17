import Markdown from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

const SMarkdown = withInstall(Markdown)
export default SMarkdown
export type * from './src/types'
