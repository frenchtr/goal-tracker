# Capability Procedure: Create Pull Request

## Purpose
Open a GitHub pull request for approved work in `frenchtr/goal-tracker` and return the URL GitHub assigns.

## Repository

- Host: GitHub
- Repository: https://github.com/frenchtr/goal-tracker (`frenchtr/goal-tracker`)
- Use the GitHub CLI (`gh`) to inspect and create pull requests.
- Do not merge the pull request.

## Preconditions
- The work branch is pushed to `origin`.
- Required implementation and tests for the current stage are on that branch.
- If the remote has no base branch yet, complete the empty-repository bootstrap in `procedures/implement-work.md` before opening a pull request.

## Steps
1. Inspect open pull requests on `frenchtr/goal-tracker` for this head branch and Jira issue key. Reuse an existing pull request when it already represents this work, and update its title or body if they are stale.
2. Choose the base branch:
   - The Epic integration branch, when the approved integration plan says this child branch merges there.
   - Otherwise the repository default branch (`main` after the empty-repository bootstrap).
3. Push the head branch to `origin` if the remote branch is missing or behind the commits that should be reviewed.
4. Create the pull request with `gh pr create` against `frenchtr/goal-tracker`.
   - Title includes the Jira issue key and a short summary of the change.
   - Body names the Jira issue, summarizes the change, lists test evidence, and states known limitations.
5. Read back the pull request with `gh` and use only the URL it returns.
6. Link that URL from the Jira issue.
7. Tell the user the pull request is ready for review and give them the verified URL.
8. Do not merge the pull request, and do not transition the Jira issue to `Done`.

## Failure
If `gh` is unauthenticated, `frenchtr/goal-tracker` is unavailable, or the pull request cannot be created, invoke `procedures/flag-work-item.md`, stop at the current Jira status, and report the error. Do not claim a pull request exists without a URL returned by GitHub.
