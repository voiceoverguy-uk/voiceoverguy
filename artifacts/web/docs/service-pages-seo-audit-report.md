# Service Pages SEO Audit Report

**Date:** 2026-03-19  
**Scope:** All 17 main service/about pages (not blog posts)  
**Severity scale:** BROKEN = technical fix needed | WEAK = needs human review | MISSING = not present but expected

---

## 1. Metadata Audit (Title, Description, Canonical)

### Title Tags

Layout applies `template: '%s | VoiceoverGuy'` (adds 15 chars). Recommended rendered max: ~60 chars.

| Page | Rendered Title Length | Status |
|------|---------------------|--------|
| commercial-voiceover | 69 | WEAK - 9 over |
| apple-voice-style | 66 | WEAK - 6 over |
| narration-voice | 71 | WEAK - 11 over |
| voice-of-god | 69 | WEAK - 9 over |
| on-hold-voice | 63 | WEAK - 3 over |
| voiceover-imaging | 57 | OK |
| movie-trailer-voice | 68 | WEAK - 8 over |
| character-voiceover | 65 | WEAK - 5 over |
| santa-voice | 66 | WEAK - 6 over |
| football-commentator-voice | 66 | WEAK - 6 over |
| pirate-voice | 66 | WEAK - 6 over |
| gameshow-host | 67 | WEAK - 7 over |
| pathe-news-voice | 70 | WEAK - 10 over |
| halloween-voice | 70 | WEAK - 10 over |
| david-attenborough-voice | 63 | WEAK - 3 over |
| explainer-video-voice | 73 | WEAK - 13 over |
| voiceoverguy | 69 | WEAK - 9 over |

**Summary:** 16 of 17 pages exceed the ~60-char recommended title length once the `| VoiceoverGuy` suffix is applied. Only voiceover-imaging fits. Google will truncate these in SERPs. The page-level s1 titles already include `| Guy Harris` or similar suffixes, which stack with the layout suffix. **WEAK** - consider shortening page-level titles or removing redundant name/pipe suffixes since the layout template already appends `| VoiceoverGuy`.

### Meta Descriptions

| Page | Length | Status |
|------|--------|--------|
| commercial-voiceover | 154 | OK |
| apple-voice-style | 152 | OK |
| narration-voice | 142 | OK |
| voice-of-god | 160 | OK (at limit) |
| on-hold-voice | 148 | OK |
| voiceover-imaging | 157 | OK |
| movie-trailer-voice | 149 | OK |
| character-voiceover | 151 | OK |
| santa-voice | 159 | OK |
| football-commentator-voice | 160 | OK (at limit) |
| pirate-voice | 156 | OK |
| gameshow-host | 133 | OK |
| pathe-news-voice | 150 | OK |
| halloween-voice | 160 | OK (at limit) |
| david-attenborough-voice | 158 | OK |
| explainer-video-voice | 156 | OK |
| voiceoverguy | 149 | OK |

**Summary:** All meta descriptions are within the 160-char limit. No duplicates found. All unique.

### Canonical URLs

All 17 pages set `alternates.canonical` pointing to the correct `https://www.voiceoverguy.co.uk/{slug}` path. **OK.**

### OG / Twitter Tags

Layout.tsx provides default OG and Twitter tags (title, description, image, card type). No individual service page overrides these defaults with page-specific values.

**WEAK** - All 17 service pages inherit the homepage OG title/description/image. When shared on social media, they will all show the same generic preview. Consider adding per-page `openGraph` and `twitter` overrides in each page's metadata export (at minimum: title and description matching the page-specific values, and ideally a page-specific OG image).

---

## 2. Schema Types Audit

