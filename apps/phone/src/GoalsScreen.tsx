import type { AppData, Goal } from "@goal-tracker/rules";
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

export function GoalsScreen({ data, onChange }: Props) {
  const [draftName, setDraftName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  function saveNew() {
    const name = draftName.trim();
    if (!name) return;
    const goal: Goal = { id: newId("goal"), name };
    onChange({ ...data, goals: [...data.goals, goal] });
    setDraftName("");
  }

  function beginEdit(goal: Goal) {
    setEditingId(goal.id);
    setEditingName(goal.name);
  }

  function commitEdit() {
    if (!editingId) return;
    const name = editingName.trim();
    if (!name) return;
    onChange({
      ...data,
      goals: data.goals.map((g) => (g.id === editingId ? { ...g, name } : g)),
    });
    setEditingId(null);
    setEditingName("");
  }

  function removeGoal(id: string) {
    onChange({ ...data, goals: data.goals.filter((g) => g.id !== id) });
    if (editingId === id) {
      setEditingId(null);
      setEditingName("");
    }
  }

  return (
    <View style={styles.section}>
      <Text style={styles.heading}>Goals</Text>
      {data.goals.length === 0 ? (
        <Text style={styles.empty}>No goals yet.</Text>
      ) : (
        <FlatList
          data={data.goals}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.row}>
              {editingId === item.id ? (
                <TextInput
                  style={styles.input}
                  value={editingName}
                  onChangeText={setEditingName}
                  onSubmitEditing={commitEdit}
                  autoFocus
                />
              ) : (
                <Text style={styles.name}>{item.name}</Text>
              )}
              <View style={styles.actions}>
                {editingId === item.id ? (
                  <Pressable onPress={commitEdit} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                  </Pressable>
                ) : (
                  <Pressable onPress={() => beginEdit(item)} style={styles.button}>
                    <Text style={styles.buttonText}>Rename</Text>
                  </Pressable>
                )}
                <Pressable onPress={() => removeGoal(item.id)} style={styles.buttonDanger}>
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
          placeholder="New goal name"
          value={draftName}
          onChangeText={setDraftName}
          onSubmitEditing={saveNew}
        />
        <Pressable onPress={saveNew} style={styles.buttonPrimary}>
          <Text style={styles.buttonTextOnDark}>Add goal</Text>
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
