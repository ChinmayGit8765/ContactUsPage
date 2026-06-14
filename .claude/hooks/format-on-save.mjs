#!/usr/bin/env node
/**
 * PostToolUse(Write|Edit) formatter.
 *
 * Best-effort "format on save" for the NestJS API, which has Prettier configured.
 * After the agent writes a backend source file, run Prettier over just that file so
 * style stays consistent without anyone thinking about it.
 *
 * Deliberately defensive: it only touches files under api/, only if a local Prettier
 * binary exists, and it NEVER blocks the workflow (always exits 0). The frontend is
 * not formatted here — it relies on ESLint / `next lint` instead.
 */
import { stdin } from 'node:process';
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

let raw = '';
for await (const chunk of stdin) raw += chunk;

let filePath = '';
try {
  filePath = JSON.parse(raw || '{}')?.tool_input?.file_path ?? '';
} catch {
  process.exit(0);
}

const normalized = filePath.replace(/\\/g, '/');
if (!/\/api\/.+\.(ts|js|json)$/.test(normalized)) process.exit(0);

const isWindows = process.platform === 'win32';
const prettier = join('api', 'node_modules', '.bin', isWindows ? 'prettier.cmd' : 'prettier');
if (!existsSync(prettier)) process.exit(0);

spawnSync(prettier, ['--write', '--ignore-unknown', filePath], {
  stdio: 'ignore',
  timeout: 15000,
  shell: isWindows,
});

process.exit(0);