| Page | Schema Types Present | Issues |
|------|---------------------|--------|
| commercial-voiceover | ProfilePage, LocalBusiness, VideoObject, FAQPage | OK |
| apple-voice-style | WebPage, VideoObject, CreativeWork | MISSING: No Breadcrumb, no FAQPage |
| narration-voice | VideoObject, FAQPage | MISSING: No WebPage/ProfilePage, no Breadcrumb |
| voice-of-god | ProfilePage, Breadcrumb, Service, VideoObject, AudioObject | MISSING: No FAQPage |
| on-hold-voice | VideoObject, FAQPage | MISSING: No WebPage/ProfilePage, no Breadcrumb |
| voiceover-imaging | ProfilePage, VideoObject | MISSING: No Breadcrumb, no FAQPage |
| movie-trailer-voice | VideoObject, FAQPage | MISSING: No WebPage/ProfilePage, no Breadcrumb |
| character-voiceover | WebPage, Breadcrumb, Service, AudioObject, VideoObject, FAQPage | OK - most complete |
| santa-voice | WebPage, Breadcrumb, Service, AudioObject, VideoObject (x2), FAQPage | OK - most complete |
| football-commentator-voice | LocalBusiness, FAQPage, Breadcrumb, AudioObject, VideoObject | OK |
| pirate-voice | Person, AudioObject, VideoObject, Breadcrumb | MISSING: No FAQPage |
| gameshow-host | FAQPage, VideoObject, AudioObject | MISSING: No WebPage/ProfilePage, no Breadcrumb |
| pathe-news-voice | VideoObject, Person | MISSING: No Breadcrumb, no FAQPage |
| halloween-voice | Breadcrumb, LocalBusiness, AudioObject, VideoObject (x2), FAQPage | OK |
| david-attenborough-voice | ProfilePage, Breadcrumb, AudioObject, VideoObject, FAQPage | OK |
| explainer-video-voice | LocalBusiness, FAQPage | MISSING: No Breadcrumb, no VideoObject (page uses Vimeo embeds) |
| voiceoverguy | ProfilePage | MISSING: No Breadcrumb, no FAQPage |

### Schema Issues Summary

**Pages missing BreadcrumbList schema (7):** MISSING
- apple-voice-style
- narration-voice
- on-hold-voice
- movie-trailer-voice
- gameshow-host
- pathe-news-voice
- voiceover-imaging

**Pages missing FAQPage schema (5):** MISSING
- apple-voice-style
- voice-of-god
- voiceover-imaging
- pirate-voice
- pathe-news-voice

**Pages missing a primary entity schema (WebPage/ProfilePage/LocalBusiness) (4):** MISSING
- narration-voice (has only VideoObject + FAQPage)
- on-hold-voice (has only VideoObject + FAQPage)
- movie-trailer-voice (has only VideoObject + FAQPage)
- gameshow-host (has only FAQPage + VideoObject + AudioObject)

**Pages with inline Person schema instead of using profilePage() helper (2):** WEAK
- pirate-voice (inline Person object with hardcoded URL/image)
- pathe-news-voice (inline Person object with hardcoded URL/image)

---

## 3. Heading Structure Audit

H1 tags on all pages come from the hero section HTML (`data.s3` or `data.s1` for voiceoverguy), which is rendered via `dangerouslySetInnerHTML`. The `InnerPage` component's `pageTitle` prop is used only for the `BlogEnquiryForm`, not for rendering headings. Content sections from `data.s4`/`s5`/`s6` may contain `<h2>`/`<h3>` tags.

| Page | H1 Source | Issues |
|------|-----------|--------|
| voiceoverguy | `data.s1` hero HTML contains `<h1>` | OK |
| All other 16 pages | `data.s3` hero HTML contains `<h1>` | OK |

**Note:** `voiceoverguy/page.tsx` does not pass `pageTitle` or `pageSlug` to `InnerPage`, so the `BlogEnquiryForm` is not rendered on that page. This is likely intentional since it's the "about" page rather than a service page, but worth confirming. **WEAK** - consider whether the enquiry form should appear on this page.

---

## 4. Internal Links Audit

Internal links come from two sources: (a) HTML content in `pages.json` fields (s4/s5/s6 etc.) which contain `<a href>` tags, and (b) explicit `<Link>` components in the page file.

