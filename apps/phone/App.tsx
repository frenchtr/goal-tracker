import { type AppData } from "@goal-tracker/rules";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { GoalsScreen } from "./src/GoalsScreen";
import { LogScreen } from "./src/LogScreen";
import { MetricsScreen } from "./src/MetricsScreen";
import { loadAppData, saveAppData } from "./src/storage";

export default function App() {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const loaded = await loadAppData();
      if (!cancelled) setData(loaded);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function update(next: AppData) {
    setData(next);
    await saveAppData(next);
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Goal Tracker</Text>
      <GoalsScreen data={data} onChange={(next) => void update(next)} />
      <MetricsScreen data={data} onChange={(next) => void update(next)} />
      <LogScreen data={data} onChange={(next) => void update(next)} />
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 24,
    paddingTop: 56,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});
