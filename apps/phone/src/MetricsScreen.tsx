import {
  isFiniteNumber,
  removeEntriesForMetric,
  type AppData,
  type Metric,
} from "@goal-tracker/rules";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { newId } from "./newId";

type Props = {
  data: AppData;
  onChange: (next: AppData) => void;
};

export function MetricsScreen({ data, onChange }: Props) {
  const [draftName, setDraftName] = useState("");
  const [draftTarget, setDraftTarget] = useState("0");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingTarget, setEditingTarget] = useState("");

  function saveNew() {
    const name = draftName.trim();
    const weeklyTarget = Number(draftTarget);
    if (!name || !isFiniteNumber(weeklyTarget)) return;
    const metric: Metric = { id: newId("metric"), name, weeklyTarget };
    onChange({ ...data, metrics: [...data.metrics, metric] });
    setDraftName("");
    setDraftTarget("0");
  }

  function beginEdit(metric: Metric) {
    setEditingId(metric.id);
    setEditingName(metric.name);
    setEditingTarget(String(metric.weeklyTarget));
  }

  function commitEdit() {
    if (!editingId) return;
    const name = editingName.trim();
    const weeklyTarget = Number(editingTarget);
    if (!name || !isFiniteNumber(weeklyTarget)) return;
    onChange({
      ...data,
      metrics: data.metrics.map((m) =>
        m.id === editingId ? { ...m, name, weeklyTarget } : m,
      ),
    });
    setEditingId(null);
    setEditingName("");
    setEditingTarget("");
  }

  function removeMetric(id: string) {
    onChange({
      ...data,
      metrics: data.metrics.filter((m) => m.id !== id),
      entries: removeEntriesForMetric(data.entries, id),
    });
    if (editingId === id) {
      setEditingId(null);
      setEditingName("");
      setEditingTarget("");
    }
  }

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Metrics</Text>
      {data.metrics.length === 0 ? (
        <Text style={styles.empty}>No metrics yet.</Text>
      ) : (
        <FlatList
          data={data.metrics}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.row}>
              {editingId === item.id ? (
                <View style={styles.editFields}>
                  <TextInput
                    style={styles.input}
                    value={editingName}
                    onChangeText={setEditingName}
                  />
                  <TextInput
                    style={styles.input}
                    value={editingTarget}
                    onChangeText={setEditingTarget}
                    keyboardType="decimal-pad"
                  />
                </View>
              ) : (
                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.meta}>Weekly target: {item.weeklyTarget}</Text>
                </View>
              )}
              <View style={styles.actions}>
                {editingId === item.id ? (
                  <Pressable onPress={commitEdit} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => beginEdit(item)} style={styles.button}>
                    <Text style={styles.buttonText}>Edit</Text>
                  </Pressable>
                )}
                <Pressable onPress={() => removeMetric(item.id)} style={styles.buttonDanger}>
                  <Text style={styles.buttonTextOnDark}>Remove</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
      <View style={styles.composer}>
        <TextInput
          style={styles.input}
          placeholder="New metric name"
          value={draftName}
          onChangeText={setDraftName}
        />
        <TextInput
          style={styles.input}
          placeholder="Weekly target"
          value={draftTarget}
          onChangeText={setDraftTarget}
          keyboardType="decimal-pad"
        />
        <Pressable onPress={saveNew} style={styles.buttonPrimary}>
          <Text style={styles.buttonTextOnDark}>Add metric</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { width: "100%", gap: 12 },
  heading: { fontSize: 20, fontWeight: "600" },
  empty: { color: "#667" },
  row: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
    gap: 8,
  },
  name: { fontSize: 16 },
  meta: { color: "#667", marginTop: 2 },
  editFields: { gap: 8 },
  actions: { flexDirection: "row", gap: 8 },
  composer: { gap: 8, marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#e7e5e4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonPrimary: {
    backgroundColor: "#1c1917",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDanger: {
    backgroundColor: "#b91c1c",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: { color: "#1c1917", fontWeight: "600" },
  buttonTextOnDark: { color: "#fff", fontWeight: "600" },
});
