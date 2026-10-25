/** Package id both apps import. */
export const rulesPackageName = "@goal-tracker/rules";

/** Calendar day in the device local timezone, `YYYY-MM-DD`. */
export type LocalDate = string;

export type GoalId = string;
export type MetricId = string;

/** Named objective. No weekly target and no daily number. */
export type Goal = {
  id: GoalId;
  name: string;
};

/** Key result (or part of one): name, weekly target, at most one number per day. */
export type Metric = {
  id: MetricId;
  name: string;
  /** Finite weekly sum target (decimal, zero, and negative allowed). */
  weeklyTarget: number;
};

/** One finite number for one metric on one local calendar day. */
export type DayEntry = {
  metricId: MetricId;
  date: LocalDate;
  value: number;
};

/** Document both apps persist through a storage adapter. */
export type AppData = {
  goals: Goal[];
  metrics: Metric[];
  entries: DayEntry[];
};

/**
 * Persistence seam. Apps supply AsyncStorage or localStorage.
 * This package does not implement either.
 */
export type StorageAdapter = {
  load(): Promise<AppData | null>;
  save(data: AppData): Promise<void>;
};

export function createEmptyData(): AppData {
  return { goals: [], metrics: [], entries: [] };
}

export function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

/** Format a Date as a local `YYYY-MM-DD` (device local time). */
export function toLocalDate(date: Date): LocalDate {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Parse a local date string into year/month/day parts. */
export function parseLocalDate(date: LocalDate): {
  year: number;
  month: number;
  day: number;
} {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!match) {
    throw new Error(`Invalid LocalDate: ${date}`);
  }
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
  };
}

/** Build a Date at local midnight for a LocalDate. */
export function localDateToDate(date: LocalDate): Date {
  const { year, month, day } = parseLocalDate(date);
  return new Date(year, month - 1, day);
}

/**
 * Sunday that starts the current week for `today`, in local time.
 * Week is Sunday through Saturday.
 */
export function startOfWeekSunday(today: Date): LocalDate {
  const local = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const dayOfWeek = local.getDay(); // 0 = Sunday
  local.setDate(local.getDate() - dayOfWeek);
  return toLocalDate(local);
}

/** Inclusive list of local dates from week Sunday through Saturday. */
export function datesInWeek(weekStartSunday: LocalDate): LocalDate[] {
  const start = localDateToDate(weekStartSunday);
  const dates: LocalDate[] = [];
  for (let i = 0; i < 7; i += 1) {
    const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
    dates.push(toLocalDate(d));
  }
  return dates;
}

export function compareLocalDates(a: LocalDate, b: LocalDate): number {
  if (a === b) return 0;
  return a < b ? -1 : 1;
}

/** True when `date` is after today in local calendar time. */
export function isAfterToday(date: LocalDate, today: Date): boolean {
  return compareLocalDates(date, toLocalDate(today)) > 0;
}

/**
 * A day is editable when it is in the current week (Sun–Sat local)
 * and on or before today. Days after today are not editable.
 */
export function isEditableDay(date: LocalDate, today: Date): boolean {
  const weekStart = startOfWeekSunday(today);
  const weekEnd = datesInWeek(weekStart)[6]!;
  if (compareLocalDates(date, weekStart) < 0) return false;
  if (compareLocalDates(date, weekEnd) > 0) return false;
  return !isAfterToday(date, today);
}

/** Find the single entry for a metric on a day, if any. */
export function findDayEntry(
  entries: readonly DayEntry[],
  metricId: MetricId,
  date: LocalDate,
): DayEntry | undefined {
  return entries.find((e) => e.metricId === metricId && e.date === date);
}

/**
 * Sum entered numbers for a metric from this week's Sunday through today.
 * Blank days are missing: they are not stored as zero and are left out of the sum.
 * Days after today stay out of the sum.
 */
export function sumEnteredForMetric(
  entries: readonly DayEntry[],
  metricId: MetricId,
  today: Date,
): number {
  const weekStart = startOfWeekSunday(today);
  const todayLocal = toLocalDate(today);
  let sum = 0;
  for (const entry of entries) {
    if (entry.metricId !== metricId) continue;
    if (compareLocalDates(entry.date, weekStart) < 0) continue;
    if (compareLocalDates(entry.date, todayLocal) > 0) continue;
    sum += entry.value;
  }
  return sum;
}

/** Met when the Sunday-through-today sum is greater than or equal to the target. */
export function isMetricMet(sum: number, weeklyTarget: number): boolean {
  return sum >= weeklyTarget;
}

/**
 * Upsert one number for a metric on a day. Replaces any previous value that day.
 * Does not invent a zero for blank days — omit the call to leave the day missing.
 */
export function upsertDayEntry(
  entries: readonly DayEntry[],
  metricId: MetricId,
  date: LocalDate,
  value: number,
): DayEntry[] {
  const next = entries.filter((e) => !(e.metricId === metricId && e.date === date));
  next.push({ metricId, date, value });
  return next;
}

/** Remove every entry belonging to a metric (used when a metric is removed). */
export function removeEntriesForMetric(
  entries: readonly DayEntry[],
  metricId: MetricId,
): DayEntry[] {
  return entries.filter((e) => e.metricId !== metricId);
}
