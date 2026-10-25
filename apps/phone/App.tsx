import { rulesPackageName } from "@goal-tracker/rules";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Tracker</Text>
      <Text>Phone</Text>
      <Text style={styles.meta}>Shared rules: {rulesPackageName}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  meta: {
    color: "#667",
  },
});
