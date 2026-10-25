# Task Workflow

## Scope and policy

Applies to Jira issue type `Task`. Default status path: `To Do → Plan → Implement → Test → Review → Done`.

**Approval gate:** All plans require explicit user approval before plan-dependent execution.

**Branch policy:** A Task gets one task branch. If it is a child of an Epic, its branch is merged into the Epic integration branch according to the approved integration plan. Subtasks do not get branches.

**Terminal policy:** Do not touch an issue already in `Done`. Do not transition this Task to `Done`; stop in `Review` after the deliverable is ready for review.

## To Do

Inspect the description, expected outcome, acceptance criteria, linked issues, and existing artifacts. If material information is missing, ask for it and stop. Otherwise transition to `Plan`.

## Plan

1. Invoke `procedures/plan-work.md`.
2. Define outcome, scope, non-goals, affected systems, dependencies, risks, work breakdown, and verification.
3. Present the plan and **pause for explicit user approval**.
4. After approval, invoke `procedures/document-work.md` where documentation or visuals are useful.
5. Create subtasks only when separately tracked coordination is needed. Subtasks do not get branches.
6. Transition to `Implement` when the approved plan is actionable.

## Implement

1. Inspect repository state and existing branches.
2. Create or reuse one branch named `task/<lowercase-issue-key>-<work-item-title>`, unless repository conventions specify another pattern.
3. Invoke `procedures/implement-work.md`.
4. Coordinate contributors on the same Task branch; avoid concurrent edits to the same files.
5. Do not author tests during this stage if the project workflow separates implementation and testing. Preserve existing tests.
6. Commit and push implementation; verify the remote branch and commit.
7. If this Task belongs to an Epic, follow its approved integration plan.
8. Transition to `Test` when implementation is pushed and ready for verification.

## Test

1. Identify observable acceptance criteria and relevant user/system paths.
2. Invoke `write-test-case` and `write-automated-test` when tests are appropriate.
3. Run required automated tests and project-defined checks.
4. Commit and push test changes to the same Task branch, or follow the approved Epic integration strategy.
5. If required checks fail or cannot run, invoke `procedures/flag-work-item.md`, stop, and report the blocker.
6. Transition to `Review` when required verification passes.

## Review

1. Invoke `procedures/create-pull-request.md` if the Task's changes require a pull request.
2. Link the PR and evidence to the Jira issue.
3. If no PR is appropriate under the project's integration model, link integration evidence and explain why.
4. Notify the user that the Task is ready for review.
5. Do not merge or transition to `Done`.

## Done

Do not touch the issue.

## Exceptions

For any required action failure, invoke `procedures/flag-work-item.md`, stop at the current status, and report the blocker. If the actual status or required transition is unsupported, flag and stop.