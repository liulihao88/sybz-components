import type { VNodeChild } from 'vue'

export type RenderRecord = Record<string, any>

export interface RenderScope<Row extends RenderRecord = RenderRecord> {
  row: Row
  $index: number
  [key: string]: any
}

export type RenderContext<
  Row extends RenderRecord = RenderRecord,
  Column = RenderRecord,
  Action = RenderRecord,
> = Partial<Row> & {
  row?: Row
  scope?: RenderScope<Row>
  value?: any
  column?: Column
  action?: Action
  index?: number
  event?: Event
  item?: any
  label?: any
  [key: string]: any
}

export type RenderFunction<Row extends RenderRecord = RenderRecord, Column = RenderRecord, Action = RenderRecord> = (
  context: RenderContext<Row, Column, Action>,
) => VNodeChild

export interface CreateRenderContextOptions<
  Row extends RenderRecord = RenderRecord,
  Column = RenderRecord,
  Action = RenderRecord,
> {
  row?: Row
  scope?: RenderScope<Row>
  value?: any
  column?: Column
  action?: Action
  index?: number
  event?: Event
  item?: any
  extra?: RenderRecord
}

const isRecord = (value: unknown): value is RenderRecord => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export const createRenderContext = <
  Row extends RenderRecord = RenderRecord,
  Column extends RenderRecord = RenderRecord,
  Action extends RenderRecord = RenderRecord,
>({
  row,
  scope,
  value,
  column,
  action,
  index,
  event,
  item,
  extra,
}: CreateRenderContextOptions<Row, Column, Action> = {}): RenderContext<Row, Column, Action> => {
  const itemData = isRecord(item) ? item : {}
  const rowSource = row ?? itemData.row
  const rowData = isRecord(rowSource) ? rowSource : {}
  const targetProp = action?.prop ?? column?.prop ?? itemData.prop
  const finalValue =
    value !== undefined
      ? value
      : targetProp !== undefined
        ? (rowData?.[targetProp] ?? itemData?.[targetProp] ?? itemData.value)
        : itemData.value

  return {
    ...rowData,
    ...itemData,
    ...extra,
    row: rowSource,
    scope,
    column,
    action,
    value: finalValue,
    index: index ?? scope?.$index ?? itemData.index,
    event,
    item,
  } as RenderContext<Row, Column, Action>
}

export const renderVNode = (render: RenderFunction | undefined, context: RenderContext) => {
  return typeof render === 'function' ? render(context) : null
}
