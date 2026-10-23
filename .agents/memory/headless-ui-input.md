---
name: Headless UI input verification
description: Verify browser input delivery and account for disabled-script limitations in accessibility tests.
---

An earlier shell-launched Chromium instance rendered the app and exposed a working DevTools connection, but direct `Input.dispatchMouseEvent` and `Input.dispatchKeyEvent` did not trigger DOM input events, even when hit-testing identified the intended control. This is not a blanket Chromium limitation: a Playwright-launched system Chromium subsequently delivered trusted keyboard events and native disclosure actions successfully.

**Why:** Treating a successful DevTools command as proof of a real user interaction can produce a false pass or false failure.

**How to apply:** For browser checks in this workspace, verify native semantics and accessibility properties separately from physical input. If actual mouse, touch, or keyboard events must be exercised, use a browser automation harness that confirms the event reaches the page.

With page JavaScript disabled, DevTools evaluation can inspect DOM state but installed event listeners do not execute. Require native focus/state/navigation changes after every keyboard action instead of waiting for DOM event telemetry. For asynchronous anchor scrolling, poll target geometry directly rather than relying on observer-based viewport assertions.

**Why:** Disabled-script testing otherwise misreports delivered keys or successful anchor navigation as failures because the observation callbacks cannot run.

**How to apply:** Prove page scripting is disabled with an inert inline-script probe, then verify native effects. Never enable scripting temporarily to obtain a passing no-JavaScript test.

Prefer an explicit IPv4 loopback address (`127.0.0.1`) for shell-launched Chromium DevTools WebSocket connections from Node.

**Why:** The advertised `localhost` WebSocket endpoint stalled, while the same endpoint using IPv4 connected and completed desktop/mobile DOM checks.

**How to apply:** If a local DevTools connection stalls before navigation, try IPv4 and put a timeout on each protocol request rather than waiting indefinitely.
