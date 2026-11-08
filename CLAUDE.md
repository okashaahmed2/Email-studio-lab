# Email Studio

This folder is a studio for planning and writing email campaigns for **DataPath Academy**, an online data science training institute. The current focus is the launch of the **12-week Data Science Bootcamp**.

## Folders

- **brand/**: DataPath Academy's voice, tone, colours, logos and other brand guidelines.
- **leads/**: Lists of potential students and notes about who they are (sample or test data only).
- **campaigns/**: Campaign plans and the email drafts for each campaign.
- **notes/**: Research, ideas and decisions, such as which skills and tools we chose.

## Rules

1. **Write in plain English.** Use short sentences and everyday words, and explain any technical term.
2. **Never send email to real people.** Write drafts only. Any test sends go to test addresses, never to real leads or students.
   - Sending through Resend (the email service) is allowed only to Resend's test addresses, which end in `@resend.dev`, and to my own address, `okashaahmed120@gmail.com`. Never send to anyone else.
   - A guard (an automatic check that blocks any send to other addresses) enforces this. It lives in `.claude/hooks/send-guard.mjs`.
3. **Ask me before deleting anything.** This includes files, folders and lines of text in existing documents.

## Brand voice

@brand/voice.md
