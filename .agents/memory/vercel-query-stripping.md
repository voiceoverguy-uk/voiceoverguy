---
name: Vercel query stripping
description: Why query-sensitive legacy redirects need a response handler rather than a same-path configuration redirect.
---

 Vercel configuration redirects forward incoming query parameters by default. A redirect from a pathname to the same clean pathname can therefore retain the matched legacy query and loop. A query-conditioned rewrite to a redirect handler can work for a nonexistent path yet be bypassed when the path is a real static export: Vercel serves the file before applying the rewrite.

**Why:** SEO redirects must return a Location with no legacy query parameter at all. A relative same-path destination does not guarantee that result, even when a query matcher selects the request. A successfully deployed rewrite/handler pair is not proof that a static page's query variant reaches the handler.

**How to apply:** For query-removal redirects on nonexistent paths, an internal rewrite to a handler can suffice. For existing static pages, handle the narrow path and legacy query in pre-filesystem routing middleware/proxy, returning a permanent redirect to a fixed absolute canonical URL. Check the actual published URL, not just the handler endpoint, before claiming the fix is live.