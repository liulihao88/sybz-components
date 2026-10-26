import type {
  ScheduleCalendarDay,
  ScheduleCalendarEmits,
  ScheduleCalendarProps,
  ScheduleCalendarTask,
  ScheduleCalendarView,
} from '../../../components/company/scheduleCalendar/src/types'
import type { SybzStyleProps } from '../../component-props'

export type SScheduleCalendarComponent = {
  install: (app: import('vue').App) => void
  new (): {
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

declare const SScheduleCalendar: SScheduleCalendarComponent
export default SScheduleCalendar
