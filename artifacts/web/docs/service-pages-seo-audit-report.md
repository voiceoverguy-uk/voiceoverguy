# Service Pages SEO Audit Report

**Date:** 2026-03-19  
**Scope:** All 18 main service/about pages (not blog posts)  
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
| game-trailer-voice | 68 | WEAK - 8 over |
| voiceoverguy | 69 | WEAK - 9 over |

**Summary:** 17 of 18 pages exceed the ~60-char recommended title length once the `| VoiceoverGuy` suffix is applied. Only voiceover-imaging fits. Google will truncate these in SERPs. The page-level s1 titles already include `| Guy Harris` or similar suffixes, which stack with the layout suffix. **WEAK** - consider shortening page-level titles or removing redundant name/pipe suffixes since the layout template already appends `| VoiceoverGuy`.

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
| game-trailer-voice | 148 | OK |
| voiceoverguy | 149 | OK |

**Summary:** All meta descriptions are within the 160-char limit. No duplicates found. All unique.

### Canonical URLs

All 18 pages set `alternates.canonical` pointing to the correct `https://www.voiceoverguy.co.uk/{slug}` path. **OK.**

### OG / Twitter Tags

Layout.tsx provides default OG and Twitter tags (title, description, image, card type). No individual service page overrides these defaults with page-specific values.

**WEAK** - All 18 service pages inherit the homepage OG title/description/image. When shared on social media, they will all show the same generic preview. Consider adding per-page `openGraph` and `twitter` overrides in each page's metadata export (at minimum: title and description matching the page-specific values, and ideally a page-specific OG image).

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
| santa-voice | WebPage, Breadcrumb, Service, VideoObject (x2), FAQPage | OK |
| football-commentator-voice | LocalBusiness, FAQPage, Breadcrumb, AudioObject, VideoObject | OK |
| pirate-voice | Person, AudioObject, VideoObject, Breadcrumb | MISSING: No FAQPage |
| gameshow-host | FAQPage, VideoObject | MISSING: No WebPage/ProfilePage, no Breadcrumb |
| pathe-news-voice | VideoObject, Person | MISSING: No Breadcrumb, no FAQPage |
| halloween-voice | Breadcrumb, LocalBusiness, AudioObject, VideoObject (x2), FAQPage | OK |
| david-attenborough-voice | ProfilePage, Breadcrumb, AudioObject, VideoObject, FAQPage | OK |
| explainer-video-voice | LocalBusiness, FAQPage | MISSING: No Breadcrumb, no VideoObject (page uses Vimeo embeds) |
| game-trailer-voice | FAQPage, VideoObject | MISSING: No WebPage/ProfilePage, no Breadcrumb |
| voiceoverguy | ProfilePage | MISSING: No Breadcrumb, no FAQPage |

### Schema Issues Summary

**Pages missing BreadcrumbList schema (8):** MISSING
- apple-voice-style
- narration-voice
- on-hold-voice
- movie-trailer-voice
- gameshow-host
- pathe-news-voice
- voiceover-imaging
- game-trailer-voice

**Pages missing FAQPage schema (6):** MISSING
- apple-voice-style
- voice-of-god
- voiceover-imaging
- pirate-voice
- pathe-news-voice
- voiceoverguy

**Pages missing a primary entity schema (WebPage/ProfilePage/LocalBusiness) (5):** MISSING
- narration-voice (has only VideoObject + FAQPage)
- on-hold-voice (has only VideoObject + FAQPage)
- movie-trailer-voice (has only VideoObject + FAQPage)
- gameshow-host (has only FAQPage + VideoObject)
- game-trailer-voice (has only FAQPage + VideoObject)

**Pages with inline Person schema instead of using profilePage() helper (2):** WEAK
- pirate-voice (inline Person object with hardcoded URL/image)
- pathe-news-voice (inline Person object with hardcoded URL/image)

---

## 3. Heading & Content Structure Audit

H1 tags on all pages come from the hero section HTML (`data.s3` or `data.s1` for voiceoverguy), which is rendered via `dangerouslySetInnerHTML`. The `InnerPage` component's `pageTitle` prop is used only for the `BlogEnquiryForm`, not for rendering headings.

### Per-Page Content Assessment

