# Goal Tracker

## Cursor Cloud specific instructions

Node 24.16.0 is the image runtime. `npm install` runs during the environment Build from the repository root. Run it again after a dependency change.

- `npm test` runs the shared week-rule tests in `packages/rules`.
- `npm run typecheck` checks every workspace. `npm run lint` checks the PC app. `npm run build:pc` builds the Vite app.
- `npm run dev:pc` serves the PC app on port 5173. For Cloud Agents bind all interfaces with `npm run dev -w @goal-tracker/pc -- --host 0.0.0.0 --port 5173` (nested `npm run dev:pc -- --host …` drops the flags).
- `npm run dev:phone` starts Expo. Android Studio and the Android SDK are not installed. Installable Android packages come from EAS, using the `preview` profile in `apps/phone/eas.json`.
- The phone and the PC keep separate copies of the data. Phone storage is AsyncStorage. PC storage is localStorage.
