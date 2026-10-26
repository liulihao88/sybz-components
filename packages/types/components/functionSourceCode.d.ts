import type { InstallableComponent } from './_shared'
import type { SFunctionSourceCodeProps } from '../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/functionSourceCode/home.html | 查看文档}
 *
 * 支持组件公开属性，并扩展 sybz 自身属性。
 */
type SFunctionSourceCodeInstallable = InstallableComponent<SFunctionSourceCodeProps>
declare const SFunctionSourceCode: {
  install: SFunctionSourceCodeInstallable['install']
  new <
    SFunctionSourceCode文档 = 'https://liulihao88.github.io/sybz-components/components/functionSourceCode/home.html',
  >(
    ...args: any[]
  ): InstanceType<SFunctionSourceCodeInstallable>
}
export default SFunctionSourceCode
