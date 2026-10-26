import type {
  ScheduleCalendarDay,
  ScheduleCalendarEmits,
  ScheduleCalendarProps,
  ScheduleCalendarTask,
  ScheduleCalendarView,
} from '../../../components/company/scheduleCalendar/src/types'
import type { SybzStyleProps } from '../../component-props'

/**
 * {@link https://liulihao88.github.io/sybz-components/components/company/scheduleCalendar/home.html | 查看文档}
 *
 * 先提示 sybz 自身属性。
 */
export type SScheduleCalendarComponent = {
  install: (app: import('vue').App) => void
  new <
    SScheduleCalendar文档 =
      'https://liulihao88.github.io/sybz-components/components/company/scheduleCalendar/home.html',
  >(): {
    $props: {
      modelValue?: string | number | Date
      view?: ScheduleCalendarView
      tasks?: ScheduleCalendarTask[]
      maxTasksPerDay?: number
      emptyText?: string
    } & SybzStyleProps
    $slots: {
      filters?: () => any
      day?: () => any
      task?: () => any
      scheduleAction?: () => any
      empty?: () => any
    }
    $emit: <Event extends keyof ScheduleCalendarEmits>(event: Event, ...args: ScheduleCalendarEmits[Event]) => void
  }
}

/**
 * {@link https://liulihao88.github.io/sybz-components/components/company/scheduleCalendar/home.html | 查看文档}
 */
declare const SScheduleCalendar: SScheduleCalendarComponent
export default SScheduleCalendar
