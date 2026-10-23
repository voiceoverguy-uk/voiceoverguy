/** Personal welcome only: never used to calculate Guy's UK reply estimate. */
export function getVisitorLocalGreeting(now: Date): string {
  const hour = now.getHours();
  if (!Number.isInteger(hour) || hour < 0 || hour > 23) return '';
  if (hour < 12) return 'Good morning.';
  if (hour < 18) return 'Good afternoon.';
  return 'Good evening.';
}

/** Call after mount so server-rendered and initial browser copy stay identical. */
export function watchVisitorLocalGreeting(onChange: (greeting: string) => void): () => void {
  let timer: number;
  const update = () => {
    window.clearTimeout(timer);
    let delay = 60_000;
    try {
      const now = new Date();
      onChange(getVisitorLocalGreeting(now));
      const timestamp = now.getTime();
      if (Number.isFinite(timestamp)) delay -= timestamp % 60_000;
    } catch {
      // A missing/unusable browser clock must not hide the contact introduction.
      onChange('');
    }
    timer = window.setTimeout(update, delay);
  };
  const onVisibilityChange = () => {
    if (document.visibilityState === 'visible') update();
  };
  update();
  document.addEventListener('visibilitychange', onVisibilityChange);
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener('visibilitychange', onVisibilityChange);
  };
}
