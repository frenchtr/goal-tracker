import {
  datesInWeek,
  findDayEntry,
  isAfterToday,
  isMetricMet,
  startOfWeekSunday,
  sumEnteredForMetric,
  toLocalDate,
  type AppData,
} from "@goal-tracker/rules";
import { useState } from "react";

type Props = {
  data: AppData;
  today?: Date;
};

export function WeekReviewPanel({ data, today: todayProp }: Props) {
  const [today] = useState(() => todayProp ?? new Date());
  const weekStart = startOfWeekSunday(today);
  const days = datesInWeek(weekStart);
  const todayLocal = toLocalDate(today);

  return (
    <section className="panel">
      <h2>Week review</h2>
      <p className="meta">
        {weekStart} – {days[6]} · today {todayLocal}
      </p>
      {data.metrics.length === 0 ? (
        <p className="empty">No metrics to review.</p>
      ) : (
        <ul className="list">
          {data.metrics.map((metric) => {
            const sum = sumEnteredForMetric(data.entries, metric.id, today);
            const met = isMetricMet(sum, metric.weeklyTarget);
            return (
              <li key={metric.id} className="review-card">
                <div className="review-title">
                  <strong>{metric.name}</strong>
                  <span>
                    {sum} / {metric.weeklyTarget} · {met ? "Met" : "Not met"}
                  </span>
                </div>
                <div className="day-grid">
                  {days.map((date) => {
                    if (isAfterToday(date, today)) {
                      return (
                        <span key={date} className="day muted">
                          {date}: not yet open
                        </span>
                      );
                    }
                    const entry = findDayEntry(data.entries, metric.id, date);
                    return (
                      <span key={date} className="day">
                        {date}: {entry ? entry.value : "missing"}
                      </span>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
