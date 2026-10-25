import {
  isFiniteNumber,
  removeEntriesForMetric,
  type AppData,
  type Metric,
} from "@goal-tracker/rules";
import { useState } from "react";
import { newId } from "./newId";

type Props = {
  data: AppData;
  onChange: (next: AppData) => void;
};

export function MetricsPanel({ data, onChange }: Props) {
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
    <section className="panel">
      <h2>Metrics</h2>
      {data.metrics.length === 0 ? (
        <p className="empty">No metrics yet.</p>
      ) : (
        <ul className="list">
          {data.metrics.map((metric) => (
            <li key={metric.id} className="list-row">
              {editingId === metric.id ? (
                <div className="composer">
                  <input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <input
                    type="number"
                    step="any"
                    value={editingTarget}
                    onChange={(e) => setEditingTarget(e.target.value)}
                  />
                </div>
              ) : (
                <div>
                  <div>{metric.name}</div>
                  <div className="meta">Weekly target: {metric.weeklyTarget}</div>
                </div>
              )}
              <div className="row-actions">
                {editingId === metric.id ? (
                  <button type="button" onClick={commitEdit}>
                    Save
                  </button>
                ) : (
                  <button type="button" onClick={() => beginEdit(metric)}>
                    Edit
                  </button>
                )}
                <button
                  type="button"
                  className="danger"
                  onClick={() => removeMetric(metric.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="composer">
        <input
          placeholder="New metric name"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
        />
        <input
          type="number"
          step="any"
          placeholder="Weekly target"
          value={draftTarget}
          onChange={(e) => setDraftTarget(e.target.value)}
        />
        <button type="button" className="primary" onClick={saveNew}>
          Add metric
        </button>
      </div>
    </section>
  );
}
