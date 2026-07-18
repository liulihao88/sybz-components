import type { UploadPropsPublic, UploadRawFile, UploadRequestOptions, UploadUserFile } from 'element-plus'

export type SUploadRequestContext = Omit<UploadRequestOptions, 'file'>
export type SUploadCancel = (file: UploadRawFile, context: SUploadRequestContext) => void | Promise<void>

export type SUploadRequest = (file: UploadRawFile, context: SUploadRequestContext) => XMLHttpRequest | Promise<unknown>

export type SUploadValidationReason = 'type' | 'size' | 'before-upload'

export interface SUploadSelfProps {
  /** 双向绑定的文件列表 */
  modelValue?: UploadUserFile[]
  /** 单个文件最大字节数，Infinity 表示不限制 */
  maxFileSizeBytes?: number
  /** 自定义上传接口，第一个参数为文件，第二个参数包含进度、成功和失败回调等上下文 */
  request?: SUploadRequest
  /** 取消上传时调用，可用于取消业务请求或分片任务 */
  cancel?: SUploadCancel
  /** 文件类型或大小校验失败时是否显示消息提示 */
  showValidationMessage?: boolean
  /** 空状态主文案 */
  placeholder?: string
  /** 空状态辅助文案；未设置时根据 accept、maxFileSizeBytes 自动生成 */
  tip?: string
}

export type SUploadProps = SUploadSelfProps &
  Partial<Omit<UploadPropsPublic, keyof SUploadSelfProps | 'fileList' | 'httpRequest' | 'beforeUpload'>>

export interface SUploadValidationError {
  file: UploadRawFile
  reason: SUploadValidationReason
  message: string
}
