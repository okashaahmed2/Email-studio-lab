// Reviews every email in a campaign folder with Claude Code, with no one typing.
// Run it from the client repo: node <path to studio-kit>/scripts/review.mjs <campaign folder>
// Saves findings (and the folder name) to review/findings.json in the client repo.
// Exits with code 1 if any finding is high severity.
// If the last review was of the same folder, its findings go into the prompt so fixed problems aren't repeated.

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The client repo is wherever the script is run from.
const projectRoot = process.cwd();
// The kit folder is only used to find the findings schema.
const kitRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

// Tidy the folder name so "campaigns\test-bad\" and "campaigns/test-bad" count as the same folder.
const folder = process.argv[2]?.replace(/\\/g, "/").replace(/\/+$/, "");

if (!folder) {
  console.error("Usage (from the client repo): node <path to studio-kit>/scripts/review.mjs <campaign folder>");
  process.exit(2);
}
if (!existsSync(join(projectRoot, folder))) {
  console.error(`Folder not found: ${folder} (looked in ${projectRoot})`);
  process.exit(2);
}
for (const needed of ["brand/voice.md", ".claude/rules/emails.md"]) {
  if (!existsSync(join(projectRoot, needed))) {
    console.error(`Missing ${needed} in ${projectRoot}. Run this from a client repo that has it.`);
    process.exit(2);
  }
}

const schema = readFileSync(join(kitRoot, "review", "findings.schema.json"), "utf8");
const reviewDir = join(projectRoot, "review");
const findingsPath = join(reviewDir, "findings.json");
let prompt = `Review every email in ${folder} against brand/voice.md and .claude/rules/emails.md. Report only real problems.`;

// If the last review was of this same folder, show Claude what it found then.
if (existsSync(findingsPath)) {
  try {
    const last = JSON.parse(readFileSync(findingsPath, "utf8"));
    if (last.folder === folder && Array.isArray(last.findings) && last.findings.length > 0) {
      prompt +=
        "\n\nThese are findings from the last review. Report only problems that are new or still not fixed. " +
        "Don't repeat ones that have been fixed.\n\n" +
        JSON.stringify(last.findings, null, 2);
      console.log(`Including ${last.findings.length} findings from the last review of ${folder}.`);
    }
  } catch {
    console.log("Could not read the old review/findings.json, so reviewing from scratch.");
  }
}

// Call claude directly (no shell), so the schema text needs no quoting.
const run = spawnSync(
  "claude",
  [
    "-p", prompt,
    "--output-format", "json",
    "--json-schema", schema,
    "--allowedTools", "Read,Glob,Grep",
  ],
  { cwd: projectRoot, encoding: "utf8", maxBuffer: 50 * 1024 * 1024 }
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

// Save the folder name too, so the next review knows whether these findings are for the same folder.
mkdirSync(reviewDir, { recursive: true });
writeFileSync(findingsPath, JSON.stringify({ folder, findings: data.findings }, null, 2) + "\n");

const count = (s) => data.findings.filter((f) => f.severity === s).length;
const high = count("high");
console.log(
  `${folder}: ${data.findings.length} findings (${high} high, ${count("medium")} medium, ${count("low")} low). Saved to review/findings.json`
);

process.exit(high > 0 ? 1 : 0);
