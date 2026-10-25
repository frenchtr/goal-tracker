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
import { StyleSheet, Text, View } from "react-native";

type Props = {
  data: AppData;
  today?: Date;
};

export function WeekReviewScreen({ data, today: todayProp }: Props) {
  const [today] = useState(() => todayProp ?? new Date());
  const weekStart = startOfWeekSunday(today);
  const days = datesInWeek(weekStart);
  const todayLocal = toLocalDate(today);

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Week review</Text>
      <Text style={styles.meta}>
        {weekStart} – {days[6]} · today {todayLocal}
      </Text>
      {data.metrics.length === 0 ? (
        <Text style={styles.empty}>No metrics to review.</Text>
      ) : (
        data.metrics.map((metric) => {
          const sum = sumEnteredForMetric(data.entries, metric.id, today);
          const met = isMetricMet(sum, metric.weeklyTarget);
          return (
            <View key={metric.id} style={styles.card}>
              <Text style={styles.name}>{metric.name}</Text>
              <Text style={styles.meta}>
                {sum} / {metric.weeklyTarget} · {met ? "Met" : "Not met"}
              </Text>
              <View style={styles.dayRow}>
                {days.map((date) => {
                  if (isAfterToday(date, today)) {
                    return (
                      <Text key={date} style={styles.dayMuted}>
                        {date.slice(5)}: —
                      </Text>
                    );
                  }
                  const entry = findDayEntry(data.entries, metric.id, date);
                  return (
                    <Text key={date} style={styles.day}>
                      {date.slice(5)}: {entry ? entry.value : "missing"}
                    </Text>
                  );
                })}
              </View>
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { width: "100%", gap: 12 },
  heading: { fontSize: 20, fontWeight: "600" },
  empty: { color: "#667" },
  meta: { color: "#667" },
  card: {
    borderWidth: 1,
    borderColor: "#e7e5e4",
    borderRadius: 8,
    padding: 12,
    gap: 6,
  },
  name: { fontSize: 16, fontWeight: "600" },
  dayRow: { gap: 2 },
  day: { fontSize: 13 },
  dayMuted: { fontSize: 13, color: "#a8a29e" },
});