| Page | Explicit Cross-Links in page.tsx | Links in CMS Content | Status |
|------|----------------------------------|---------------------|--------|
| commercial-voiceover | None | Links in s4/s5/s6 content | OK (content has links) |
| apple-voice-style | None | Links in content | OK |
| narration-voice | None | Links in content | OK |
| voice-of-god | None | Links in content | OK |
| on-hold-voice | None | Links in content | OK |
| voiceover-imaging | None | Links in content | OK |
| movie-trailer-voice | None | Links in content | OK |
| character-voiceover | None | Links in content | OK |
| santa-voice | Link to /santa-script-generator | Links in content | OK |
| football-commentator-voice | None | Links in content | OK |
| pirate-voice | None | Links in content | OK |
| gameshow-host | None | Links in content | OK |
| pathe-news-voice | None | Links in content | OK |
| halloween-voice | None | Links in content | OK |
| david-attenborough-voice | Link to /attenborough-script-generator | Links in content | OK |
| explainer-video-voice | None | Links in content | OK |
| voiceoverguy | None | Links in content | OK |

**Summary:** Internal linking is primarily driven by the CMS content in pages.json. Most pages cross-link to blog posts about specific projects rather than to other service pages directly. **WEAK** - Consider adding a "Related Services" section or explicit cross-links between complementary service pages (e.g., movie-trailer-voice linking to game-trailer-voice, character-voiceover linking to pirate-voice and halloween-voice).

---

## 5. Consolidated Findings

### BROKEN (Technical fix needed)

1. **3 AudioObject schemas referenced missing audio files** - FIXED. The following entries pointed to non-existent files and have been removed:
   - `gameshow-host/page.tsx`: `/assets/audio/guy-harris-voiceoverguy-gameshow-host.mp3` - removed
   - `game-trailer-voice/page.tsx`: `/assets/audio/guy-harris-voiceoverguy-game-trailer-showreel.mp3` - removed
   - `santa-voice/page.tsx`: `/assets/audio/guy-harris-voiceoverguy-santa-demo.mp3` - removed

   These AudioObject entries can be re-added once valid audio assets are uploaded to `public/assets/audio/`.

### MISSING (Not present but expected)

1. **7 pages missing BreadcrumbList schema** - apple-voice-style, narration-voice, on-hold-voice, movie-trailer-voice, gameshow-host, pathe-news-voice, voiceover-imaging. Add `breadcrumb()` calls.

2. **5 pages missing FAQPage schema** - apple-voice-style, voice-of-god, voiceover-imaging, pirate-voice, pathe-news-voice. Add `faqPage()` calls with relevant Q&A pairs.

3. **4 pages missing primary entity schema** - narration-voice, on-hold-voice, movie-trailer-voice, gameshow-host have no WebPage, ProfilePage, or LocalBusiness schema. Add at least a `webPage()` or `profilePage()` call.

4. **explainer-video-voice missing VideoObject schema** - Page embeds 6 Vimeo videos but has no VideoObject schema for any of them.

### WEAK (Needs human review/decision)

5. **16/17 page titles exceed 60 chars** when rendered with `| VoiceoverGuy` suffix. Most s1 titles already contain `| Guy Harris` or similar, stacking with the layout suffix. Consider shortening page-level titles.

6. **All 17 pages inherit default OG/Twitter tags** from layout.tsx. No page-specific social sharing previews. When shared on social media, all pages show the same generic homepage preview.

7. **2 pages use inline Person schema** (pirate-voice, pathe-news-voice) instead of the `profilePage()` helper, with hardcoded URLs that could drift from the canonical helper output.

8. **Cross-linking between service pages is sparse** - Most internal links go to blog posts. Adding explicit "Related Services" links between complementary pages would strengthen the internal link graph.

9. **voiceoverguy page missing BlogEnquiryForm** - No `pageTitle`/`pageSlug` passed to InnerPage, so the enquiry CTA is absent. May be intentional for an "about" page.

---

## 6. Recommended Priority Order

1. ~~Fix 3 broken AudioObject contentUrl references~~ (DONE - removed broken entries)
2. Add BreadcrumbList to 7 pages (MISSING - quick wins)
3. Add primary entity schema to 4 bare pages (MISSING)
4. Add FAQPage to 5 pages (MISSING - requires writing Q&A content)
5. Add per-page OG/Twitter overrides (WEAK - moderate effort)
6. Review title lengths (WEAK - requires copy decisions)
7. Migrate inline Person schemas to profilePage() helper (WEAK - minor)
8. Add cross-service internal links (WEAK - content decision)
9. Add Vimeo VideoObject schema to explainer-video-voice (MISSING)
