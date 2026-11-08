// Send guard: a PreToolUse hook for the Resend tools.
// It blocks any email that would go to someone other than a Resend test
// address (@resend.dev) or my own address (from the MY_EMAIL env variable).
// Exit 0 = allow. Exit 2 = block (the reason printed to stderr is shown to Claude).

const ALWAYS_BLOCK = new Set([
  "send-broadcast",
  "create-automation",
  "send-inbox-draft",
  "send-new-inbox-email",
]);
const CHECK_RECIPIENTS = new Set(["send-email", "send-batch-emails"]);
const FIELDS = ["to", "cc", "bcc"];

function block(reason) {
  process.stderr.write(`Send guard blocked this call: ${reason}\n`);
  process.exit(2);
}

// Turn a field value (string, list, or "Name <addr>") into plain lowercase addresses.
function addressesFrom(value) {
  if (value == null) return [];
  const items = Array.isArray(value) ? value : String(value).split(",");
  return items
    .map((item) => String(item).trim())
    .filter(Boolean)
    .map((item) => {
      const inBrackets = item.match(/<([^>]+)>/);
      return (inBrackets ? inBrackets[1] : item).trim().toLowerCase();
    });
}

// Collect every to/cc/bcc address, including inside lists of emails (batch sends).
function collectRecipients(input, found = []) {
  if (Array.isArray(input)) {
    for (const item of input) collectRecipients(item, found);
  } else if (input && typeof input === "object") {
    for (const [key, value] of Object.entries(input)) {
      if (FIELDS.includes(key.toLowerCase())) found.push(...addressesFrom(value));
      else if (value && typeof value === "object") collectRecipients(value, found);
    }
  }
  return found;
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let call;
  try {
    call = JSON.parse(raw);
  } catch {
    block("could not read the tool call, so it was blocked to be safe.");
  }

  const toolName = String(call.tool_name || "");
  const action = toolName.replace(/^mcp__resend__/, "");

  if (ALWAYS_BLOCK.has(action)) {
    block(`"${action}" can reach whole lists of people, so it is never allowed here.`);
  }

  if (!CHECK_RECIPIENTS.has(action)) process.exit(0);

  const myEmail = (process.env.MY_EMAIL || "").trim().toLowerCase();
  const recipients = collectRecipients(call.tool_input || {});

  if (recipients.length === 0) {
    block("no to/cc/bcc addresses were found, so the recipients could not be checked.");
  }

  for (const address of recipients) {
    const allowed = address.endsWith("@resend.dev") || (myEmail && address === myEmail);
    if (!allowed) {
      block(`${address} is not a @resend.dev test address or your own email (MY_EMAIL).`);
    }
  }

  process.exit(0);
});
