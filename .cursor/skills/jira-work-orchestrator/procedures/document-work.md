# Capability Procedure: Create Work Documentation

## Purpose
Create and link the written documentation, diagrams, and UI mockups that materially support delivery.

## Destinations

Written documentation goes to Confluence. Diagrams and UI mockups go to Figma. Do not put either artifact somewhere else, and do not invent a URL.

| Artifact | Where |
| --- | --- |
| Written documentation | Confluence space **GT**: https://frenchtr.atlassian.net/wiki/spaces/GT |
| Diagrams, flows, architecture sketches | Figma folder: https://www.figma.com/files/team/1326373479987384288/folder/677150084?fuid=1326373477458841201 |
| UI mockups | Same Figma folder |

Figma placement for that folder URL:

- `planKey`: `team::1326373479987384288`
- `projectId`: `677150084` (the id in `/folder/677150084`; pass it as `projectId` so the file is not created in Drafts)
- Diagrams and flows: a FigJam file (`editorType` `figjam`)
- UI mockups: a Figma Design file (`editorType` `design`)

## Steps
1. Inspect existing Confluence pages in space `GT` and existing Figma files already linked from the Jira issue. Reuse and update a matching page or file. Do not create a duplicate.
2. Decide which artifacts materially improve understanding or delivery. Skip an artifact the approved plan does not need, and say why.
3. Keep new and updated artifacts consistent with the approved plan. Do not introduce unapproved scope.
4. For a diagram, flow, or architecture sketch, load and follow `figma-create-new-file` before creating a file, then load and follow `figma-generate-diagram`. Create or update the FigJam file in the folder above. Name it with the Jira issue key and a short title, for example `GT-12 Checkout flow`.
5. For a UI mockup, load and follow `figma-create-new-file`, then `figma-generate-design` and `figma-use`. Create or update the Design file in the same folder, with the issue key in the file name.
6. Confirm `whoami` includes plan `team::1326373479987384288` before creating a Figma file. If that plan is missing, stop. Do not fall back to Drafts.
7. For written documentation, create or update a page in Confluence space `GT` on `frenchtr.atlassian.net` with the Atlassian Confluence tools. Resolve `cloudId` with `getAccessibleAtlassianResources` when the session does not already have it. Title the page with the Jira issue key and a short title. Put the page under the parent Epic's page when one already exists in `GT`; otherwise create it in the space.
8. The page should record the decisions, acceptance criteria, and links a reader needs to deliver the issue, including links to the Figma files from this procedure. Do not paste an unapproved plan or invent scope.
9. Link each verified Confluence and Figma URL from the Jira issue.
10. Open the returned URL and confirm it is the page or file just written, in space `GT` or in folder `677150084`.
11. Return those verified links. For any expected artifact that was not created, say why it was unnecessary.

## Failure
If Confluence or Figma is unavailable, the GT space or the Figma folder cannot be used, or an artifact operation fails, invoke `procedures/flag-work-item.md`, stop at the current Jira status, and report the failure. Do not invent URLs, and do not substitute another space, folder, or tool.
