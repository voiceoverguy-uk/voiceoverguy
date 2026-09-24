---
name: Generator preview relay
description: Why local generator requests differ from the live site's protected relay route.
---

The Replit development preview routes browser generator requests to the protected API service rather than through the public Vercel relay. Without the relay's authorization, real requests in the local preview return 401; the live public generator endpoints can still work normally.

**Why:** A failed local generation request is not, by itself, evidence that the generator client or live integration regressed. The relay is deliberately authenticated; do not remove that protection to make a preview test pass.

**How to apply:** For scoped frontend changes, check browser wiring with intercepted generation responses and, if needed, separately verify bounded live endpoint calls without publishing. Treat development preview parity as separate work and keep production relay security unchanged.