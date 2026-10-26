import type { InstallableComponent } from './_shared'
import type { SBuildTimeProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/buildTime/home.html | 查看文档}
 *
 * 支持组件公开属性，并扩展 sybz 自身属性。
 */
type SBuildTimeInstallable = InstallableComponent<SBuildTimeProps>
declare const SBuildTime: {
  install: SBuildTimeInstallable['install']
  new <SBuildTime文档 = 'https://liulihao88.github.io/sybz-components/components/buildTime/home.html'>(
    ...args: any[]
  ): InstanceType<SBuildTimeInstallable>
}
export default SBuildTime
