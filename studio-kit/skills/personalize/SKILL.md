---
name: personalize
description: Write a version of each campaign email for every lead group in leads/leads.csv. Use when a campaign's emails are final and you want one copy per group.
argument-hint: "[campaign folder]"
context: fork
allowed-tools: Read, Glob, Grep, Write
---

# Personalize campaign emails by lead group

Campaign folder: $ARGUMENTS

## Step 1: Check the campaign folder

- If no campaign folder was given above, **stop**. Use Glob on `campaigns/*/` to find the campaign folders, list them, and ask which one to use. Don't write anything.
- Accept either a full path (`campaigns/spring-launch`) or just the name (`spring-launch`).
- If the folder doesn't exist or has no `emails/*.md` files, stop, say so and list the campaign folders that do exist.

## Step 2: Read the groups from the leads file

- Read `leads/leads.csv`. Find the column named `group` in the header row. Don't assume its position.
- Collect every distinct, non-empty value in that column. These are the groups.
- **Never assume the group names.** Use exactly what the file says, even if it changes later.
- The file has names and addresses, but only use the group names. Never copy a lead's name or address into an email.

## Step 3: Read the rules and the source emails

Read these before writing:

- `brand/voice.md` for voice, allowed facts and banned claims.
- `.claude/rules/emails.md` for the email file rules.
- The campaign's `plan.md`, if there is one, for what each email is for and any notes about the groups.
- Any notes about the groups in the `leads/` folder, such as `leads/CLAUDE.md`.
- Every file in `<campaign folder>/emails/` (only that folder, not `groups/`).

## Step 4: Write one version per email per group

For each source email and each group, write a new version. Change only two things:

1. **The opening line**: the first sentence or two after the greeting (for example `Hi {{first_name}},`). Make it speak to that group's situation. Use what `plan.md` or the leads notes say about each group. If they say nothing, base the opening on the group name only, and don't invent facts about the group.
2. **One example**: pick one existing example, sentence or bullet in the body and reword it so it fits that group. Change only one.

Keep everything else exactly the same, word for word:

- The `Subject:` and `Preview:` lines
- The structure: same sections, headings, bullets and order
- The one main link, including its button text and URL
- The sign-off and the footer
- All `{{...}}` placeholders, for example `{{first_name}}`

The new wording must follow `brand/voice.md`:

- Follow the voice described there. Use short sentences and everyday words, and explain any technical term.
- Only use the true facts listed in the voice guide. Don't invent facts about a group (no numbers, no stats, no claims about what they will earn or where they will work).
- None of the banned words or claims. No promises the voice guide doesn't allow, and no pressure or fake urgency.
- Follow the style rules in `.claude/rules/emails.md`, such as how to refer to the person named in the sign-off and how to punctuate lists.

## Step 5: Save the files

- Save each version to `<campaign folder>/groups/<group>/emails/<same file name as the source>`.
  For example, `campaigns/spring-launch/groups/<group>/emails/E1-welcome.md`.
- Use the group name exactly as written in `leads/leads.csv` for the folder name.
- **Don't overwrite existing files.** Before writing, use Glob to check `<campaign folder>/groups/**/emails/*.md`. If any target file already exists, stop before writing anything and list those files, so the user can decide whether to replace them.
- Write drafts only. Never send any email.

## Step 6: Reply with a short summary only

When done, reply with only:

- How many files you wrote (for example, "Wrote 12 files: 4 emails × 3 groups.")
- One example opening line per group, from any one email, labelled with the group name.

Don't include the full emails or any other commentary.
