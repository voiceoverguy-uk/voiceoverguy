---
name: Headless UI input verification
description: Limits observed when attempting browser input automation with shell-launched Chromium in this workspace.
---

The shell-launched Chromium instance rendered the app and exposed a working DevTools connection, but `Input.dispatchMouseEvent` and `Input.dispatchKeyEvent` did not trigger DOM input events, even when hit-testing identified the intended control. Calling a native disclosure summary's `.click()` did toggle its `<details>` state.

**Why:** Treating a successful DevTools command as proof of a real user interaction can produce a false pass or false failure.

**How to apply:** For browser checks in this workspace, verify native semantics and accessibility properties separately from physical input. If actual mouse, touch, or keyboard events must be exercised, use a browser automation harness that confirms the event reaches the page.
