#!/usr/bin/env node
/**
 * PreToolUse(Write|Edit) guard.
 *
 * Refuses to let the agent hand-edit generated or vendored artifacts. Those files
 * should only ever change as a side effect of a build/install step, never by hand,
 * so a stray Edit into one of them is almost always a mistake.
 *
 * Protocol: read the tool call as JSON on stdin, inspect tool_input.file_path, and
 * exit 2 (with a message on stderr) to block. Any other exit code allows the call.
 */
import { stdin } from 'node:process';

const PROTECTED = [
  /(^|\/)node_modules\//,
  /(^|\/)dist\//,
  /(^|\/)\.next\//,
  /(^|\/)build\//,
  /(^|\/)coverage\//,
  /package-lock\.json$/,
];

let raw = '';
for await (const chunk of stdin) raw += chunk;

let filePath = '';
try {
  filePath = JSON.parse(raw || '{}')?.tool_input?.file_path ?? '';
} catch {
  process.exit(0); // unparseable input -> don't get in the way
}

const normalized = filePath.replace(/\\/g, '/');
if (PROTECTED.some((re) => re.test(normalized))) {
  console.error(
    `Blocked: "${filePath}" is a generated/vendored artifact.\n` +
      `Edit the source instead, or regenerate it by running the build/install command.`,
  );
  process.exit(2);
}

process.exit(0);
