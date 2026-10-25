---
name: jira-work-orchestrator
description: Drive a Jira Story, Task, Bug, or Epic through its configured production workflow from an issue key. Inspect current state, follow the matching workflow definition, delegate reusable activities to specialized skills, verify outputs and transitions, flag failures in Jira, and stop at explicit approval or failure gates.
---

# Jira Workflow Orchestrator

## Purpose

Given a Jira issue key (for example, `LSP-12`), advance the issue through its configured production workflow with minimal user intervention. Follow the issue-type workflow and stop only at defined gates, blockers, or terminal states.

## Production workflow principle

This skill defines **production policy and orchestration**, not implementation details for individual tools or technologies.

- Workflow files define **what must happen, when, and what evidence is required**.
- Procedure skills define **how a reusable production activity is performed**.
- Tool-specific skills or adapters define **how to interact with Jira, Git hosting, documentation, design, testing, CI, and agent systems**.
- Keep tool names, vendor-specific steps, API details, and project-specific implementation choices out of the core pipeline whenever a capability skill can encapsulate them.
- Workflow files may name capability skills by stable role (for example, `create-work-documentation`, `create-pull-request`, or `flag-work-item`). Those skills own the integration-specific implementation.
- If a capability is unavailable, stop and report the gap; do not silently substitute a different technology or pretend the capability ran.

## Sources of truth

- Jira is the source of truth for issue type, current status, fields, links, subtasks, and available transitions.
- The matching file in `workflows/` is the source of truth for issue-type behavior.
- The procedure files in `procedures/` describe reusable production activities.
- Tool-specific skills are the source of truth for integration details.
- Existing specialized skills remain the source of truth for their activities. Do not copy their implementation instructions into this skill.
- Repository conventions and issue-specific approved decisions take precedence over generic examples in this skill.

## Required input

- One Jira issue key.
- If no issue key is provided, ask for it.
- Do not ask the user to repeat information that can be retrieved from Jira or linked project artifacts.

## Execution protocol

1. **Load the issue.** Fetch the issue by key. Confirm it exists and retrieve its issue type, status, summary, description, parent, links, subtasks, available transitions, and relevant fields.
2. **Select workflow.** Map the issue type to `workflows/story.md`, `workflows/task.md`, `workflows/bug.md`, or `workflows/epic.md`. If the type is unsupported or ambiguous, stop and report the issue key, observed type, and needed configuration.
3. **Inspect prior work.** Before creating anything, inspect existing comments, linked documentation, diagrams, branches, commits, pull requests, subtasks, and test evidence relevant to the current stage. Reuse valid work; do not create duplicates.
4. **Resume from actual status.** Start with the instructions for the issue's current status. Never assume the issue is in `To Do`, and never repeat completed actions without a reason.
5. **Execute stage actions.** Follow the workflow's entry conditions, actions, required outputs, gates, and exit criteria. Invoke reusable procedures or capability skills by name. Delegate only when the runtime actually supports agent delegation.
6. **Respect approval gates.** The configured policy requires explicit user approval of the plan for every supported issue type before plan-dependent execution begins. Present a concise plan and wait. Do not interpret silence, a prior unrelated approval, or a status change as approval.
7. **Verify stage completion.** Check evidence for every required output before transitioning. A status name alone is not evidence that work is complete.
8. **Transition strictly.** Query Jira's currently available transitions and use only a transition Jira exposes that reaches the intended next status. Verify the resulting status after the transition. Never force, simulate, or invent a transition.
9. **Continue autonomously.** After a successful transition, continue through the next stage in the same run unless a defined gate, blocker, or terminal status is reached.
10. **Report outcome.** Summarize completed work, current status, links to created artifacts, any delegated work still in progress, and the precise blocker or approval needed.

## Global policy

### Approval and autonomy

- **All plans require approval.** Stories, Tasks, Bugs, and Epics must pause after presenting their plan and before carrying out plan-dependent work.
- Approval applies to the plan presented. Material changes to scope, risk, architecture, acceptance criteria, or approach require renewed approval.
- Routine execution decisions within the approved plan are autonomous.
- Never ask for approval where no gate is defined; do not silently bypass a defined gate.

### Branch strategy

