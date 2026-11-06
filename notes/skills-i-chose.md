# Skills I chose

Searched skills.sh on 6 Nov 2026 with `npx skills find` for: email marketing, email sequence, campaign plan, resend. Star counts are from GitHub on the same day. Nothing has been installed yet.

## Use these

**1. Writing campaigns: anthropics/knowledge-work-plugins**
- Skills to look at: `campaign-plan` (3.4K installs) and `email-sequence` (3K installs). There is also `draft-outreach`.
- Published by Anthropic, the company that makes Claude. The repo has about 35,000 stars and was updated today.
- Why: this is an official publisher, so these skills are the least likely to contain anything sneaky. They cover planning a campaign and writing it as a series of emails, which is the core of the studio.
- If you want a second opinion on copywriting, coreyhaines31/marketingskills is the best-known community option (about 59,000 stars, `email-sequence` has 55K installs). It's run by one person, though, not a company.

**2. Sending email: resend/resend-skills**
- Skills to look at: `resend` (24K installs) and `resend-cli` (14K installs). The same company also publishes `react-email` for building email layouts and `email-best-practices`.
- Published by Resend, the email-sending company itself, under its official GitHub organization. The repo has only about 210 stars, but it was updated today.
- Why: a skill that sends email will touch your API key and your mailing list, so it should come from the company whose service it uses. The low star count doesn't worry me here, because the official publisher matters more than popularity.

## Avoid these

**1. caffeinelabs/skills → `extension-email-marketing`**
- It's the top result for "email marketing" with 30,000 installs, but its GitHub repo has just **2 stars** and no description. Most of the commits come from an automated bot.
- Why I wouldn't trust it: when a skill has thousands of installs but almost no stars, the install count may have been pushed up by automation and doesn't show real people choosing it. There's also no explanation of what the skill does or who is behind it.

**2. mbfinotti/sales-skills → `cold-email-deliverability`, `sales-outbound-sequence` and similar**
- Each of these shows about 33,000 installs, but the repo has **3 stars**, was created only two months ago (Sept 2026), and has one person contributing.
- Why I wouldn't trust it: getting 33K installs in two months with almost no stars doesn't add up. It's also a sales and cold-outreach kit, not an email marketing kit, so cold-email advice could push you toward sending practices that hurt deliverability or break anti-spam rules.

(Also skipped: claude-office-skills/skills `email-marketing`. It isn't suspicious, but it hasn't been updated since January 2026.)

## How I decided: three things to check before installing any skill

1. **Who publishes it?** Prefer the official organization: `anthropics/` for Claude-related skills, or the company whose service the skill uses, such as `resend/` for Resend. A random account copying a well-known name is a warning sign.
2. **Do the numbers add up?** Compare installs on skills.sh with stars on GitHub, and check how old the repo is and when it was last updated. Lots of installs with very few stars, or a brand-new repo with huge numbers, suggests the numbers have been inflated. A repo that hasn't been updated in months may be abandoned.
3. **Read the SKILL.md (and any scripts) before installing.** A skill is instructions plus files that Claude will follow and run. Make sure it only does what it says. Look closely at anything that runs commands, downloads things, or asks for API keys or your contact list.

---

# Round 2: course launch and education marketing

Searched on 6 Nov 2026 with `npx skills find course launch` and `npx skills find education marketing`. The second search found **nothing**, so I also ran `npx skills find education` to fill the gap. Nothing has been installed.

**Overall:** results here are much weaker than in round 1. No official publisher (Anthropic, Resend or any other company) has a course-launch or education-marketing skill, and most results have under 100 installs. The round 1 picks (Anthropic for campaigns, Resend for sending) are still the foundation. The skills below are optional add-ons for course-specific angles.

## Use these (with caution)

**1. Course launches: guia-matthieu/clawfu-skills → `launch-formula`**
- 228 installs. The GitHub repo has 150 stars and was last updated in October 2026. Its description says it has "172 expert marketing skills."
- Why: it's the most established result that is actually about running a launch. The installs and stars roughly match, and the repo is maintained.
- Caution: it's run by one person, and the repo includes a `scripts` folder. Read that folder before installing.

**2. Education marketing: kostja94/marketing-skills → `education-program`**
- 1K installs. The GitHub repo has about 1,090 stars and was updated on 4 Nov 2026.
- Why: it has the strongest numbers of anything on-topic, and installs and stars line up. It's a general marketing collection with 160+ skills, so expect general advice rather than deep course-specific advice.

**Worth a look, not yet trusted:** `skillmedev/course-creator-launch-system` has exactly what you'd want: `launch-email-sequence`, `course-sales-page` and `course-outline-architect`. But it has 1 star and 1 install. It's not suspicious, just unproven. Read its files and judge for yourself.

## Avoid these

**1. kursku/skills → `course-launch-strategy`**
- It's the top result for "course launch," but it has only 1 install. The repo describes itself as a catalog of 2,300+ skills (in Portuguese) and hasn't been updated since March 2026.
- Why I wouldn't trust it: thousands of skills from one person almost certainly means they were mass-generated, not written and tested. It also looks abandoned.

**2. samber/developer-relations-skills → `developer-education-strategy`**
- It shows 13,700 installs, but the repo has **8 stars** and is only two months old. The same publisher's event skills from round 1 had the same pattern: 6.5K installs and 4 stars.
- Why I wouldn't trust it: the numbers don't add up. It's also about teaching software developers (developer relations), not marketing courses to students.

(Also skipped: `pauljbernard/content@learning-market-research`. Its GitHub repo doesn't exist, so there's nothing to inspect.)

## How I decided

I used the same three checks as round 1: who publishes it, whether the installs and stars make sense together, and reading the skill's files before installing. With no official publishers in this round, the second and third checks matter even more.
