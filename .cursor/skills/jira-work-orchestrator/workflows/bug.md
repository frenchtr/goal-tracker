# Bug Workflow

## Scope and policy

Applies to Jira issue type `Bug`. Default status path: `To Do → Plan → Implement → Test → Review → Done`.

**Approval gate:** All plans require explicit user approval before code changes.

**Branch policy:** One bug-fix branch for the Bug's fix and tests. Subtasks do not get their own branches. Name the branch and PR per `procedures/naming-conventions.md`.

**Terminal policy:** Do not touch an issue already in `Done`. Do not transition this Bug to `Done`; stop in `Review` after creating the PR and notifying the user.

## To Do

### Goal
Determine whether the report is actionable and ready for investigation.

### Actions
1. Inspect the report, expected behavior, actual behavior, reproduction steps, environment, logs, attachments, and related issues.
2. Identify missing information that prevents meaningful investigation.
3. If critical information is missing and cannot be recovered from available artifacts, ask for it and stop in the current status.
4. Transition to `Plan` when there is enough information to investigate and propose a verification strategy.

### Exit criteria
The defect report is actionable, or available evidence supports a bounded investigation plan.

## Plan

### Goal
Establish the failure, likely cause, smallest safe fix, and verification plan.

### Actions
1. Inspect relevant implementation, configuration, history, logs, tests, and related issues using configured repository/diagnostic capabilities.
2. Reproduce the defect when feasible. Record exact reproduction steps and observed behavior.
3. Compare expected versus actual behavior. Distinguish confirmed root cause from hypotheses.
4. Propose the smallest appropriate fix and identify affected systems, risks, dependencies, and regression paths.
5. Define how the original failure will be verified and what regression tests are needed.
6. Present the diagnosis, evidence, proposed change, scope, risks, and verification plan to the user.
7. **Pause for explicit user approval.**
8. After approval, record or link the approved plan as appropriate.
9. Transition to `Implement`.

### Exit criteria
- The user approved the diagnosis/fix plan.
- The plan distinguishes verified facts from hypotheses.
- A fix strategy and verification approach are documented.
- Any inability to reproduce the issue is explicit; the plan does not claim reproduction.

## Implement

### Goal
Apply a narrow, reviewable fix.

### Actions
1. Inspect repository state and reuse existing work where appropriate.
2. Create or reuse a branch named `bugfix/<lowercase-issue-key>-<title-slug>` per `procedures/naming-conventions.md`, unless repository conventions specify another pattern.
3. Invoke `procedures/implement-work.md` with the approved Bug plan.
4. Keep changes narrowly scoped. Do not fold unrelated refactors or features into the fix.
5. **Do not author tests during this stage.** Preserve existing tests and test infrastructure.
6. Document the confirmed root cause and fix in the change context where appropriate.
7. Commit and push the fix; verify the remote branch and pushed commit.
8. Transition to `Test` only after the fix is pushed.

### Exit criteria
The approved fix is committed and pushed to the intended branch; implementation evidence is available.

## Test

### Goal
Prove that the reported defect is corrected and related behavior remains intact.

### Actions
1. Confirm the original reproduction steps or equivalent observable failure condition.
2. Invoke the existing `write-test-case` skill to describe expected regression behavior and relevant surrounding paths.
3. Invoke the existing `write-automated-test` skill to implement regression coverage where feasible and appropriate.
4. Run the relevant automated tests, regression paths, and project-defined checks through configured verification capabilities.
5. Commit and push test changes to the same Bug branch.
6. If the defect cannot be verified, required tests fail, or a required test cannot run, invoke `procedures/flag-work-item.md`, stop in `Test`, and report the evidence. Do not claim the Bug is fixed.
7. Transition to `Review` only when the fix is verified and required checks pass.

### Exit criteria
- The original defect is demonstrably addressed, or an explicitly accepted equivalent verification is documented.
- Regression coverage is added where appropriate and feasible.
- Required checks pass.
- Test changes are pushed to the Bug branch.

## Review

### Goal
Submit the fix for human review.

### Actions
1. Invoke `procedures/create-pull-request.md`.
2. Include the observed failure, root cause if confirmed, fix, regression coverage, test results, and known limitations.
3. Link the PR to the Jira issue.
4. Notify the user with the verified PR URL.
5. Do not merge or transition to `Done`.

### Exit criteria
A verified PR exists, is linked to the Bug, and the user has been notified. Remain in `Review`.

## Done

Do not touch the issue.

## Exceptions

Never state a root cause as fact without evidence. If the issue appears to be a feature request, security incident, data-loss risk, or unrelated defect, invoke `procedures/flag-work-item.md`, stop, and report the classification concern. Any material change to the approved fix plan requires renewed user approval.