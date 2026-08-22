import Image from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

const SImage = withInstall(Image)

export { createImageResolver } from './src/resolver'
export default SImage
