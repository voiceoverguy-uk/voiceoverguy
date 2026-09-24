# Script generator release checklist

The unchanged Attenborough and Santa pages POST to Vercel's same-origin
`/api/generate` and `/api/generate1`. The updated Vercel functions validate
input and send it to the published Replit API, where the existing
`gpt-4o-mini` prompts and output limits run through Replit AI Integrations.
The existing Vercel `AI_INTEGRATIONS_OPENAI_API_KEY` is **not used** by the
updated functions and must not be overwritten.

**Development verification (completed):** One bounded valid request against
the currently published Replit backend returned a nonempty script. Both
updated Vercel handlers then returned nonempty scripts when invoked against
the local Replit API with the development-only relay credential. Blank and
overlong input remained rejected. This does **not** change either live
deployment or prove that a Vercel production deployment has been tested.

**Do not change live credentials/settings, enable a firewall rule or publish
either service until the owner gives final approval.** In particular, the
existing published Replit backend is still running its previous, unauthenticated
version until a new Replit deployment is published.

After approval:

1. Provision a new, high-entropy `GENERATOR_RELAY_SECRET` in the **Replit
   production environment** and the **Vercel Production environment** with
   the same value. Use secret-management UI, not code, chat, logs or query
   parameters. Keep it separate from `SESSION_SECRET` (which the local
   development relay alone uses as a fallback). Do not modify Vercel's shared
   Preview/Production AI key. Set Vercel Production's non-secret
   `GENERATOR_BACKEND_URL` to the verified HTTPS published Replit origin
   (`https://voiceover-guy.replit.app` at the time of preparation).
2. Publish the Replit API with the new credential, then verify that both
   generator routes reject direct unauthenticated requests with 401. Health
   and unrelated routes are unchanged. A missing production relay secret
   fails closed with 503.
3. Prepare **one** Vercel Hobby firewall rate-limit rule for
   `request.method == "POST"` **and** a path matching either
   `/api/generate` **or** `/api/generate1`. Use a fixed 60-second window,
   **five requests per client IP across both paths**, with a block/429 action
   when exceeded. Confirm the existing single-rule slot is still free and
   check current Hobby allowance before activating. Do not create separate
   rules per path. The functions' memory limit is per warm instance and is
   not a replacement for the firewall rule; backend authentication stops
   callers from bypassing Vercel to generate directly.
4. Enable that rule and deploy the Vercel site with the updated functions,
   then check both endpoints with one valid and one invalid request each.
   Confirm redacted logs, 401 on direct backend requests, 429 for over-limit
   traffic, and that the generated text appears on both public pages.

Each request remains capped at 2,000 input characters and the existing
25-/75-word caps, with output limits of 500/600 tokens respectively. These
are per-request bounds, not a guaranteed monthly spending cap. Replit AI
usage consumes Replit credits and can incur overage; Autoscale usage and
Vercel functions/firewall are separate charges. No separate OpenAI account
is needed for this relay.