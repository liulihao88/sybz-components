import type {
  ScheduleCalendarDay,
  ScheduleCalendarEmits,
  ScheduleCalendarProps,
  ScheduleCalendarTask,
  ScheduleCalendarView,
} from '../../../components/company/scheduleCalendar/src/types'

export type SScheduleCalendarComponent = {
  new (): {
    $props: {
      modelValue?: string | number | Date
      view?: ScheduleCalendarView
      tasks?: ScheduleCalendarTask[]
      maxTasksPerDay?: number
      emptyText?: string
    }
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
