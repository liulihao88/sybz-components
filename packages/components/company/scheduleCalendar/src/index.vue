<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type {
  ScheduleCalendarDay,
  ScheduleCalendarEmits,
  ScheduleCalendarProps,
  ScheduleCalendarTask,
  ScheduleCalendarView,
} from './types'

defineOptions({ name: 'SScheduleCalendar' })

const props = withDefaults(defineProps<ScheduleCalendarProps>(), {
  modelValue: () => new Date(),
  view: 'month',
  tasks: () => [],
  maxTasksPerDay: 3,
  emptyText: '暂无日程',
})

const emit = defineEmits<ScheduleCalendarEmits>()

defineSlots<{
  filters(props: { currentDate: Date; view: ScheduleCalendarView }): any
  day(props: { day: ScheduleCalendarDay }): any
  task(props: { task: ScheduleCalendarTask; day: ScheduleCalendarDay }): any
  empty(): any
}>()

const weekNames = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

const parseDate = (value: string | number | Date) => {
  if (value instanceof Date) return new Date(value.getTime())
  if (typeof value === 'string') {
    const matched = value.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/)
    if (matched) return new Date(Number(matched[1]), Number(matched[2]) - 1, Number(matched[3]))
  }
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}

const startOfMonth = (value: Date) => new Date(value.getFullYear(), value.getMonth(), 1)
const pad = (value: number) => String(value).padStart(2, '0')
const toDateKey = (value: Date) => `${value.getFullYear()}-${pad(value.getMonth() + 1)}-${pad(value.getDate())}`

const currentDate = ref(startOfMonth(parseDate(props.modelValue)))
const activeView = ref<ScheduleCalendarView>(props.view)
const expandedDayKey = ref('')

watch(
  () => props.modelValue,
  (value) => {
    const next = startOfMonth(parseDate(value))
    if (toDateKey(next) !== toDateKey(currentDate.value)) currentDate.value = next
  },
)

watch(
  () => props.view,
  (value) => {
    activeView.value = value
  },
)

const monthTitle = computed(() => `${currentDate.value.getFullYear()}年${currentDate.value.getMonth() + 1}月`)

const taskMap = computed(() => {
  const result = new Map<string, ScheduleCalendarTask[]>()
  props.tasks.forEach((task) => {
    const key = toDateKey(parseDate(task.date))
    const list = result.get(key) ?? []
    list.push(task)
    result.set(key, list)
  })
  return result
})

const calendarDays = computed<ScheduleCalendarDay[]>(() => {
  const first = startOfMonth(currentDate.value)
  const mondayOffset = (first.getDay() + 6) % 7
  const gridStart = new Date(first.getFullYear(), first.getMonth(), 1 - mondayOffset)
  const todayKey = toDateKey(new Date())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + index)
    const dateKey = toDateKey(date)
    return {
      date,
      dateKey,
      day: date.getDate(),
      isCurrentMonth: date.getMonth() === currentDate.value.getMonth(),
      isToday: dateKey === todayKey,
      tasks: taskMap.value.get(dateKey) ?? [],
    }
  })
})

const scheduleDays = computed(() => calendarDays.value.filter((day) => day.isCurrentMonth && day.tasks.length))

const setMonth = (value: Date) => {
  expandedDayKey.value = ''
  const next = startOfMonth(value)
  currentDate.value = next
  emit('update:modelValue', new Date(next))
  emit('month-change', new Date(next))
}

const changeMonth = (offset: number) => {
  setMonth(new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + offset, 1))
}

const goToday = () => setMonth(new Date())

const changeView = (view: ScheduleCalendarView) => {
  if (view === activeView.value) return
  expandedDayKey.value = ''
  activeView.value = view
  emit('update:view', view)
  emit('view-change', view)
}

const handleDayClick = (day: ScheduleCalendarDay) => {
  expandedDayKey.value = ''
  emit('day-click', day)
}
const handleTaskClick = (task: ScheduleCalendarTask, day: ScheduleCalendarDay, event: MouseEvent) => {
  event.stopPropagation()
  expandedDayKey.value = ''
  emit('task-click', task, day, event)
}

const toggleMore = (day: ScheduleCalendarDay, event: MouseEvent) => {
  event.stopPropagation()
  expandedDayKey.value = expandedDayKey.value === day.dateKey ? '' : day.dateKey
}

const taskStyle = (task: ScheduleCalendarTask) => ({
  '--s-schedule-task-color': task.color ?? '#2761a5',
  '--s-schedule-task-bg': task.backgroundColor ?? '#eaf2ff',
})

const formatScheduleDate = (date: Date) =>
  `${date.getMonth() + 1}月${date.getDate()}日 ${weekNames[(date.getDay() + 6) % 7]}`
</script>

