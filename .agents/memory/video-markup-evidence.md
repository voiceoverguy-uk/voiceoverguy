---
name: Video markup evidence
description: Evidence threshold for VoiceoverGuy video structured data and uncertain attribution.
---

Keep visible videos on their pages when structured-data facts cannot be verified; omit the VideoObject rather than supplying a blog date, page date, build date, or fallback. Source/provider publication metadata is acceptable evidence for uploadDate, but an unrelated post date is not. Do not assign creator or publisher to Guy merely because he supplied the voiceover: a third party may have made and published the video.

**Why:** The owner explicitly approved corrections only for verified facts and requires uncertain dates, ownership, and identity to be reported for confirmation instead of guessed.

**How to apply:** On future video additions or updates, verify the actual provider date and an accessible thumbnail for that exact ID. Keep the embedded video intact if verification fails; surface the missing facts to the owner before restoring its VideoObject. Reuse existing entity IDs only where the creator/publisher relationship is evidenced.