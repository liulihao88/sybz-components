import type { InstallableComponent } from '../_shared'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/company/capacityProgress/home.html | 查看文档}
 *
 * 支持组件公开属性，并扩展 sybz 自身属性。
 */
type SCapacityProgressInstallable = InstallableComponent<
  Record<string, any>,
  {},
  {
    default?: () => any
  }
>
declare const SCapacityProgress: {
  install: SCapacityProgressInstallable['install']
  new <
    SCapacityProgress文档 =
      'https://liulihao88.github.io/sybz-components/components/company/capacityProgress/home.html',
  >(
    ...args: any[]
  ): InstanceType<SCapacityProgressInstallable>
}
export default SCapacityProgress