<template>
  <section class="s-schedule-calendar" @click="expandedDayKey = ''">
    <div class="s-schedule-calendar__toolbar">
      <div class="s-schedule-calendar__navigation">
        <button class="s-schedule-calendar__icon-button" type="button" aria-label="上个月" @click="changeMonth(-1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
        <strong class="s-schedule-calendar__month">{{ monthTitle }}</strong>
        <button class="s-schedule-calendar__icon-button" type="button" aria-label="下个月" @click="changeMonth(1)">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        </button>
        <button class="s-schedule-calendar__today" type="button" @click="goToday">今天</button>
      </div>

      <div class="s-schedule-calendar__tools">
        <div v-if="$slots.filters" class="s-schedule-calendar__filters">
          <slot name="filters" :current-date="new Date(currentDate)" :view="activeView" />
        </div>
        <div class="s-schedule-calendar__view-switch" aria-label="日历视图">
          <button :class="{ 'is-active': activeView === 'month' }" type="button" @click="changeView('month')">
            月历
          </button>
          <button :class="{ 'is-active': activeView === 'schedule' }" type="button" @click="changeView('schedule')">
            日程
          </button>
        </div>
      </div>
    </div>

    <div v-if="activeView === 'month'" class="s-schedule-calendar__month-view">
      <div v-for="weekName in weekNames" :key="weekName" class="s-schedule-calendar__weekday">{{ weekName }}</div>
      <div
        v-for="day in calendarDays"
        :key="day.dateKey"
        class="s-schedule-calendar__day"
        :class="{ 'is-outside': !day.isCurrentMonth, 'is-expanded': expandedDayKey === day.dateKey }"
        role="button"
        tabindex="0"
        @click="handleDayClick(day)"
        @keydown.enter="handleDayClick(day)"
        @keydown.space.prevent="handleDayClick(day)"
      >
        <slot name="day" :day="day">
          <span class="s-schedule-calendar__day-number" :class="{ 'is-today': day.isToday }">{{ day.day }}</span>
        </slot>
        <button
          v-if="day.tasks.length > maxTasksPerDay"
          class="s-schedule-calendar__more-button"
          type="button"
          :aria-expanded="expandedDayKey === day.dateKey"
          @click="toggleMore(day, $event)"
        >
          更多
        </button>
        <span class="s-schedule-calendar__tasks">
          <button
            v-for="task in day.tasks.slice(0, maxTasksPerDay)"
            :key="task.id"
            class="s-schedule-calendar__task"
            type="button"
            :style="taskStyle(task)"
            :title="task.title"
            @click="handleTaskClick(task, day, $event)"
          >
            <slot name="task" :task="task" :day="day">{{ task.title }}</slot>
          </button>
        </span>
        <span
          v-if="day.tasks.length > maxTasksPerDay && expandedDayKey === day.dateKey"
          class="s-schedule-calendar__more-dropdown"
          @click.stop
        >
          <button
            v-for="task in day.tasks.slice(maxTasksPerDay)"
            :key="task.id"
            class="s-schedule-calendar__task s-schedule-calendar__dropdown-task"
            type="button"
            :style="taskStyle(task)"
            :title="task.title"
            @click="handleTaskClick(task, day, $event)"
          >
            <slot name="task" :task="task" :day="day">{{ task.title }}</slot>
          </button>
        </span>
      </div>
    </div>

    <div v-else class="s-schedule-calendar__schedule-view">
      <template v-if="scheduleDays.length">
        <div
          v-for="day in scheduleDays"
          :key="day.dateKey"
          class="s-schedule-calendar__schedule-day"
          role="button"
          tabindex="0"
          @click="handleDayClick(day)"
          @keydown.enter="handleDayClick(day)"
          @keydown.space.prevent="handleDayClick(day)"
        >
          <span class="s-schedule-calendar__schedule-date">{{ formatScheduleDate(day.date) }}</span>
          <span class="s-schedule-calendar__schedule-tasks">
            <button
              v-for="task in day.tasks"
              :key="task.id"
              class="s-schedule-calendar__schedule-task"
              type="button"
              :style="taskStyle(task)"
              @click="handleTaskClick(task, day, $event)"
            >
              <slot name="task" :task="task" :day="day">{{ task.title }}</slot>
            </button>
          </span>
        </div>
      </template>
      <div v-else class="s-schedule-calendar__empty">
        <slot name="empty">{{ emptyText }}</slot>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.s-schedule-calendar {
  --s-schedule-border: #dfe5ec;
  --s-schedule-text: #20344f;
  width: 100%;
  color: var(--s-schedule-text);
  font-size: 14px;
}

.s-schedule-calendar__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  margin-bottom: 16px;
  padding: 0 20px;
  border: 1px solid var(--s-schedule-border);
  border-radius: 10px;
  background: #fff;
}

.s-schedule-calendar__navigation,
.s-schedule-calendar__tools,
.s-schedule-calendar__filters,
.s-schedule-calendar__view-switch {
  display: flex;
  align-items: center;
}

.s-schedule-calendar__navigation {
  gap: 14px;
}
.s-schedule-calendar__tools {
  gap: 12px;
  min-width: 0;
}
.s-schedule-calendar__filters {
  gap: 10px;
}
.s-schedule-calendar__month {
  min-width: 112px;
  text-align: center;
  font-size: 17px;
}

