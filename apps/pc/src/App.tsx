import { type AppData } from "@goal-tracker/rules";
import { useEffect, useState } from "react";
import { GoalsPanel } from "./GoalsPanel";
import { MetricsPanel } from "./MetricsPanel";
import { loadAppData, saveAppData } from "./storage";

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
      <div className="app">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Goal Tracker</h1>
      </header>
      <main className="panels">
        <GoalsPanel data={data} onChange={(next) => void update(next)} />
        <MetricsPanel data={data} onChange={(next) => void update(next)} />
      </main>
    </div>
  );
}
