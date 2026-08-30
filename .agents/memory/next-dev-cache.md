---
name: Next development cache
description: Running the production build while the Next development workflow is active can invalidate development chunks.
---

Do not run the production build concurrently with the active Next.js development workflow when browser verification is still needed. The build can replace the shared `.next` output and leave the dev server serving missing chunks or stale HMR manifests.

**Why:** This workspace's dev and production commands share the same generated Next.js cache, so concurrent or immediately interleaved runs have caused missing-chunk errors and misleading preview failures.

**How to apply:** Run checks/builds before the final preview, then restart `artifacts/web: web` to clear the generated cache before taking screenshots or running browser tests. Treat an isolated HMR WebSocket 502 separately from page-content failures.