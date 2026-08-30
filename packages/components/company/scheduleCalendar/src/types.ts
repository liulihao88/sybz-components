export type ScheduleCalendarView = 'month' | 'schedule'

export interface ScheduleCalendarTask {
  id: string | number
  title: string
  date: string | number | Date
  type?: string
  contractName?: string
  reminder?: string
  color?: string
  backgroundColor?: string
  [key: string]: unknown
}

export interface ScheduleCalendarDay {
  date: Date
  dateKey: string
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  tasks: ScheduleCalendarTask[]
}

export interface ScheduleCalendarProps {
  modelValue?: string | number | Date
  view?: ScheduleCalendarView
  tasks?: ScheduleCalendarTask[]
  maxTasksPerDay?: number
  emptyText?: string
}

export type ScheduleCalendarEmits = {
  'update:modelValue': [value: Date]
  'update:view': [value: ScheduleCalendarView]
  'month-change': [value: Date]
  'view-change': [value: ScheduleCalendarView]
  'day-click': [day: ScheduleCalendarDay]
  'task-click': [task: ScheduleCalendarTask, day: ScheduleCalendarDay, event: MouseEvent]
}
