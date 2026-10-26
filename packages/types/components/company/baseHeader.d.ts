import type { InstallableComponent } from '../_shared'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/company/baseHeader/home.html | 查看文档}
 *
 * 支持组件公开属性，并扩展 sybz 自身属性。
 */
type SBaseHeaderInstallable = InstallableComponent<
  Record<string, any>,
  {},
  {
    default?: () => any
    extra?: () => any
  }
>
declare const SBaseHeader: {
  install: SBaseHeaderInstallable['install']
  new <SBaseHeader文档 = 'https://liulihao88.github.io/sybz-components/components/company/baseHeader/home.html'>(
    ...args: any[]
  ): InstanceType<SBaseHeaderInstallable>
}
export default SBaseHeader
