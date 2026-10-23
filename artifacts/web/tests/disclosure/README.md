# AI notice regression checks

Start the existing web development workflow, then run from the workspace root:

```sh
CHROMIUM_PATH="$(command -v chromium)" pnpm --filter @workspace/web test:disclosure
```

Outside Replit, install Playwright Chromium once with
`pnpm --filter @workspace/web exec playwright install chromium`, then omit
`CHROMIUM_PATH`. Set `DISCLOSURE_BASE_URL` to test another **local** server.
The suite does not start a second Next server or publish anything.

The command runs the scroll helper unit tests and browser regressions. Browser
tests with scripting enabled fail (not skip) if input is acknowledged by the
protocol but trusted keydown/keyup events do not arrive in the document. With
JavaScript disabled, DOM event listeners cannot run either, so every key must
produce an asserted native focus, disclosure or navigation change. Native focus movement and
disclosure state changes are asserted independently; DOM `.click()` or synthetic
keyboard events must not replace these checks. Test setup may focus the preceding
control, but reaching the summary and toggling it require delivered keyboard input.

Coverage: native semantics and focus ring, Tab entry, Enter/Space open and close,
automatic collapse with focus on summary/inside/outside, no viewport jump, usable
focus and subsequent navigation, no-JavaScript native toggling, server-rendered
copy/experience, contact and terms navigation, and external anchor destinations.
External resource navigation is intercepted with an inert response: this proves
the links work without JavaScript, not that third-party sites remain available.
The harness disables CSS smooth scrolling to check final native anchor destinations
without racing scroll-animation timing; it does not replace native input or
disclosure behavior.

Failure screenshots and traces go in `generated-artifacts/disclosure-tests/`
(ignored by Git and deployment).
