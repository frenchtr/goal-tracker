# Jira Workflow Orchestrator

A modular, issue-key-driven production workflow for Jira Stories, Tasks, Bugs, and Epics.

## Contents

- `SKILL.md` — orchestration, routing, approvals, branch policy, failure handling, and transition verification.
- `workflows/story.md` — Story-specific workflow.
- `workflows/task.md` — Task-specific workflow.
- `workflows/bug.md` — Bug-specific workflow.
- `workflows/epic.md` — hybrid Epic coordination and integration workflow.
- `procedures/plan-work.md` — reusable planning.
- `procedures/document-work.md` — Confluence pages in space GT, and Figma diagrams and mockups in the Goal Tracker folder.
- `procedures/delegate-work.md` — adaptive coordination and delegation.
- `procedures/implement-work.md` — implementation on https://github.com/frenchtr/goal-tracker, including first-push setup when the repository is empty.
- `procedures/create-pull-request.md` — GitHub pull requests in `frenchtr/goal-tracker`.
- `procedures/transition-issue.md` — strict Jira transitions.
- `procedures/flag-work-item.md` — Jira flagging and failure recording.

## Install

Copy this directory into the location your agent runtime scans for skills, preserving relative paths. The directory name is `jira-work-orchestrator`.

The orchestrator references the existing `write-test-case` and `write-automated-test` skills by name. Pull requests are created by `procedures/create-pull-request.md`. Ensure the test skills, the Atlassian Confluence tools, the Figma tools, and the GitHub CLI are available to the runtime.

## Configuration

- Edit `workflows/*.md` to change what each issue type does at each status.
- Edit `procedures/*.md` to change reusable production activities.
- Edit `SKILL.md` only for shared orchestration rules.
- Project bindings live in the procedures. Change `procedures/document-work.md`, `procedures/implement-work.md`, or `procedures/create-pull-request.md` when the documentation space, Figma folder, or GitHub repository changes. Avoid putting those destinations into workflow policy.

## Policy defaults

- All issue types require explicit plan approval.
- Stories and Tasks use one branch each; Bugs use one bug-fix branch.
- Epics use an integration branch; child Story/Task branches merge into it according to the approved plan.
- Subtasks never get their own branches.
- Failures stop progress, flag the Jira work item, and record what went wrong.
- Only Jira-exposed transitions may be used; the result is verified after each transition.
- Automated execution stops in Review; it does not merge PRs or transition issues to Done.
- Issues already in Done are not touched.

## Assumptions to validate

- The Jira statuses are `To Do`, `Plan`, `Implement`, `Test`, `Review`, and `Done`.
- Jira issue types include `Story`, `Task`, `Bug`, and `Epic`.
- The agent has permissions for Jira, Confluence space GT, the Goal Tracker Figma folder, `frenchtr/goal-tracker`, testing, CI, and agent orchestration.
- The Jira flagging implementation can set the Flag feature and record details in a comment or supported issue note.

If names differ, edit workflow definitions. Keep transition execution strict: never invent, force, or approximate a transition.