- **Story:** one feature branch for the Story's implementation and tests.
- **Task:** one task branch for the Task's implementation and tests.
- **Subtask:** no branch of its own. A subtask contributes to its parent's branch and integration strategy.
- **Epic:** the only exception to the single-branch rule. The Epic owns an integration branch. Child Stories and Tasks may have their own branches; their changes are merged into the Epic integration branch according to the approved integration plan. Subtasks still do not get their own branches.
- Bugs use one bug-fix branch unless a project-specific policy explicitly maps them to another branch strategy.
- Inspect repository conventions and existing branches first. Never create branches that conflict with these rules.
- Branch naming defaults are configured in the relevant workflow/procedure files, not treated as universal pipeline logic.

### Delegation

- Use adaptive orchestration: parallelize independent analysis, research, documentation, and tasks that do not mutate the same resources; sequence dependent tasks.
- Avoid concurrent edits to the same files or shared mutable resources.
- Give each agent the parent issue key, approved plan, acceptance criteria, relevant decisions, branch/integration rules, expected outputs, and constraints.
- Inspect delegated results before treating a subtask as complete. Keep parent and child work coherent.
- Do not claim work is delegated, completed, pushed, or verified unless the available tools confirm it.

### Failure handling

- **Stop on failure.** When a required action, tool call, test, transition, or delegated task fails, do not continue advancing the workflow.
- Invoke `flag-work-item` to flag the affected Jira work item and record what went wrong. The failure record must identify:
  1. Failed action or stage.
  2. Observed error or evidence, distinguishing facts from hypotheses.
  3. Work completed and preserved.
  4. Impact on delivery or verification.
  5. Exact decision or action needed to unblock.
- Use the Jira Flag feature through the capability skill. Add a comment or supported issue note containing the failure details if the flag itself cannot store a message. Do not assume a flag has been set until the tool confirms it.
- After flagging, stop at the current Jira status and report the issue key, flag confirmation, and failure summary.
- If flagging itself fails, stop and report both the original failure and the flagging failure. Do not claim the item was flagged.
- Do not automatically retry after a failure under this policy. A user may authorize a retry or change the policy.
- If an operation may have succeeded despite a timeout, inspect current state before taking another action to avoid duplicate side effects. If the outcome remains ambiguous, flag and stop.

### Production abstraction

Keep vendor-specific details behind capability skills. The pipeline should request capabilities such as:
- Retrieve/update/transition a Jira issue.
- Create and link documentation or visualizations.
- Create or coordinate child work.
- Create/use a repository branch and commit/push changes.
- Write test cases and automated tests.
- Run verification checks.
- Create a pull request.
- Flag a work item and record a failure.

Do not hard-code a particular documentation platform, design tool, Git host, CI provider, test framework, or agent orchestration product into the core policy. The default capability implementations may use the project's installed tools, but swapping a tool should normally require changing the capability skill—not the workflow pipeline.

### Artifact hygiene and safety

- Reuse existing documentation, subtasks, branches, tests, and PRs where appropriate.
- Link artifacts back to the Jira issue. Never invent URLs or report a link unless returned by a relevant tool or verified.
- Never commit directly to protected branches.
- Do not delete or overwrite user work to resolve a conflict. Stop, flag the work item, and report the conflict.
- Never transition a Story, Task, or Bug to `Done` in the default workflow. `Review` ends automated execution and awaits human review.
- The Epic workflow also stops in `Review`; do not transition it to `Done` automatically.
- Never touch an issue already in `Done`: no edits, comments, transitions, artifact creation, or delegation.
- Do not merge PRs unless an explicit workflow permits it and the user has authorized the action.
- Do not mark a parent complete while required child work remains incomplete.
- Do not invent acceptance criteria, test results, approvals, reproduction results, or completion evidence.

## Workflow loading and status mapping

Load exactly one workflow file based on the issue type:
- Story → `workflows/story.md`
- Task → `workflows/task.md`
- Bug → `workflows/bug.md`
- Epic → `workflows/epic.md`

The default status path is `To Do → Plan → Implement → Test → Review → Done`, but actual transitions must be confirmed against Jira. If a required transition is not available, invoke `flag-work-item`, stop at the current status, and report the available transitions. Do not guess an equivalent status.

## Completion report

Report:
- Issue key, type, and final/current status.
- Stages completed in this run.
- Verified links to relevant plan, documentation, diagrams, child issues, branch, tests, and PR, when available.
- Delegated work status and any incomplete child work.
- If stopped: flag status, failure/blocker, what was preserved, and the next decision or action required.

Keep the report factual and concise.