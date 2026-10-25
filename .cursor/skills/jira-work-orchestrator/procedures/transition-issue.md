# Procedure: Transition a Jira Issue

## Purpose
Safely transition an issue only after its current stage's exit criteria have been met.

## Steps
1. Fetch the latest issue state and available transitions.
2. Confirm the issue is not in `Done`. If it is, perform no further actions.
3. Confirm every required exit criterion for the current stage has evidence.
4. Find an available transition whose destination exactly matches the intended next status.
5. Execute that transition using the configured Jira capability.
6. Fetch the issue again and verify the resulting status.
7. Report the verified transition.

## Strict policy
- Never infer a transition from status names or a generic workflow diagram.
- Never force a transition, edit status fields directly, or select an approximate destination.
- If the intended transition is unavailable, invoke `procedures/flag-work-item.md`, stop, and report the available transitions and current status.
- If the transition call fails, invoke `procedures/flag-work-item.md` and stop. If the call times out or its result is ambiguous, inspect issue state before taking any further action to avoid duplicate transitions.
- Do not transition to `Done` in the default workflows.

## Output
Confirmed previous status, intended status, actual resulting status, and any transition error.