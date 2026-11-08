// Reviews every email in a campaign folder with Claude Code, with no one typing.
// Usage: node scripts/review.mjs <campaign folder>
// Saves findings to review/findings.json. Exits with code 1 if any finding is high severity.

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const folder = process.argv[2];

if (!folder) {
  console.error("Usage: node scripts/review.mjs <campaign folder>");
  process.exit(2);
}
if (!existsSync(join(root, folder))) {
  console.error(`Folder not found: ${folder}`);
  process.exit(2);
}

const schema = readFileSync(join(root, "review", "findings.schema.json"), "utf8");
const prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

// Call claude.exe directly (no shell), so the schema text needs no quoting.
const run = spawnSync(
  "claude",
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", schema,
    "--allowedTools", "Read,Glob,Grep",
  ],
  { cwd: root, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
);

if (run.error || run.status !== 0) {
  console.error("Claude Code did not finish.", run.error?.message ?? "");
  console.error(run.stderr);
  process.exit(2);
}

// The output is either one JSON object, or a list whose last item is the result.
let output;
try {
  output = JSON.parse(run.stdout);
} catch {
  console.error("Could not read Claude Code's output as JSON:\n" + run.stdout);
  process.exit(2);
}
const result = Array.isArray(output) ? output.at(-1) : output;
const data = result?.structured_output;

if (!data || !Array.isArray(data.findings)) {
  console.error("No structured_output with a findings list in the result.");
  console.error(JSON.stringify(result, null, 2));
  process.exit(2);
}

writeFileSync(join(root, "review", "findings.json"), JSON.stringify(data, null, 2) + "\n");

const count = (s) => data.findings.filter((f) => f.severity === s).length;
const high = count("high");
console.log(
  `${folder}: ${data.findings.length} findings (${high} high, ${count("medium")} medium, ${count("low")} low). Saved to review/findings.json`
);

process.exit(high > 0 ? 1 : 0);
