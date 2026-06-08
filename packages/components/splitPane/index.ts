import SplitPane from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

export type { SplitPaneDirection, SplitPaneSetting } from './src/types'

const SSplitPane = withInstall(SplitPane)
export default SSplitPane