| Page | Word Count | Thin Content? | H1 | Notes |
|------|-----------|---------------|-----|-------|
| commercial-voiceover | ~405 | No | OK (s3) | Good depth, multiple sections |
| apple-voice-style | ~317 | No | OK (s3) | Adequate depth |
| narration-voice | ~302 | No | OK (s3) | Adequate depth |
| voice-of-god | ~472 | No | OK (s3) | Good depth, includes VogPlaylist component |
| on-hold-voice | ~294 | Borderline | OK (s3) | WEAK - just under 300 words, could benefit from more content |
| voiceover-imaging | ~229 | Yes | OK (s3) | WEAK - thinnest service page at ~229 words |
| movie-trailer-voice | ~307 | No | OK (s3) | Adequate, but mostly video embeds with minimal text |
| character-voiceover | ~406 | No | OK (s3) | Good depth, extensive project links |
| santa-voice | ~390 | No | OK (s3) | Good depth, generator promo section |
| football-commentator-voice | ~352 | No | OK (s3) | Good depth, strong cross-service links |
| pirate-voice | ~471 | No | OK (s3) | Good depth |
| gameshow-host | ~333 | No | OK (s3) | Adequate |
| pathe-news-voice | ~337 | No | OK (s3) | Adequate |
| halloween-voice | ~355 | No | OK (s3) | Good depth |
| david-attenborough-voice | ~347 | No | OK (s3) | Adequate, generator promo section |
| explainer-video-voice | ~539 | No | OK (s3) | Good depth, 6 Vimeo embeds |
| game-trailer-voice | ~359 | No | OK (s3) | Adequate, 5 YouTube embeds |
| voiceoverguy | ~741 | No | OK (s1) | Deepest page, comprehensive about content |

**Thin content pages:** voiceover-imaging (~229 words) is the thinnest and would benefit from additional content. on-hold-voice (~294 words) is borderline.

**Note:** `voiceoverguy/page.tsx` does not pass `pageTitle` or `pageSlug` to `InnerPage`, so the `BlogEnquiryForm` is not rendered on that page. This is likely intentional since it's the "about" page rather than a service page, but worth confirming. **WEAK**

---

## 4. Internal Links Audit (Service-to-Service)

Each service page should link to at least 2-3 other service pages to strengthen the internal link graph. Links to blog posts do not count. Only links to other pages in the 18-page audited service set are counted.

| Page | Service-Page Links Found | Links To | Status |
|------|-------------------------|----------|--------|
| commercial-voiceover | 3 | apple-voice-style (x2), explainer-video-voice | OK |
| apple-voice-style | 2 | explainer-video-voice, commercial-voiceover | OK |
| narration-voice | 0 | - | MISSING - zero service links |
| voice-of-god | 0 | - | MISSING - zero service links (11 total links, all to blog posts) |
| on-hold-voice | 0 | - | MISSING - zero service links |
| voiceover-imaging | 0 | - | MISSING - zero service links |
| movie-trailer-voice | 0 | - | MISSING - zero service links |
| character-voiceover | 0 | - | MISSING - zero service links (15 total links, all to blog posts) |
| santa-voice | 0 | - | MISSING - zero service links (16 total links, all to blog posts) |
| football-commentator-voice | 6 | movie-trailer-voice, gameshow-host, voice-of-god, santa-voice, david-attenborough-voice, pathe-news-voice | OK - best cross-linked |
| pirate-voice | 0 | - | MISSING - zero service links (8 total links, all to blog posts) |
| gameshow-host | 0 | - | MISSING - zero service links |
| pathe-news-voice | 0 | - | MISSING - zero service links |
| halloween-voice | 3 | voiceoverguy, commercial-voiceover, game-trailer-voice | OK |
| david-attenborough-voice | 1 | character-voiceover | WEAK - only 1 service link |
| explainer-video-voice | 0 | - | MISSING - zero service links |
| game-trailer-voice | 0 | - | MISSING - zero service links |
| voiceoverguy | 4 | apple-voice-style (x2), commercial-voiceover, santa-voice, david-attenborough-voice | OK |

### Service-to-Service Link Summary

