---
description: Build the API and web apps and run the API test suite, then report a PASS/FAIL summary.
allowed-tools: Bash(cd:*), Bash(npm:*)
---

Verify the whole stack is green before committing or submitting. Run these three steps and
report a concise PASS/FAIL table — do **not** fix anything unless I ask:

1. **API build** — `cd api && npm run build`
2. **API tests** — `cd api && npm test`
3. **Web build** — `cd web && npm run build`

For each step, report the exit status and, on failure, the first few relevant error lines.
Finish with an overall verdict (ready to ship / needs work).
