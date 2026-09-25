# Privacy behaviour check — 25 September 2026

## Scope and evidence

Compared the published privacy policy at https://www.voiceoverguy.co.uk/privacy-policy with the workspace policy and active render paths. The live version was older than the workspace on provider, retention and marketing disclosures. No publication or sync was performed.

Fresh-browser live observation: PayPal SDK and hosted assets loaded on the contact page before choice and wrote `__paypal_storage__`. Google's preferred-source widget loaded Google resources; a Google cookie was observed. Existing YouTube, Vimeo and raw SoundCloud iframe paths had no shared consent gate. Browser testing did not activate every provider on every page.

## Implemented

- External media and PayPal default off, including server-rendered embeds, with independent choices, equally available rejection and persistent settings/withdrawal.
- External search thumbnails replaced with local images. Legacy raw HTML cannot bypass the gates with scripts/embeds/external images; active raw SoundCloud video fields use consent-aware rendering.
- Google preferred-source publisher script replaced with Google's documented plain source-preferences link.
- PayPal withdrawal removes its observed same-origin storage entry and reloads to stop the SDK.
- Policy describes these behaviours, provides a clear marketing opt-out route, and removes the disputed 18-month expectation. Retention criteria are not represented as an adopted deletion schedule.

## Verification

TypeScript and slug checks passed. Fresh desktop and mobile preview sessions had no optional third-party requests before choice. Rejection persisted across reload. Media-only permission did not enable PayPal. A real Santa YouTube player loaded only after permission and poster activation. PayPal loaded only after payments permission. Withdrawal removed active iframes; subsequent reloads made no third-party requests. Contact form and first-party audio remained present; no forms, payments or scripts were submitted.

Known limits: third-party YouTube cookies set after permission remain on YouTube's domain after withdrawal; this website cannot delete them. One already-in-flight media request was observed during iframe teardown, with no requests after reload. These are not evidence of pre-consent loading; policy explains that withdrawal cannot undo information sent or remove another provider's cookies. Vimeo/SoundCloud gates were checked in code, not separately exercised end-to-end. This is not a legal compliance certification.

## Provider and identity checks

- Companies House confirms VOICEOVERGUY LIMITED, 07297733. Its full registered office includes “165 Lutterworth Road” and “Leicestershire”; the policy retains the shorter address expressly requested by the owner.
- Resend's current official GDPR page confirms US storage, including message content and delivery logs; a sending region is not storage residency: https://resend.com/security/gdpr
- Google documents a normal preferred-source link: https://developers.google.com/search/docs/appearance/preferred-sources
- Vercel/Resend use is evidenced in code/config; Apple Mail, Dropbox and QuickBooks are recorded owner confirmations. Apple Mail does not identify the mailbox host. Generator code uses an OpenAI API integration; production account terms, relay hosting and AI retention settings still need account-level confirmation.
- ICO guidance supports informed affirmative consent and distinguishing corporate subscribers from individuals/sole traders for electronic marketing.

## Owner clarification after the check

The owner confirmed there is no fixed 18-month rule: older email, scripts and recordings are reviewed or cleared when storage fills up; backup expiry is unknown. Heart Internet hosts the mailbox read through Apple Mail. There are no promotional email campaigns to older clients, but occasional individual check-ins mention continued availability for voiceover work; these can still constitute direct marketing. Provider storage locations, backup/deletion settings and AI retention/training arrangements beyond the public evidence above remain unconfirmed. Do not present them as verified.

The policy now reflects these clarifications. The earlier questions below are retained as the audit trail; the fixed-period and mailbox-host questions have been answered. Recipient categories, permission evidence, opt-out recording, third-party access and account-specific arrangements remain unresolved.

## Questions raised during the check

1. Does any actual inbox review/deletion practice support an approximate 18 months, or is clearing driven only by storage? What event should trigger reviewing old enquiries/scripts/recordings, and what copies/backups exist?
2. Are former-client marketing recipients only limited companies, or also individuals/sole traders/partnerships? For individual subscribers, what consent or qualifying soft-opt-in evidence exists? How are do-not-contact requests recorded and checked?
3. Who hosts the mailbox used in Apple Mail, and who else can access personal information (including advisers)?
4. Confirm production generator relay/AI account provider and retention/training settings, plus provider account transfer safeguards and backup/deletion settings. Public vendor documentation alone cannot establish these account-specific facts.

Do not claim all operational practices or international-transfer arrangements are verified until these are answered.