- **OK (2+ service links):** commercial-voiceover, apple-voice-style, football-commentator-voice, halloween-voice, voiceoverguy (5 pages)
- **WEAK (1 service link):** david-attenborough-voice (1 page)
- **MISSING (0 service links):** narration-voice, voice-of-god, on-hold-voice, voiceover-imaging, movie-trailer-voice, character-voiceover, santa-voice, pirate-voice, gameshow-host, pathe-news-voice, explainer-video-voice, game-trailer-voice (12 pages)

**12 of 18 pages have zero links to other service pages.** Many have numerous links but only to blog posts about specific projects. Adding at least 2-3 cross-links to related services on each page would significantly strengthen the internal link graph.

---

## 5. Consolidated Findings

### BROKEN (Technical fix needed)

1. **3 AudioObject schemas referenced missing audio files** - FIXED. The following entries pointed to non-existent files and have been removed:
   - `gameshow-host/page.tsx`: `/assets/audio/guy-harris-voiceoverguy-gameshow-host.mp3` - removed
   - `game-trailer-voice/page.tsx`: `/assets/audio/guy-harris-voiceoverguy-game-trailer-showreel.mp3` - removed
   - `santa-voice/page.tsx`: `/assets/audio/guy-harris-voiceoverguy-santa-demo.mp3` - removed

   These AudioObject entries can be re-added once valid audio assets are uploaded to `public/assets/audio/`.

### MISSING (Not present but expected)

2. **8 pages missing BreadcrumbList schema** - apple-voice-style, narration-voice, on-hold-voice, movie-trailer-voice, gameshow-host, pathe-news-voice, voiceover-imaging, game-trailer-voice. Add `breadcrumb()` calls.

3. **6 pages missing FAQPage schema** - apple-voice-style, voice-of-god, voiceover-imaging, pirate-voice, pathe-news-voice, voiceoverguy. Add `faqPage()` calls with relevant Q&A pairs.

4. **5 pages missing primary entity schema** - narration-voice, on-hold-voice, movie-trailer-voice, gameshow-host, game-trailer-voice have no WebPage, ProfilePage, or LocalBusiness schema. Add at least a `webPage()` or `profilePage()` call.

5. **explainer-video-voice missing VideoObject schema** - Page embeds 6 Vimeo videos but has no VideoObject schema for any of them.

6. **12 pages have zero service-to-service internal links** - narration-voice, voice-of-god, on-hold-voice, voiceover-imaging, movie-trailer-voice, character-voiceover, santa-voice, pirate-voice, gameshow-host, pathe-news-voice, explainer-video-voice, game-trailer-voice. Add at least 2-3 cross-links to related service pages on each.

### WEAK (Needs human review/decision)

7. **17/18 page titles exceed 60 chars** when rendered with `| VoiceoverGuy` suffix. Most s1 titles already contain `| Guy Harris` or similar, stacking with the layout suffix. Consider shortening page-level titles.

8. **All 18 pages inherit default OG/Twitter tags** from layout.tsx. No page-specific social sharing previews. When shared on social media, all pages show the same generic homepage preview.

9. **2 pages use inline Person schema** (pirate-voice, pathe-news-voice) instead of the `profilePage()` helper, with hardcoded URLs that could drift from the canonical helper output.

10. **voiceover-imaging is the thinnest page** (~229 words). on-hold-voice is borderline (~294 words). Both could benefit from additional content.

11. **voiceoverguy page missing BlogEnquiryForm** - No `pageTitle`/`pageSlug` passed to InnerPage, so the enquiry CTA is absent. May be intentional for an "about" page.

12. **david-attenborough-voice has only 1 service link** - Links to character-voiceover but no other service pages.

---

## 6. Recommended Priority Order

1. ~~Fix 3 broken AudioObject contentUrl references~~ (DONE - removed broken entries)
2. Add BreadcrumbList to 8 pages (MISSING - quick wins)
3. Add primary entity schema to 5 bare pages (MISSING)
4. Add service-to-service internal links to 12 pages (MISSING - content decision)
5. Add FAQPage to 6 pages (MISSING - requires writing Q&A content)
6. Add per-page OG/Twitter overrides (WEAK - moderate effort)
7. Review title lengths (WEAK - requires copy decisions)
8. Migrate inline Person schemas to profilePage() helper (WEAK - minor)
9. Add Vimeo VideoObject schema to explainer-video-voice (MISSING)
10. Expand thin content on voiceover-imaging and on-hold-voice (WEAK)
