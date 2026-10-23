const ukClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Europe/London',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

/** Typical estimates in Guy's UK time, with the same schedule every day. */
export function getContactReplyTiming(now: Date, awayMessage?: string | null): string {
  if (awayMessage?.trim()) return awayMessage.trim();

  const parts = ukClock.formatToParts(now);
  const hour = Number(parts.find(part => part.type === 'hour')!.value);

  if (hour < 7) return 'Up late or starting early? I’ll most likely reply this morning.';
  if (hour < 11) return 'You’ll usually hear back from me very shortly.';
  if (hour < 12) return 'I’ll usually get back to you within a couple of hours.';
  if (hour < 17) return 'I’ll most likely get back to you this afternoon.';
  if (hour < 22) return 'Yes, I’m often still answering messages this evening!';
  return 'You’ll most likely hear back from me tomorrow morning.';
}

/** Start after mount: refresh on each minute and immediately on return to the tab. */
export function watchContactReplyTiming(
  onChange: (message: string) => void,
  awayMessage?: string | null,
): () => void {
  let timer: number;
  const update = () => {
    window.clearTimeout(timer);
    onChange(getContactReplyTiming(new Date(), awayMessage));
    timer = window.setTimeout(update, 60_000 - Date.now() % 60_000);
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
