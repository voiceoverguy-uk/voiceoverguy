---
name: Vercel firewall API activation
description: REST firewall rule updates can go live without a separate draft publish step.
---

REST `rules.insert` via the Vercel firewall configuration PATCH endpoint was immediately reflected in the active configuration; the draft remained empty. Do not assume the CLI's stage-then-publish workflow also applies to this REST route.

**Why:** A valid rule began limiting live requests immediately after the REST update, before any explicit publish call.

**How to apply:** Treat firewall API writes as potentially live changes. Inspect active and draft configuration before modifying and re-read the active version afterward; test only with bounded, non-billable requests where possible.