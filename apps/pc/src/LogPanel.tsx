import {
  datesInWeek,
  findDayEntry,
  isEditableDay,
  isFiniteNumber,
  startOfWeekSunday,
  toLocalDate,
  upsertDayEntry,
  type AppData,
  type LocalDate,
} from "@goal-tracker/rules";
import { useMemo, useState } from "react";

type Props = {
  data: AppData;
  onChange: (next: AppData) => void;
  today?: Date;
};

export function LogPanel({ data, onChange, today: todayProp }: Props) {
  const [today] = useState(() => todayProp ?? new Date());
  const todayLocal = toLocalDate(today);
  const weekDates = useMemo(
    () => datesInWeek(startOfWeekSunday(today)).filter((d) => isEditableDay(d, today)),
    [today],
  );
  const [selectedMetricId, setSelectedMetricId] = useState<string | null>(
    data.metrics[0]?.id ?? null,
  );
  const [selectedDate, setSelectedDate] = useState<LocalDate>(todayLocal);
  const [draft, setDraft] = useState("");

  function selectMetric(id: string) {
    setSelectedMetricId(id);
    const existing = findDayEntry(data.entries, id, selectedDate);
    setDraft(existing ? String(existing.value) : "");
  }

  function selectDate(date: LocalDate) {
    setSelectedDate(date);
    if (!selectedMetricId) return;
    const existing = findDayEntry(data.entries, selectedMetricId, date);
    setDraft(existing ? String(existing.value) : "");
  }

  function save() {
    if (!selectedMetricId) return;
    if (!isEditableDay(selectedDate, today)) return;
    const trimmed = draft.trim();
    if (trimmed === "") {
      onChange({
        ...data,
        entries: data.entries.filter(
          (e) => !(e.metricId === selectedMetricId && e.date === selectedDate),
        ),
      });
      return;
    }
    const value = Number(trimmed);
    if (!isFiniteNumber(value)) return;
    onChange({
      ...data,
      entries: upsertDayEntry(data.entries, selectedMetricId, selectedDate, value),
    });
  }

  if (data.metrics.length === 0) {
    return (
      <section className="panel">
        <h2>Log a day</h2>
        <p className="empty">Add a metric before logging numbers.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <h2>Log a day</h2>
      <p className="meta">
        Week of {startOfWeekSunday(today)} · editable through {todayLocal}
      </p>
      <div className="chip-row">
        {data.metrics.map((m) => (
          <button
            key={m.id}
            type="button"
            className={selectedMetricId === m.id ? "primary" : undefined}
            onClick={() => selectMetric(m.id)}
          >
            {m.name}
          </button>
        ))}
      </div>
      <div className="chip-row">
        {weekDates.map((d) => (
          <button
            key={d}
            type="button"
            className={selectedDate === d ? "primary" : undefined}
            onClick={() => selectDate(d)}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="composer">
        <input
          placeholder="Number (leave blank to clear)"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="button" className="primary" onClick={save}>
          Save day
        </button>
      </div>
    </section>
  );
}
