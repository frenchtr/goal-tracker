import { describe, expect, it } from "vitest";
import {
  createEmptyData,
  datesInWeek,
  findDayEntry,
  isAfterToday,
  isEditableDay,
  isFiniteNumber,
  isMetricMet,
  removeEntriesForMetric,
  rulesPackageName,
  startOfWeekSunday,
  sumEnteredForMetric,
  toLocalDate,
  upsertDayEntry,
  type DayEntry,
  type MetricId,
} from "./index";

describe("shared rules package", () => {
  it("is the package both apps import", () => {
    expect(rulesPackageName).toBe("@goal-tracker/rules");
  });

  it("exposes empty app data and a finite-number check with no screen code", () => {
    expect(createEmptyData()).toEqual({ goals: [], metrics: [], entries: [] });
    expect(isFiniteNumber(1.5)).toBe(true);
    expect(isFiniteNumber(Number.NaN)).toBe(false);
    expect(isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false);
  });
});

describe("week starts on Sunday in local time", () => {
  it("returns the Sunday on or before a Wednesday", () => {
    // Wednesday 2026-10-21 local
    const wednesday = new Date(2026, 9, 21, 15, 30, 0);
    expect(startOfWeekSunday(wednesday)).toBe("2026-10-18");
    expect(datesInWeek("2026-10-18")).toEqual([
      "2026-10-18",
      "2026-10-19",
      "2026-10-20",
      "2026-10-21",
      "2026-10-22",
      "2026-10-23",
      "2026-10-24",
    ]);
  });

  it("keeps Sunday as the start when today is Sunday", () => {
    const sunday = new Date(2026, 9, 18, 8, 0, 0);
    expect(startOfWeekSunday(sunday)).toBe("2026-10-18");
  });

  it("rolls back from Saturday to that week's Sunday", () => {
    const saturday = new Date(2026, 9, 24, 23, 0, 0);
    expect(startOfWeekSunday(saturday)).toBe("2026-10-18");
  });
});

describe("current-week sum and met rules", () => {
  const metricId: MetricId = "m1";

  function entry(date: string, value: number): DayEntry {
    return { metricId, date, value };
  }

  it("sums only entered days from Sunday through today", () => {
    // Today = Wednesday 2026-10-21
    const today = new Date(2026, 9, 21, 12, 0, 0);
    const entries: DayEntry[] = [
      entry("2026-10-18", 2), // Sunday
      entry("2026-10-19", 3), // Monday
      // Tuesday blank — missing
      entry("2026-10-21", 5), // Wednesday
      entry("2026-10-22", 99), // Thursday future — excluded
      entry("2026-10-11", 50), // prior week — excluded
    ];
    expect(sumEnteredForMetric(entries, metricId, today)).toBe(10);
  });

  it("treats a blank day as missing and does not store it as zero", () => {
    const today = new Date(2026, 9, 21, 12, 0, 0);
    const entries: DayEntry[] = [entry("2026-10-18", 4)];
    expect(findDayEntry(entries, metricId, "2026-10-19")).toBeUndefined();
    expect(sumEnteredForMetric(entries, metricId, today)).toBe(4);
  });

  it("keeps days after today out of the sum", () => {
    const today = new Date(2026, 9, 20, 9, 0, 0); // Tuesday
    const entries: DayEntry[] = [
      entry("2026-10-18", 1),
      entry("2026-10-21", 100),
      entry("2026-10-24", 100),
    ];
    expect(sumEnteredForMetric(entries, metricId, today)).toBe(1);
    expect(isAfterToday("2026-10-21", today)).toBe(true);
  });

  it("marks the metric met when sum is greater than or equal to the target", () => {
    expect(isMetricMet(10, 10)).toBe(true);
    expect(isMetricMet(11, 10)).toBe(true);
    expect(isMetricMet(9, 10)).toBe(false);
    expect(isMetricMet(-1, -2)).toBe(true);
  });
});

describe("editable days and entry updates", () => {
  const metricId: MetricId = "m1";
  const today = new Date(2026, 9, 21, 12, 0, 0); // Wednesday

  it("allows Sunday through today and blocks future days", () => {
    expect(isEditableDay("2026-10-18", today)).toBe(true);
    expect(isEditableDay("2026-10-21", today)).toBe(true);
    expect(isEditableDay("2026-10-22", today)).toBe(false);
    expect(isEditableDay("2026-10-11", today)).toBe(false);
  });

  it("replaces a same-day number on upsert and can drop metric entries", () => {
    let entries = upsertDayEntry([], metricId, toLocalDate(today), 3);
    entries = upsertDayEntry(entries, metricId, toLocalDate(today), 7);
    expect(findDayEntry(entries, metricId, "2026-10-21")?.value).toBe(7);
    expect(entries).toHaveLength(1);
    expect(removeEntriesForMetric(entries, metricId)).toEqual([]);
  });
});
