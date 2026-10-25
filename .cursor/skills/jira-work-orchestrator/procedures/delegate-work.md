# Procedure: Delegate and Coordinate Work

## Purpose
Break approved work into clear units and coordinate agents or child issues without duplicating work or creating conflicting edits.

## Capability contract
Use the configured Jira and agent-orchestration capabilities. The procedure does not assume a particular agent framework or issue-management API.

## Steps
1. Inspect existing subtasks/child issues and agent work before creating new work.
2. Define each work unit with a clear outcome, acceptance criteria, dependencies, expected artifacts, and an owner/agent where supported.
3. Create Jira subtasks or child issues only when required by the applicable workflow and only if an equivalent item does not already exist.
4. Give each worker:
   - Parent issue key and link.
   - Approved plan and acceptance criteria.
   - Relevant Confluence pages and Figma files from `procedures/document-work.md`.
   - Dependencies and integration contract.
   - Required branch/integration strategy.
   - Explicit exclusions, including whether tests may be authored in the current stage.
5. Choose orchestration adaptively:
   - Parallelize independent analysis, research, documentation, and disjoint work.
   - Sequence tasks with dependencies.
   - On a shared branch/worktree, never allow concurrent edits to the same files. Assign disjoint files or serialize implementation and integration.
   - For Epic work, use the Epic integration branch as the integration target; child Stories/Tasks may use their own branches. Subtasks do not get branches.
6. Track each delegated unit's state and inspect outputs before accepting them.
7. Feed relevant decisions and integration findings back to the parent issue and other workers.
8. Do not report a task as complete based solely on an agent's claim; inspect the resulting artifacts or tool-confirmed state.

## Failure
If delegation is unavailable, assignment cannot be made, or work conflicts, invoke `procedures/flag-work-item.md`, stop, and report the limitation.