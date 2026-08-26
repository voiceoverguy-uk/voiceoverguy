---
name: Google Preferred Sources iframe
description: Non-obvious layout behaviour of Google's generated Preferred Sources control.
---

Google's Preferred Sources script can force the generated cross-origin iframe to the full width of the element carrying the Google marker, overriding sizing or alignment placed directly on that marker.

**Why:** Flex alignment and direct width constraints on the marked element left the visible button at the iframe's internal left edge. A separate outer host constrained to the button width aligned the untouched host instead.

**How to apply:** When repositioning or aligning this control, keep sizing, clipping and alignment on a wrapper that does not carry the Google marker attribute. Let the script own only the nested marker element.