import { ElUpload } from 'element-plus'
import type { UploadRawFile, UploadRequestOptions, UploadUserFile } from 'element-plus/es/components/upload'
import type {
  SUploadRequestContext,
  SUploadRequest,
  SUploadCancel,
  SUploadValidationReason,
  SUploadSelfProps,
} from '../component-props'

type ElUploadInstance = InstanceType<typeof ElUpload>

export type SUploadPublicProps = SUploadSelfProps &
  Omit<ElUploadInstance['$props'], keyof SUploadSelfProps | 'fileList' | 'httpRequest' | 'beforeUpload'>

export type SUploadComponent = {
  new (): {
    $props: {
      /** 双向绑定的文件列表 */
      modelValue?: UploadUserFile[]
      /** 单个文件最大字节数，Infinity 表示不限制 */
      maxFileSizeBytes?: number
      /** 自定义上传接口 */
      request?: SUploadRequest
      /** 取消上传时调用，可用于取消业务请求或分片任务 */
      cancel?: SUploadCancel
      /** 校验失败时是否显示消息提示 */
      showValidationMessage?: boolean
      /** 空状态主文案 */
      placeholder?: string
      /** 空状态辅助文案 */
      tip?: string
    } & Omit<
      ElUploadInstance['$props'],
      | 'modelValue'
      | 'maxFileSizeBytes'
      | 'request'
      | 'cancel'
      | 'showValidationMessage'
      | 'placeholder'
      | 'tip'
      | 'fileList'
      | 'httpRequest'
      | 'beforeUpload'
    >
    $emit: ElUploadInstance['$emit']
    $slots: ElUploadInstance['$slots'] & Record<string, (...args: any[]) => any>
  }
}

declare const SUpload: SUploadComponent
export default SUpload
