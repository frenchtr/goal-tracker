import { rulesPackageName } from "@goal-tracker/rules";

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Goal Tracker</h1>
      </header>
      <main>
        <p>PC</p>
        <p className="meta">Shared rules: {rulesPackageName}</p>
      </main>
    </div>
  );
}
