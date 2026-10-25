# Procedure: Plan Work

## Purpose
Create a proposed, reviewable plan for a Jira issue before execution begins.

## Inputs
- Jira issue and issue type.
- Description, acceptance criteria, linked work, relevant repository/project context.
- Applicable issue-type workflow.

## Steps
1. Restate the desired outcome and observable acceptance criteria.
2. Inspect existing artifacts and implementation to avoid duplicate work.
3. Identify scope, non-goals, assumptions, dependencies, risks, and unresolved decisions.
4. Propose an approach at the level needed to approve the work. Include architecture/interface implications when relevant.
5. Identify work packages and which tasks can run independently versus which must be sequenced.
6. Define verification: test cases, automated tests, regression paths, integration checks, or non-code validation as appropriate.
7. Identify documentation and visualization needs. Written pages go to Confluence space GT (https://frenchtr.atlassian.net/wiki/spaces/GT). Diagrams and UI mockups go to the Goal Tracker Figma folder (https://www.figma.com/files/team/1326373479987384288/folder/677150084?fuid=1326373477458841201). Name the specific pages or files this work needs, or state that none are needed. `procedures/document-work.md` creates them after approval.
8. Present the plan in a concise format and ask for explicit approval.

## Output
A proposed plan containing:
- Outcome and acceptance criteria.
- Scope and non-goals.
- Approach and affected systems.
- Dependencies, risks, assumptions, and open questions.
- Work packages and orchestration strategy.
- Verification strategy.
- Required artifacts.

## Gate
Do not perform plan-dependent actions until the user explicitly approves the presented plan. If approval includes changes, revise the plan and obtain approval of the revised version.

## Failure
If required context is inaccessible or the plan depends on an unresolved product decision, stop and state what is missing.