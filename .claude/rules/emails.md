---
paths:
  - "campaigns/**/emails/*.md"
---

# Email file rules

These rules apply to every email file in any campaign's `emails/` folder, and only to those files.

Every email file must follow all of the rules below.

## 1. Subject and preview come first

- The first line is `Subject: ...`. The subject text after `Subject: ` is 50 characters or fewer.
- The second line is `Preview: ...`. The preview text after `Preview: ` is 90 characters or fewer.

The preview is the short line many inboxes show next to or under the subject.

## 2. Greet the reader by first name

Greet the reader with `{{first_name}}`, for example "Hi {{first_name}},".

`{{first_name}}` is a placeholder. The email tool swaps it for each reader's first name when it sends the email.

## 3. Use exactly one main link

- Each email has exactly one main link. It is the one thing we ask the reader to do.
- Write it as `[Button text](https://datapath.example/bootcamp)`. Change only the button text.
- Don't add any other links in the body. The unsubscribe placeholder in the footer doesn't count as a main link.

## 4. End with the sign-off, then the footer

The email ends with our sign-off from `brand/voice.md`, then the two-line footer. Nothing comes after the footer.

The end of every email looks like this:

```
Keep learning,
Ukasha Ahmed, Lead Mentor
The DataPath Academy Team

You're getting this because you joined the DataPath Academy waitlist.
DataPath Academy, {{company_address}} · Unsubscribe: {{unsubscribe_url}}
```

- In the email file, write the sign-off and footer as plain text. Don't put them inside a code block. (The code block above only shows the layout.)
- Keep the footer wording exactly as shown.
- `{{company_address}}` and `{{unsubscribe_url}}` are placeholders. The email tool fills in our postal address and each reader's personal unsubscribe link.

## 5. Name each file after its email ID in the plan

- Start the file name with the email's ID from the campaign plan, then a short name. For example, `E3-meet-your-mentor.md`.
- If an email has group versions, add the group letter, for example `E2-what-youll-build-A.md`.

This makes it easy to match each draft to the right row in the plan's calendar.

## 6. Keep the style the same in every email

- **No comma before "and" or "or" at the end of a list.** Write "4 real projects, a mentor and a portfolio", not "4 real projects, a mentor, and a portfolio". This matches `brand/voice.md`.
- **Use "I" for Ukasha and "we" for the academy.** The emails are signed by Ukasha, so personal lines use "I" (for example "I hope…" or "I'm happy to talk it through"). Use "we" only for what the academy does or promises (for example "We can't promise you a job").
