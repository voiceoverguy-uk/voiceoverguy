# Internal Linking Audit: VoiceoverGuy Service Pages

**Date:** 19 March 2026
**Scope:** 18 core service/about pages (body content links only, excluding nav, footer, blog, contact, and external links)

---

## Executive Summary

Of the 18 core service pages, **12 have zero outbound internal links** to other service pages, and **1 has only one**. Only 5 pages (commercial-voiceover, apple-voice-style, football-commentator-voice, halloween-voice, voiceoverguy) have 2+ outbound service-page links. Several money pages -- including `/santa-voice`, `/movie-trailer-voice`, `/character-voiceover`, and `/game-trailer-voice` -- are completely isolated with no outbound links at all.

The inbound picture is equally thin: 5 pages receive zero inbound links from any other service page, and 7 pages receive only one inbound link (mostly from football-commentator-voice, which is the site's strongest internal linker with 6 outbound service links).

**Immediate wins:** Adding 2-4 targeted reciprocal links to each isolated page would dramatically improve topical authority flow and user navigation between thematically related services.

---

## Full Audit Table

| Page | Slug | Outbound | Inbound | Status | Outbound Destinations | Inbound Sources |
|------|------|----------|---------|--------|-----------------------|----------------|
| Commercial Voiceover | `/commercial-voiceover` | 2 | 3 | STRONG | apple-voice-style, explainer-video-voice | apple-voice-style, halloween-voice, voiceoverguy |
| Apple Voice Style | `/apple-voice-style` | 2 | 2 | STRONG | explainer-video-voice, commercial-voiceover | commercial-voiceover, voiceoverguy |
| Narration Voice | `/narration-voice` | 0 | 0 | NONE | -- | -- |
| Voice of God | `/voice-of-god` | 0 | 1 | NONE | -- | football-commentator-voice |
| On Hold Voice | `/on-hold-voice` | 0 | 0 | NONE | -- | -- |
| Voiceover Imaging | `/voiceover-imaging` | 0 | 0 | NONE | -- | -- |
| Movie Trailer Voice | `/movie-trailer-voice` | 0 | 1 | NONE | -- | football-commentator-voice |
| Character Voiceover | `/character-voiceover` | 0 | 1 | NONE | -- | david-attenborough-voice |
| Santa Voice | `/santa-voice` | 0 | 2 | NONE | -- | football-commentator-voice, voiceoverguy |
| Football Commentator | `/football-commentator-voice` | 6 | 0 | STRONG | movie-trailer-voice, gameshow-host, voice-of-god, santa-voice, david-attenborough-voice, pathe-news-voice | -- |
| Pirate Voice | `/pirate-voice` | 0 | 0 | NONE | -- | -- |
| Gameshow Host | `/gameshow-host` | 0 | 1 | NONE | -- | football-commentator-voice |
| Pathe News Voice | `/pathe-news-voice` | 0 | 1 | NONE | -- | football-commentator-voice |
| Halloween Voice | `/halloween-voice` | 3 | 0 | STRONG | voiceoverguy, commercial-voiceover, game-trailer-voice | -- |
| David Attenborough | `/david-attenborough-voice` | 1 | 2 | WEAK | character-voiceover | football-commentator-voice, voiceoverguy |
| Explainer Video | `/explainer-video-voice` | 0 | 2 | NONE | -- | commercial-voiceover, apple-voice-style |
| Game Trailer Voice | `/game-trailer-voice` | 0 | 1 | NONE | -- | halloween-voice |
| VoiceoverGuy (About) | `/voiceoverguy` | 4 | 1 | STRONG | apple-voice-style, commercial-voiceover, santa-voice, david-attenborough-voice | halloween-voice |

### Summary counts

- **NONE (0 outbound):** 12 pages
- **WEAK (1 outbound):** 1 page
- **STRONG (2+ outbound):** 5 pages
- **Zero inbound:** 5 pages (narration-voice, on-hold-voice, voiceover-imaging, pirate-voice, football-commentator-voice, halloween-voice)

---

## Page-by-Page Recommendations

### Money Pages (Priority)

---

#### `/santa-voice` -- Status: NONE (0 out, 2 in)

Currently linked from: football-commentator-voice, voiceoverguy

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/character-voiceover` | character voiceover | Santa is a character voice; natural thematic bridge |
| 2 | `/halloween-voice` | Halloween voiceover | Seasonal character pairing; reciprocal link opportunity |
| 3 | `/david-attenborough-voice` | David Attenborough impression | Both are character/impression voices; cross-sell opportunity |
| 4 | `/commercial-voiceover` | commercial voiceover | Santa voice is heavily used in TV/radio commercials |

---

#### `/david-attenborough-voice` -- Status: WEAK (1 out, 2 in)

Currently links to: character-voiceover
Currently linked from: football-commentator-voice, voiceoverguy

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/narration-voice` | narration voiceover | Attenborough is fundamentally a narration style; strong thematic fit |
| 2 | `/explainer-video-voice` | explainer video voiceover | Natural, documentary-adjacent tone suits explainers |
| 3 | `/pathe-news-voice` | Pathe News voice | Both are period/character-influenced narration styles |
| 4 | `/commercial-voiceover` | commercial voiceover | Attenborough-style is widely used in ad campaigns |

---

#### `/football-commentator-voice` -- Status: STRONG outbound, NONE inbound (6 out, 0 in)

Currently links to: movie-trailer-voice, gameshow-host, voice-of-god, santa-voice, david-attenborough-voice, pathe-news-voice
Currently linked from: (none)

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/commercial-voiceover` | commercial voiceover | Commentary style is used in brand ad campaigns |
| 2 | `/character-voiceover` | character voiceover | Commentator is a character-driven performance |

**Note:** This page's critical gap is inbound links. Pages that should link here: movie-trailer-voice (reciprocal), gameshow-host (reciprocal), voice-of-god (reciprocal), character-voiceover, voiceoverguy.

---

#### `/apple-voice-style` -- Status: STRONG (2 out, 2 in)

Currently links to: explainer-video-voice, commercial-voiceover
Currently linked from: commercial-voiceover, voiceoverguy

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/narration-voice` | narration voiceover | Apple style is essentially a narration read; strong semantic overlap |
| 2 | `/on-hold-voice` | on hold voice | Apple style mentions IVR/on-hold use; direct topical match |

---

#### `/commercial-voiceover` -- Status: STRONG (2 out, 3 in)

Currently links to: apple-voice-style, explainer-video-voice
Currently linked from: apple-voice-style, halloween-voice, voiceoverguy

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/narration-voice` | narration voiceover | Commercial page already references narration style |
| 2 | `/on-hold-voice` | on hold voice | Commercial page mentions on-hold/IVR work |
| 3 | `/character-voiceover` | character voiceover | Commercial page references character voices |

---

#### `/character-voiceover` -- Status: NONE (0 out, 1 in)

Currently linked from: david-attenborough-voice

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/pirate-voice` | pirate voice | Body text explicitly mentions pirate characters |
| 2 | `/santa-voice` | Santa voice | Santa is a character performance; seasonal crossover |
| 3 | `/david-attenborough-voice` | David Attenborough voice | Reciprocal link; both are character/impression pages |
| 4 | `/game-trailer-voice` | game trailer voice | Character page mentions game voice work |

---

#### `/voiceoverguy` (About) -- Status: STRONG (4 out, 1 in)

Currently links to: apple-voice-style, commercial-voiceover, santa-voice, david-attenborough-voice
Currently linked from: halloween-voice

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/character-voiceover` | character voiceover | About page discusses Thomas & Friends characters |
| 2 | `/voice-of-god` | Voice of God | About page mentions live event announcing |
| 3 | `/football-commentator-voice` | football commentator voice | High-value money page needing inbound links |
| 4 | `/narration-voice` | narration voiceover | About page discusses documentary narration |

---

### Remaining Service Pages

---

#### `/narration-voice` -- Status: NONE (0 out, 0 in)

**Fully isolated -- no inbound or outbound service links.**

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/explainer-video-voice` | explainer video voiceover | Narration and explainer are closely related reads |
| 2 | `/david-attenborough-voice` | David Attenborough voice | Attenborough is narration-style; reciprocal opportunity |
| 3 | `/commercial-voiceover` | commercial voiceover | Narration work feeds into commercial campaigns |
| 4 | `/apple-voice-style` | Apple voice style | Natural/conversational narration overlaps Apple tone |

---

#### `/voice-of-god` -- Status: NONE (0 out, 1 in)

Currently linked from: football-commentator-voice

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/football-commentator-voice` | football commentator voice | Reciprocal; both are big-event performance voices |
| 2 | `/gameshow-host` | gameshow host voice | Both are live event/arena announcing styles |
| 3 | `/commercial-voiceover` | commercial voiceover | VOG mentions brand campaigns and promos |
| 4 | `/voiceoverguy` | about Guy Harris | Cross-link to about page for credibility |

---

#### `/on-hold-voice` -- Status: NONE (0 out, 0 in)

**Fully isolated -- no inbound or outbound service links.**

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/commercial-voiceover` | commercial voiceover | On-hold is a form of commercial messaging |
| 2 | `/voiceover-imaging` | radio imaging | On-hold and radio imaging share audio branding themes |
| 3 | `/apple-voice-style` | Apple voice style | Calm, conversational on-hold tone matches Apple style |
| 4 | `/explainer-video-voice` | explainer video voiceover | On-hold callers also need web content narration |

---

#### `/voiceover-imaging` -- Status: NONE (0 out, 0 in)

**Fully isolated -- no inbound or outbound service links.**

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/on-hold-voice` | on hold voice | Both are audio branding services; reciprocal opportunity |
| 2 | `/commercial-voiceover` | commercial voiceover | Radio imaging clients often need commercial VO too |
| 3 | `/voiceoverguy` | about Guy Harris | Credibility cross-link for broadcast work |
| 4 | `/gameshow-host` | gameshow host voice | Imaging page mentions radio promo styles |

---

#### `/movie-trailer-voice` -- Status: NONE (0 out, 1 in)

Currently linked from: football-commentator-voice

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/game-trailer-voice` | game trailer voice | Body text explicitly mentions game trailers |
| 2 | `/football-commentator-voice` | football commentator voice | Reciprocal; both are dramatic performance voices |
| 3 | `/character-voiceover` | character voiceover | Trailer voices are character performances |
| 4 | `/voice-of-god` | Voice of God | Both share dramatic, authoritative delivery |

---

#### `/pirate-voice` -- Status: NONE (0 out, 0 in)

**Fully isolated -- no inbound or outbound service links.**

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/character-voiceover` | character voiceover | Pirate is a character voice; natural parent page |
| 2 | `/halloween-voice` | Halloween voiceover | Both are character/costume voices; seasonal crossover |
| 3 | `/game-trailer-voice` | game trailer voice | Pirate page mentions game voice work |
| 4 | `/santa-voice` | Santa voice | Seasonal character pairing |

---

#### `/gameshow-host` -- Status: NONE (0 out, 1 in)

Currently linked from: football-commentator-voice

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/football-commentator-voice` | football commentator voice | Reciprocal; both are live-energy performance voices |
| 2 | `/voice-of-god` | Voice of God | Both are event/arena announcing styles |
| 3 | `/commercial-voiceover` | commercial voiceover | Gameshow voice is used in promo and ad campaigns |
| 4 | `/character-voiceover` | character voiceover | Gameshow host is a character performance |

---

#### `/pathe-news-voice` -- Status: NONE (0 out, 1 in)

Currently linked from: football-commentator-voice

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/david-attenborough-voice` | David Attenborough voice | Both are period-influenced narration/impression styles |
| 2 | `/narration-voice` | narration voiceover | Pathe is a narration style at its core |
| 3 | `/football-commentator-voice` | football commentator voice | Reciprocal; Pathe page references commentary style |
| 4 | `/character-voiceover` | character voiceover | Pathe is a character impression performance |

---

#### `/halloween-voice` -- Status: STRONG outbound, NONE inbound (3 out, 0 in)

Currently links to: voiceoverguy, commercial-voiceover, game-trailer-voice
Currently linked from: (none)

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/character-voiceover` | character voiceover | Halloween characters (Ghost Face, Dracula) are character voices |
| 2 | `/pirate-voice` | pirate voice | Reciprocal; both are costume/character voices |
| 3 | `/santa-voice` | Santa voice | Seasonal pairing; Halloween + Christmas characters |

**Note:** This page's primary gap is inbound links. Pirate-voice, character-voiceover, and game-trailer-voice should link here.

---

#### `/explainer-video-voice` -- Status: NONE (0 out, 2 in)

Currently linked from: commercial-voiceover, apple-voice-style

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/apple-voice-style` | Apple voice style | Reciprocal; explainer tone is Apple-adjacent |
| 2 | `/narration-voice` | narration voiceover | Explainer videos are narration; reciprocal opportunity |
| 3 | `/commercial-voiceover` | commercial voiceover | Reciprocal; explainers serve commercial purposes |
| 4 | `/on-hold-voice` | on hold voice | Explainer clients often need on-hold too |

---

#### `/game-trailer-voice` -- Status: NONE (0 out, 1 in)

Currently linked from: halloween-voice

| # | Link To | Suggested Anchor Text | Rationale |
|---|---------|----------------------|-----------|
| 1 | `/movie-trailer-voice` | movie trailer voice | Body text explicitly references movie trailer style |
| 2 | `/character-voiceover` | character voiceover | Game trailers rely on character performances |
| 3 | `/halloween-voice` | Halloween voiceover | Reciprocal; game trailers use horror themes |
| 4 | `/pirate-voice` | pirate voice | Pirate page mentions game work; reciprocal |

---

## Priority Shortlist for Implementation

Ranked by combined impact (money page status + isolation severity + reciprocal potential + thematic fit):

| Priority | Page | Action | Impact |
|----------|------|--------|--------|
| 1 | `/santa-voice` | Add 3-4 outbound links (character, halloween, attenborough, commercial) | Money page, NONE status, 0 outbound, seasonal crosslinks |
| 2 | `/character-voiceover` | Add 4 outbound links (pirate, santa, attenborough, game-trailer) | Money page, NONE status, hub page for all character styles |
| 3 | `/voiceoverguy` | Add 2-3 more outbound links (character, voice-of-god, football-commentator, narration) | About/authority page, already strong but missing key money pages |
| 4 | `/narration-voice` | Add 3-4 outbound links (explainer, attenborough, commercial, apple) | Fully isolated, 0 in + 0 out, high-value commercial service |
| 5 | `/movie-trailer-voice` | Add 3 outbound links (game-trailer, football-commentator, character) | Money page, NONE status, strong reciprocal potential |
| 6 | `/david-attenborough-voice` | Add 2-3 more outbound links (narration, explainer, pathe-news) | Money page, WEAK status, strong thematic crosslinks |
| 7 | `/voice-of-god` | Add 3 outbound links (football-commentator, gameshow, commercial) | NONE status, reciprocal with football-commentator |
| 8 | `/game-trailer-voice` | Add 3 outbound links (movie-trailer, character, halloween) | NONE status, strong reciprocal with movie-trailer |
| 9 | `/pirate-voice` | Add 3 outbound links (character, halloween, game-trailer) | Fully isolated, character sub-page |
| 10 | `/on-hold-voice` | Add 3 outbound links (commercial, imaging, apple) | Fully isolated, audio branding cluster |
| 11 | `/voiceover-imaging` | Add 3 outbound links (on-hold, commercial, gameshow) | Fully isolated, audio branding cluster |
| 12 | `/explainer-video-voice` | Add 3 outbound links (apple, narration, commercial) | NONE outbound but 2 inbound, reciprocal needed |
| 13 | `/gameshow-host` | Add 3 outbound links (football-commentator, voice-of-god, commercial) | NONE status, reciprocal with football-commentator |
| 14 | `/pathe-news-voice` | Add 3 outbound links (attenborough, narration, football-commentator) | NONE status, niche page with strong vintage cluster |
| 15 | `/halloween-voice` | Add 2 inbound-focused recs (character, pirate should link here) | STRONG outbound but 0 inbound |
| 16 | `/football-commentator-voice` | Focus on inbound (voice-of-god, gameshow, movie-trailer should reciprocate) | STRONG outbound (6) but 0 inbound |

---

## Key Thematic Clusters for Linking

These natural clusters should inform the linking strategy:

1. **Commercial/Corporate cluster:** commercial-voiceover, apple-voice-style, explainer-video-voice, narration-voice, on-hold-voice
2. **Character/Impression cluster:** character-voiceover, david-attenborough-voice, pirate-voice, santa-voice, pathe-news-voice
3. **Dramatic performance cluster:** movie-trailer-voice, game-trailer-voice, football-commentator-voice, voice-of-god, gameshow-host
4. **Audio branding cluster:** voiceover-imaging, on-hold-voice, commercial-voiceover
5. **Seasonal cluster:** santa-voice, halloween-voice, pirate-voice

Cross-cluster links (e.g., character-voiceover linking to game-trailer-voice, or commercial-voiceover linking to on-hold-voice) create the strongest topical bridges and should be prioritised.

---

## Methodology

- **Data source:** `artifacts/web/src/data/pages.json`, with body fields determined per page from the actual Next.js page component rendering logic
- **Included fields:** Only fields rendered as visible body content (s3-s6 for most pages; s10, s11 additionally for voiceoverguy; s10, s12, s14, s16 additionally for explainer-video-voice; s11, s12 additionally for game-trailer-voice)
- **Excluded:** s1 (title), s2 (meta description), s7/s8 (metadata), s20/s21 (flags), YouTube/Vimeo IDs, nav/footer links, blog post links, contact page links, external links
- **URL normalisation:** Both absolute (`https://www.voiceoverguy.co.uk/slug`) and relative (`slug`, `/slug`) hrefs normalised to bare slug for matching
- **Inbound counts:** Computed programmatically from outbound graph to ensure consistency

*This report is audit + recommendations only. No links or page copy have been modified.*
