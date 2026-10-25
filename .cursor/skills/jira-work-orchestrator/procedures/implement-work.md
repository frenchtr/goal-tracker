# Capability Procedure: Implement Work

## Purpose
Execute an approved plan on a branch in the Goal Tracker GitHub repository.

## Repository

- Host: GitHub
- Repository: https://github.com/frenchtr/goal-tracker (`frenchtr/goal-tracker`)
- Use `git` for commits and branches and `gh` for GitHub repository state.
- Do not push implementation to a different remote or repository.

The remote starts empty. The first implementation that needs a branch must bootstrap the repository before feature work, as described below.

## Steps
1. Inspect repository state, remotes, the working tree, current branches, and existing changes. Preserve uncommitted user work.
2. Confirm `origin` is `https://github.com/frenchtr/goal-tracker`. If `origin` is missing, add it. If `origin` points somewhere else, stop and flag the issue. Do not retarget it.
3. If `git ls-remote origin` shows no refs, bootstrap the empty repository before creating a work branch:
   1. Add a `.gitignore` if one does not exist. Ignore secrets (`.env`, credential files, keys), dependency and build output for the stack in the approved plan, and OS junk. Keep project source and `.cursor/skills` tracked.
   2. Add a `README.md` with the project name if one does not exist.
   3. Commit that bootstrap together with existing project files that belong in the repository. Do not commit secrets. Do not scaffold application code in this commit; product changes belong on the work branch.
   4. Push the commit to `origin` `main` and set upstream. This is the only direct commit allowed on the default branch, and only while the remote has no commits. That push creates the base branch an empty GitHub repository needs before other branches and pull requests.
4. If the remote already has commits, skip bootstrap. Branch from the current default branch, or from the Epic integration branch when the approved integration plan says to.
5. Select the branch strategy from the issue-type workflow:
   - Story: one feature branch.
   - Task: one housekeeping branch.
   - Bug: one bug-fix branch.
   - Subtask: no branch of its own; use the parent branch/integration strategy.
   - Epic: one Epic integration branch; child branches may be merged into it according to the approved integration plan.
6. Determine the branch name from `procedures/naming-conventions.md` (repository conventions may override when they do not conflict with the issue-type branch strategy):
   - Story: `feature/<lowercase-issue-key>-<title-slug>`
   - Task: `housekeeping/<lowercase-issue-key>-<title-slug>`
   - Bug: `bugfix/<lowercase-issue-key>-<title-slug>`
   - Epic integration: `integration/<lowercase-issue-key>-<title-slug>`
7. Reuse an existing appropriate branch if it belongs to this work and is safe to continue. Do not overwrite unrelated work.
8. Implement only the approved scope and follow project conventions.
9. Coordinate contributors on the designated branch. Partition work to avoid simultaneous edits to the same files; serialize conflicting work.
10. Follow the issue workflow's test-stage restrictions. Never remove existing tests to satisfy a restriction.
11. Inspect changes for scope, correctness, accidental modifications, and compatibility with parent/child contracts.
12. Commit and push to `origin` only when the workflow requires it. Verify the intended branch and commit exist on `frenchtr/goal-tracker` before reporting success.

## Failure
Stop at the current Jira status. Invoke `procedures/flag-work-item.md`, preserve evidence, and report the blocker. If bootstrap, commit, or push may have succeeded despite a timeout, inspect the remote before trying again.
