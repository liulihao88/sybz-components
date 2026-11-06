import Markdown from './src/index.vue'
import 'katex/dist/katex.min.css'
import { withInstall } from '@/components/utils/withInstall.ts'

const SMarkdown = withInstall(Markdown)
export default SMarkdown
export type * from './src/types'
