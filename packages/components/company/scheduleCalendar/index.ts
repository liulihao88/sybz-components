import ScheduleCalendar from './src/index.vue'
import { withInstall } from '@/components/utils/withInstall.ts'

export type {
  ScheduleCalendarDay,
  ScheduleCalendarEmits,
  ScheduleCalendarProps,
  ScheduleCalendarTask,
  ScheduleCalendarView,
} from './src/types'

const SScheduleCalendar = withInstall(ScheduleCalendar)
export default SScheduleCalendar
