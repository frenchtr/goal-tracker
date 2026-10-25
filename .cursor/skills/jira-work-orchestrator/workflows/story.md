# Story Workflow

## Scope and policy

Applies to Jira issue type `Story`. Default status path: `To Do → Plan → Implement → Test → Review → Done`.

**Approval gate:** All plans require explicit user approval. The Story must pause after presenting the plan and before creating plan-dependent artifacts, subtasks, or implementation work.

**Branch policy:** One feature branch for the Story's implementation and tests. Subtasks do not get their own branches. Name the branch and PR per `procedures/naming-conventions.md`.

**Terminal policy:** Do not touch an issue already in `Done`. Do not transition this Story to `Done`; stop in `Review` after creating the PR and notifying the user.

## To Do

### Goal
Establish readiness for planning.

### Actions
1. Inspect the description, acceptance criteria, linked issues, comments, attachments, and project conventions.
2. Identify ambiguities, dependencies, and missing information that materially affect scope.
3. If the issue cannot be planned responsibly, ask only for the missing information and stop in the current status.
4. Transition to `Plan` when sufficient information is available.

### Exit criteria
The issue is sufficiently understood to draft a solution plan.

## Plan

### Goal
Produce an approved, actionable solution and break the work into coordinated units.

### Actions
1. Invoke `procedures/plan-work.md`.
2. Present the proposed solution, scope, assumptions, acceptance criteria, dependencies, risks, likely system impact, testing approach, and proposed subtasks.
3. **Pause and request explicit user approval.** Do not proceed until approved.
4. After approval, invoke `procedures/document-work.md` for diagrams, UI mockups, and written documentation.
5. Link documentation and visualizations from the Jira issue using verified URLs.
6. Invoke `procedures/delegate-work.md` to create required subtasks, assign them to appropriate agents/owners where supported, and begin orchestration.
7. Provide each delegated worker the approved plan, parent acceptance criteria, relevant documentation, shared branch policy, and integration constraints.
8. Wait for required planning artifacts and delegated work setup to succeed. Independent work may proceed in parallel; dependent or conflicting work must be sequenced.
9. Transition to `Implement` when the plan is approved, required documentation and visualizations are linked or explicitly deemed unnecessary, required subtasks are created, and implementation can begin coherently.

### Exit criteria
- User approval of the current plan is recorded.
- Required documentation and visualizations are linked, or the plan explains why an artifact is not applicable.
- Required subtasks exist with clear scope, acceptance criteria, ownership, and dependencies.
- Implementation agents have the necessary context and a viable coordination plan.

## Implement

### Goal
Implement the approved scope.

### Actions
1. Inspect the repository, existing branches, and current work before creating a branch.
2. Create or reuse one parent feature branch named `feature/<lowercase-issue-key>-<title-slug>` per `procedures/naming-conventions.md`, unless repository conventions specify another pattern.
3. Invoke `procedures/implement-work.md`.
4. Orchestrate implementation agents on the shared parent branch. Parallelize only when files/resources do not conflict; serialize conflicting changes and integration.
5. **Do not write tests during this stage.** Do not ask implementation agents to add tests. Do not remove existing tests.
6. Review changes for alignment with the approved plan and parent acceptance criteria.
7. Commit and push the implementation to the feature branch. Verify the remote branch and pushed commit.
8. Transition to `Test` only after implementation outputs are present and pushed.

### Exit criteria
- Approved implementation is committed and pushed to the intended feature branch.
- Required implementation subtasks have reached their agreed handoff point.
- No tests were authored during this stage.
- Changes are coherent with the parent Story and its child work.

## Test

### Goal
Verify the Story's high-level user paths and acceptance criteria.

### Actions
1. Analyze the Story in behavior-driven-development terms: actor, context, action, observable outcome.
2. Invoke the existing `write-test-case` skill to write test cases, prioritizing high-level user paths and acceptance criteria.
3. Once test cases are written, invoke the existing `write-automated-test` skill to automate those cases.
4. Run the required automated tests and project-defined checks through the configured verification capability.
5. Commit and push test changes to the same parent feature branch. Verify the push.
6. If tests fail, a required test cannot run, or a required tool fails, invoke `procedures/flag-work-item.md`, stop in `Test`, and report the blocker. Do not proceed to Review.
7. Transition to `Review` when required test cases, automated tests, and checks meet the project's defined pass criteria.

### Exit criteria
- Test cases cover the highest-value user paths and relevant acceptance criteria.
- Automated tests exist for the required cases.
- Required tests and checks pass, with evidence available.
- Test work is pushed to the parent feature branch.

## Review

### Goal
Prepare the change for human review.

### Actions
1. Invoke `procedures/create-pull-request.md`.
2. Ensure the PR references the Jira issue and summarizes the change, testing evidence, and known limitations.
3. Link the PR to the Jira issue if this has not already been done.
4. Notify the user that the PR is ready for review and provide its verified URL.
5. **Do not merge the PR. Do not transition the issue to `Done`.**

### Exit criteria
A verified PR exists, is linked to the Jira issue, and the user has been notified. Remain in `Review`.

## Done

Do not touch the issue. No actions, reads for further work, edits, comments, transitions, artifact creation, or delegation.

## Exceptions

For any required action failure, invoke `procedures/flag-work-item.md` to flag the issue and record what went wrong, stop at the current status, and report the failure. If the plan changes materially after approval, pause for renewed approval. If the actual status or a required transition is unavailable, flag and stop.