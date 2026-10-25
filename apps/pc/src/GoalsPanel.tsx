import type { AppData, Goal } from "@goal-tracker/rules";
import { useState } from "react";
import { newId } from "./newId";

type Props = {
  data: AppData;
  onChange: (next: AppData) => void;
};

export function GoalsPanel({ data, onChange }: Props) {
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
    <section className="panel">
      <h2>Goals</h2>
      {data.goals.length === 0 ? (
        <p className="empty">No goals yet.</p>
      ) : (
        <ul className="list">
          {data.goals.map((goal) => (
            <li key={goal.id} className="list-row">
              {editingId === goal.id ? (
                <input
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEdit();
                  }}
                  autoFocus
                />
              ) : (
                <span>{goal.name}</span>
              )}
              <div className="row-actions">
                {editingId === goal.id ? (
                  <button type="button" onClick={commitEdit}>
                    Save
                  </button>
                ) : (
                  <button type="button" onClick={() => beginEdit(goal)}>
                    Rename
                  </button>
                )}
                <button type="button" className="danger" onClick={() => removeGoal(goal.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="composer">
        <input
          placeholder="New goal name"
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveNew();
          }}
        />
        <button type="button" className="primary" onClick={saveNew}>
          Add goal
        </button>
      </div>
    </section>
  );
}
