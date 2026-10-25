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
  type Metric,
} from "@goal-tracker/rules";
import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  data: AppData;
  onChange: (next: AppData) => void;
  today?: Date;
};

export function LogScreen({ data, onChange, today: todayProp }: Props) {
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

  const metric: Metric | undefined = data.metrics.find((m) => m.id === selectedMetricId);

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
    if (!selectedMetricId || !metric) return;
    if (!isEditableDay(selectedDate, today)) return;
    const trimmed = draft.trim();
    if (trimmed === "") {
      // Leave blank as missing: remove any stored entry for that day.
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
      <View style={styles.section}>
        <Text style={styles.heading}>Log a day</Text>
        <Text style={styles.empty}>Add a metric before logging numbers.</Text>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Log a day</Text>
      <Text style={styles.meta}>Week of {startOfWeekSunday(today)} · editable through {todayLocal}</Text>
      <View style={styles.chipRow}>
        {data.metrics.map((m) => (
          <Pressable
            key={m.id}
            onPress={() => selectMetric(m.id)}
            style={[styles.chip, selectedMetricId === m.id && styles.chipActive]}
          >
            <Text style={selectedMetricId === m.id ? styles.chipTextActive : styles.chipText}>
              {m.name}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={styles.chipRow}>
        {weekDates.map((d) => (
          <Pressable
            key={d}
            onPress={() => selectDate(d)}
            style={[styles.chip, selectedDate === d && styles.chipActive]}
          >
            <Text style={selectedDate === d ? styles.chipTextActive : styles.chipText}>
              {d.slice(5)}
            </Text>
          </Pressable>
        ))}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Number (leave blank to clear)"
        value={draft}
        onChangeText={setDraft}
        keyboardType="decimal-pad"
      />
      <Pressable onPress={save} style={styles.buttonPrimary}>
        <Text style={styles.buttonTextOnDark}>Save day</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { width: "100%", gap: 12 },
  heading: { fontSize: 20, fontWeight: "600" },
  empty: { color: "#667" },
  meta: { color: "#667" },
  chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    backgroundColor: "#e7e5e4",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  chipActive: { backgroundColor: "#1c1917" },
  chipText: { color: "#1c1917", fontWeight: "600" },
  chipTextActive: { color: "#fff", fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  buttonPrimary: {
    backgroundColor: "#1c1917",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonTextOnDark: { color: "#fff", fontWeight: "600" },
});