.s-schedule-calendar button {
  font: inherit;
}
.s-schedule-calendar__icon-button,
.s-schedule-calendar__today {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  border: 1px solid var(--s-schedule-border);
  border-radius: 7px;
  background: #fff;
  color: #61738a;
  cursor: pointer;
}
.s-schedule-calendar__icon-button {
  width: 38px;
  padding: 0;
}
.s-schedule-calendar__icon-button svg {
  width: 18px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
}
.s-schedule-calendar__today {
  padding: 0 18px;
  color: #40566f;
}
.s-schedule-calendar__icon-button:hover,
.s-schedule-calendar__today:hover {
  border-color: #80adf2;
  color: #1769d5;
}

.s-schedule-calendar__view-switch {
  padding: 4px;
  border-radius: 8px;
  background: #f2f4f7;
}
.s-schedule-calendar__view-switch button {
  height: 32px;
  padding: 0 14px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #6c7e93;
  cursor: pointer;
}
.s-schedule-calendar__view-switch button.is-active {
  background: #fff;
  color: #1769d5;
  box-shadow: 0 1px 4px rgb(31 55 88 / 8%);
}

.s-schedule-calendar__month-view {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  overflow: visible;
  border: 1px solid var(--s-schedule-border);
  border-radius: 10px;
  background: var(--s-schedule-border);
  gap: 1px;
}
.s-schedule-calendar__weekday {
  padding: 13px 8px;
  background: #f8fafc;
  color: #7d8da1;
  text-align: center;
}
.s-schedule-calendar__day {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
  min-height: 128px;
  padding: 12px 10px;
  border: 0;
  background: #fff;
  color: #647990;
  text-align: left;
  cursor: pointer;
}
.s-schedule-calendar__day:hover {
  background: #f8fbff;
}
.s-schedule-calendar__day.is-outside {
  background: #fbfcfd;
  color: #c4cdd7;
}
.s-schedule-calendar__day.is-expanded {
  z-index: 2;
}
.s-schedule-calendar__day-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
}
.s-schedule-calendar__day-number.is-today {
  border-radius: 50%;
  background: #1769d5;
  color: #fff;
}
.s-schedule-calendar__tasks {
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
}
.s-schedule-calendar__task,
.s-schedule-calendar__schedule-task {
  overflow: hidden;
  border: 0;
  border-left: 4px solid var(--s-schedule-task-color);
  border-radius: 5px;
  background: var(--s-schedule-task-bg);
  color: var(--s-schedule-task-color);
  font-weight: 600;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
.s-schedule-calendar__task {
  width: 100%;
  padding: 6px 8px;
}
.s-schedule-calendar__task:hover,
.s-schedule-calendar__schedule-task:hover {
  filter: brightness(0.97);
}
.s-schedule-calendar__more-button {
  position: absolute;
  top: 11px;
  right: 10px;
  padding: 3px 6px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #1769d5;
  font-size: 12px;
  cursor: pointer;
}
.s-schedule-calendar__more-button:hover,
.s-schedule-calendar__more-button[aria-expanded='true'] {
  background: #eaf2ff;
}
.s-schedule-calendar__more-dropdown {
  position: absolute;
  z-index: 3;
  top: 40px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: min(240px, calc(100% - 20px));
  padding: 8px;
  border: 1px solid var(--s-schedule-border);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 8px 24px rgb(31 55 88 / 16%);
}
.s-schedule-calendar__dropdown-task {
  width: 100%;
  padding: 7px 8px;
}

.s-schedule-calendar__schedule-view {
  overflow: hidden;
  border: 1px solid var(--s-schedule-border);
  border-radius: 10px;
  background: #fff;
}
.s-schedule-calendar__schedule-day {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  width: 100%;
  padding: 18px 20px;
  border: 0;
  border-bottom: 1px solid var(--s-schedule-border);
  background: #fff;
  color: inherit;
  text-align: left;
  cursor: pointer;
}
.s-schedule-calendar__schedule-day:last-child {
  border-bottom: 0;
}
.s-schedule-calendar__schedule-day:hover {
  background: #f8fbff;
}
.s-schedule-calendar__schedule-date {
  padding-top: 7px;
  font-weight: 600;
}
.s-schedule-calendar__schedule-tasks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.s-schedule-calendar__schedule-task {
  padding: 9px 12px;
}
.s-schedule-calendar__empty {
  padding: 72px 20px;
  color: #96a3b2;
  text-align: center;
}

@media (max-width: 900px) {
  .s-schedule-calendar__toolbar {
    align-items: stretch;
    flex-direction: column;
    padding: 14px;
  }
  .s-schedule-calendar__tools {
    justify-content: space-between;
  }
  .s-schedule-calendar__day {
    min-height: 100px;
    padding: 8px 6px;
  }
  .s-schedule-calendar__task {
    padding-inline: 5px;
  }
}
</style>
