---
name: Vercel query stripping
description: Why query-sensitive legacy redirects need a response handler rather than a same-path configuration redirect.
---

Vercel configuration redirects forward incoming query parameters by default. A redirect from a pathname to the same clean pathname can therefore retain the matched legacy query and loop.

**Why:** SEO redirects must return a Location with no legacy query parameter at all. A relative same-path destination does not guarantee that result, even when a query matcher selects the request.

**How to apply:** For query-removal redirects, internally rewrite the narrowly matched request to a handler that validates the path value and returns a permanent redirect to a fixed absolute canonical origin without copying request query parameters.