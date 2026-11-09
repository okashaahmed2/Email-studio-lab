# studio-kit

A Claude Code plugin for planning, personalizing and reviewing email campaigns for any client. It holds the reusable tools only. Each client's own content stays in that client's repo.

## What's inside

| Part | File | What it does |
|---|---|---|
| Skill | `skills/personalize/SKILL.md` | `/studio-kit:personalize <campaign>` writes one copy of each campaign email for every group in `leads/leads.csv`. It changes only the opening line and one example. |
| Hook | `hooks/hooks.json`, `hooks/send-guard.mjs` | A send guard that runs before every Resend tool and blocks unsafe sends (see **Safety** below). |
| Agent | `agents/email-reviewer.md` | `studio-kit:email-reviewer` checks email files against the client's brand voice and email rules. It can only read files (Read, Glob, Grep). |
| Review script | `scripts/review.mjs`, `review/findings.schema.json` | Runs a review with no one typing and saves the findings to `review/findings.json` in the client repo. It exits with code 1 if any finding is high severity. |

## Install

Try it for one session, from the client repo:

```
claude --plugin-dir ../studio-kit
```

Or install it for good, inside Claude Code:

```
/plugin marketplace add ../studio-kit
/plugin install studio-kit@studio-kit
```

Once installed, the names get a `studio-kit:` prefix, for example `/studio-kit:personalize`.

Run the review script from the client repo, pointing at your `studio-kit` folder:

```
node ../studio-kit/scripts/review.mjs campaigns/<name>
```

## What each client repo needs

- `brand/voice.md`: voice, true facts we can state, words to avoid, banned claims and the sign-off
- `.claude/rules/emails.md`: the email file rules (subject, preview, link, footer, file names, style)
- `leads/leads.csv` with a `group` column (test data only)
- `campaigns/<name>/emails/*.md`, plus an optional `campaigns/<name>/plan.md`
- A Resend MCP server named exactly `resend`
- `MY_EMAIL` set in `.claude/settings.local.json`, for example `{ "env": { "MY_EMAIL": "you@example.com" } }`

## Why brand voice, leads and campaigns aren't in the kit

- **They belong to the client.** Each client has its own voice, facts, banned claims and sign-off. One shared plugin serves every client, so putting one client's content in it could leak their facts or sign-off into another client's emails.
- **Leads are personal data.** They shouldn't be copied into a shared kit that gets reused and passed around.
- **Updates stay safe.** Updating the plugin never touches a client's work, and a client's changes never need a new plugin version.

## Safety: the send guard

The guard runs before every tool whose name starts with `mcp__resend__`. It works as an **allow list**: anything not listed here is blocked.

- **Read-only tools are allowed:** any tool starting with `list-` or `get-`, such as `list-emails` or `get-email`.
- **`send-email` and `send-batch-emails`** are allowed only if every to, cc and bcc address ends in `@resend.dev` or matches `MY_EMAIL`. If no recipients can be found, the call is blocked.
- **Every other Resend tool is blocked by default**, with a reason that names the tool. This includes broadcasts, automations, inbox replies and forwards, and anything that creates, updates or removes data, such as `create-template` or `update-contact`. A new tool that Resend adds later is blocked too, until you add it to the allow list in `hooks/send-guard.mjs`.

Limits to know about:

- **The server must be named `resend`.** If it has another name, or Resend comes from a plugin (tool names then look like `mcp__plugin_…_resend__…`), the guard never runs and nothing is blocked.
- **If `MY_EMAIL` isn't set**, only `@resend.dev` addresses are allowed.
- **Some read-only tools are blocked too,** because their names don't start with `list-` or `get-`. One example is `search-inbox-threads`.
