# Naming Conventions: Branches and Pull Requests

## Purpose

Name every work branch and pull request from the Jira issue type, key, and title so agents and reviewers can find work without guessing.

These defaults apply unless a repository-specific convention explicitly overrides them. Prefer the repository convention when one exists and does not conflict with the issue-type branch strategy in `SKILL.md`.

## Shared rules

### Title slug

Build `<title-slug>` from the Jira issue summary:

1. Lowercase the entire string.
2. Replace spaces and underscores with hyphens.
3. Remove characters that are not letters, digits, or hyphens.
4. Collapse repeated hyphens.
5. Trim leading and trailing hyphens.
6. Keep the slug short enough for a usable branch name; drop filler words only when the name would be unwieldy, and preserve the distinctive nouns.

Examples:

| Jira summary | Title slug |
|---|---|
| Gain fury when slashing obstacles | `gain-fury-when-slashing-obstacles` |
| Fix week rollover off-by-one | `fix-week-rollover-off-by-one` |
| Upgrade CI Node version | `upgrade-ci-node-version` |

### Issue key casing

| Context | Issue key form | Example |
|---|---|---|
| Branch name | lowercase | `lsp-12` |
| PR title | uppercase | `LSP-12` |

### PR title body

After the type tag and uppercase issue key, use the Jira summary with normal title casing (preserve the issue's wording; do not force Title Case or all-lowercase). Do not repeat the type tag in the summary text.

## Branch names

Pattern: `<prefix>/<lowercase-issue-key>-<title-slug>`

All branch names are lowercase.

| Work item type | Prefix | Pattern |
|---|---|---|
| Story | `feature` | `feature/<issue-key>-<story-title>` |
| Bug | `bugfix` | `bugfix/<issue-key>-<bug-title>` |
| Task | `housekeeping` | `housekeeping/<issue-key>-<task-title>` |
| Epic | `integration` | `integration/<issue-key>-<epic-title>` |

Examples:

- Story `LSP-12` / "Gain fury when slashing obstacles" → `feature/lsp-12-gain-fury-when-slashing-obstacles`
- Bug `LSP-34` / "Fix week rollover off-by-one" → `bugfix/lsp-34-fix-week-rollover-off-by-one`
- Task `LSP-56` / "Upgrade CI Node version" → `housekeeping/lsp-56-upgrade-ci-node-version`
- Epic `LSP-10` / "Player progression systems" → `integration/lsp-10-player-progression-systems`

Subtasks do not get branches. Use the parent Story, Task, Bug, or Epic branch.

## Pull request titles

Pattern: `[<TYPE-TAG>] <UPPERCASE-ISSUE-KEY> <Issue summary>`

| Work item type | Type tag | Pattern |
|---|---|---|
| Story | `FEATURE` | `[FEATURE] <KEY> <story title>` |
| Bug | `BUGFIX` | `[BUGFIX] <KEY> <bug title>` |
| Task | `HOUSEKEEPING` | `[HOUSEKEEPING] <KEY> <task title>` |
| Epic | `INTEGRATION` | `[INTEGRATION] <KEY> <epic title>` |

Examples:

- `[FEATURE] LSP-12 Gain fury when slashing obstacles`
- `[BUGFIX] LSP-34 Fix week rollover off-by-one`
- `[HOUSEKEEPING] LSP-56 Upgrade CI Node version`
- `[INTEGRATION] LSP-10 Player progression systems`

When updating an existing PR for the same branch and issue, keep this title pattern. Do not invent a second PR for the same head branch.

## Pull request body (minimum)

Regardless of type, the body must include:

1. Jira issue key and link when available.
2. Short summary of the change.
3. Test evidence (commands run, results, or linked artifacts).
4. Known limitations or follow-ups.

## Ownership

- Branch creation follows `procedures/implement-work.md` and the issue-type workflow.
- PR creation and title application follow `procedures/create-pull-request.md`.
- Workflow files may restate the matching prefix for their issue type; this file is the shared source of truth for the full matrix and slug rules.
