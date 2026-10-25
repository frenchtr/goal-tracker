# Epic Workflow

## Scope and policy

Applies to Jira issue type `Epic`. The Epic is a hybrid: it coordinates child work and may own genuine cross-cutting implementation or integration work. Do not duplicate implementation already owned by child Stories or Tasks.

Default status path: `To Do → Plan → Implement → Test → Review → Done`.

**Approval gate:** All plans require explicit user approval before plan-dependent decomposition, child creation, or implementation begins.

**Branch policy:** The Epic owns an integration branch. Child Stories and Tasks may each have their own branch; their completed changes are merged into the Epic integration branch according to the approved integration plan. Subtasks never get their own branches. Name the Epic branch and PR per `procedures/naming-conventions.md`.

**Terminal policy:** Do not touch an issue already in `Done`. Do not transition this Epic to `Done` automatically; stop in `Review` and request human review of the overall deliverable.

## To Do

### Goal
Understand the outcome the Epic is intended to deliver.

### Actions
1. Inspect the Epic description, outcome, acceptance criteria, linked issues, existing child issues, dependencies, and project conventions.
2. Identify whether the Epic has clear outcome-level acceptance criteria and whether existing child issues cover the known scope.
3. Ask for missing product decisions that materially affect scope; otherwise proceed to `Plan`.

### Exit criteria
The Epic's intended outcome is clear enough to propose decomposition and integration criteria.

## Plan

### Goal
Create an approved delivery plan spanning child work and Epic-level integration.

### Actions
1. Define the intended outcome, in-scope and out-of-scope behavior, Epic-level acceptance criteria, risks, dependencies, and integration strategy.
2. Inspect existing child issues before creating new ones. Reuse, update, or link existing issues where appropriate; avoid duplicates.
3. Propose child Stories, Tasks, and Bugs; identify ownership, sequencing, dependencies, milestones, and cross-cutting work that genuinely belongs to the Epic.
4. Define how completion will be evaluated across children, including required end-to-end or integration checks.
5. Present the plan to the user and **pause for explicit approval**.
6. After approval, invoke `procedures/document-work.md` for Epic-level documentation and diagrams that materially help delivery, create or update child issues, and link supporting artifacts as warranted.
7. Create or reuse one Epic integration branch named `integration/<lowercase-issue-key>-<title-slug>` per `procedures/naming-conventions.md`, unless repository conventions specify another pattern. Verify that it is appropriate for the target repository and does not overwrite unrelated work.
8. Invoke `procedures/delegate-work.md` to coordinate child work and communicate the approved plan and integration contract.
9. Transition to `Implement` when the approved decomposition is actionable and coordination is established.

### Exit criteria
- Epic plan explicitly approved.
- Outcome-level acceptance criteria and integration checks are defined.
- Child issues are linked and have clear scope, dependencies, and ownership.
- Cross-cutting work is distinguished from child-owned work.
- Integration branch and merge strategy are established.
- Coordination can begin without unresolved blocking decisions.

## Implement

### Goal
Coordinate delivery and perform only Epic-owned integration work.

### Actions
1. Inspect child issue statuses, branches, PRs, delivery evidence, and blockers.
2. Coordinate independent child work in parallel; sequence dependent work.
3. Child Stories and Tasks use their own branches. Merge their completed changes into the Epic integration branch according to the approved integration plan. Do not merge directly into protected branches unless the project explicitly requires and authorizes it.
4. Subtasks do not get branches; their work contributes to the parent Story/Task branch or the Epic's explicitly assigned work.
5. Implement cross-cutting changes assigned to the Epic and included in the approved plan on the Epic integration branch.
6. Keep parent/child context aligned. Material changes to scope require renewed approval.
7. Do not transition forward while required child work or Epic-owned implementation remains incomplete.
8. Transition to `Test` when required child work has reached its integration point and Epic-owned changes are integrated and pushed.

### Exit criteria
- Required child work has reached its defined integration point.
- Required child changes are merged into the Epic integration branch.
- Epic-owned implementation, if any, is committed and pushed.
- Cross-cutting dependencies are resolved or explicitly documented as blockers.
- The overall deliverable is ready for integration verification.

## Test

### Goal
Verify the Epic's outcome, not merely the existence of completed child issues.

### Actions
1. Review child test evidence and acceptance status.
2. Run or coordinate Epic-level integration/end-to-end checks defined in the approved plan.
3. Verify that Epic-level acceptance criteria are satisfied and cross-cutting changes work together.
4. Identify incomplete, blocked, or failing child work. Do not mark the Epic ready for review while required acceptance criteria remain unmet.
5. Record evidence and link relevant child PRs, test results, and reports.
6. Stop and flag the Epic if required verification fails or cannot be performed.
7. Transition to `Review` when the outcome is verified.

### Exit criteria
- Required child deliverables and checks meet their agreed criteria.
- Epic-level acceptance criteria are verified with evidence.
- Required integration checks pass.
- Remaining limitations are documented and do not violate acceptance criteria.

## Review

### Goal
Present the complete deliverable for human review.

### Actions
1. If the Epic owns code changes requiring a pull request, invoke `procedures/create-pull-request.md` for the Epic integration branch. Do not create duplicate pull requests for child work.
2. Compile a concise summary of the delivered outcome, child issues, relevant PRs, test evidence, unresolved risks, and accepted limitations.
3. Link the summary and supporting artifacts to the Epic.
4. Notify the user that the Epic-level deliverable is ready for review.
5. Do not merge PRs or transition the Epic to `Done`.

### Exit criteria
The Epic-level outcome and evidence are linked and the user is notified. Remain in `Review`.

## Done

Do not touch the issue.

## Exceptions

Do not infer that child work is complete from parent status or counts; inspect actual states and acceptance evidence. If a required child is blocked, invoke `procedures/flag-work-item.md` on the Epic and stop. If the actual status or required transition is unsupported, flag and stop.