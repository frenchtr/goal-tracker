# Capability Procedure: Flag Work Item

## Purpose
Use Jira's Flag feature to make blocked or failed work visible and record what went wrong.

## Required inputs
- Jira issue key.
- Failed stage/action.
- Observed error or evidence.
- Work completed and preserved.
- Impact and next required action.

## Steps
1. Retrieve the latest issue state.
2. Use Jira's supported Flag feature to flag the issue as impeded/blocked according to the site's configuration.
3. Record the failure details in a Jira comment or supported issue note if the flag itself cannot hold explanatory text. Include:
   - **Failure:** what action failed and at which stage.
   - **Evidence:** exact error/output or observed state; label hypotheses as hypotheses.
   - **Preserved work:** changes/artifacts that remain available.
   - **Impact:** what cannot safely proceed.
   - **Unblock:** the specific decision, permission, input, or repair needed.
4. Verify the flag is present and the failure note was saved.
5. Return confirmation and the note/comment link when available.

## Rules
- Do not claim the issue is flagged unless Jira confirms it.
- Do not change the issue's workflow status merely to flag it.
- If the flag operation fails, report that failure alongside the original failure. Do not retry automatically under the default stop-on-failure policy.