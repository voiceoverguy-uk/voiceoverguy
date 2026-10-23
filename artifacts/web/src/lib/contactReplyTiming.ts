const UK_TIME_ZONE = 'Europe/London';
const MINUTE_MS = 60_000;
const HOUR_MS = 60 * MINUTE_MS;
const ukClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: UK_TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export interface ContactReplyTiming {
  estimate: string;
  localHint: string | null;
}

function clockParts(formatter: Intl.DateTimeFormat, instant: Date) {
  const parts = formatter.formatToParts(instant);
  const number = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find(part => part.type === type)!.value);
  return {
    year: number('year'), month: number('month'), day: number('day'),
    hour: number('hour'), minute: number('minute'),
  };
}

/** Convert the next London 07:00 into an actual instant, not a fixed-hour wait.
 * At 07:00 the UK clock is never ambiguous or skipped by a GMT/BST transition.
 * Resolve the offset at that opening, not at "now", which may be across DST.
 */
export function getNextUkOpening(now: Date): Date {
  const uk = clockParts(ukClock, now);
  const wallTime = Date.UTC(uk.year, uk.month - 1, uk.day + (uk.hour >= 7 ? 1 : 0), 7);
  const openingClock = clockParts(ukClock, new Date(wallTime));
  const offset = Date.UTC(
    openingClock.year, openingClock.month - 1, openingClock.day,
    openingClock.hour, openingClock.minute,
  ) - wallTime;
  return new Date(wallTime - offset);
}

function roundedWait(milliseconds: number): string {
  // Half-hours for shorter waits, whole hours for longer ones: no minute countdown.
  const step = milliseconds < 3 * HOUR_MS ? 30 : 60;
  const roundedMinutes = Math.round(milliseconds / MINUTE_MS / step) * step;
  const hours = Math.floor(roundedMinutes / 60);
  const minutes = roundedMinutes % 60;
  return [
    hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '',
    minutes ? `${minutes} minutes` : '',
  ].filter(Boolean).join(' ');
}

function localOpeningHint(now: Date, opening: Date, visitorTimeZone: string): string | null {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: visitorTimeZone,
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  });
  if (formatter.resolvedOptions().timeZone === UK_TIME_ZONE) return null;

  const today = clockParts(formatter, now);
  const local = clockParts(formatter, opening);
  const localDay = Date.UTC(local.year, local.month - 1, local.day);
  const todayDay = Date.UTC(today.year, today.month - 1, today.day);
  const tomorrowDay = Date.UTC(today.year, today.month - 1, today.day + 1);
  const when = localDay === todayDay ? 'today' : localDay === tomorrowDay ? 'tomorrow'
    : `on ${new Intl.DateTimeFormat('en-GB', {
      timeZone: visitorTimeZone, day: 'numeric', month: 'short', year: 'numeric',
    }).format(opening)}`;
  const hour = local.hour % 12 || 12;
  const minute = local.minute ? `:${String(local.minute).padStart(2, '0')}` : '';
  return `That’s ${hour}${minute}${local.hour < 12 ? 'am' : 'pm'} your time ${when}.`;
}

/** Typical availability, not a guaranteed response or a live online status. */
export function getContactReplyTiming(
  now: Date,
  awayMessage?: string | null,
  visitorTimeZone = UK_TIME_ZONE,
): ContactReplyTiming {
  if (awayMessage?.trim()) return { estimate: awayMessage.trim(), localHint: null };

  const { hour } = clockParts(ukClock, now);
  if (hour >= 7 && hour < 23) {
    return { estimate: 'Usually within an hour.', localHint: null };
  }

  const opening = getNextUkOpening(now);
  const wait = opening.getTime() - now.getTime();
  return {
    estimate: wait <= HOUR_MS
      ? 'Within the next hour — from 7am UK time.'
      : `Around ${roundedWait(wait)} — from 7am UK time.`,
    localHint: localOpeningHint(now, opening, visitorTimeZone),
  };
}

/** Start after mount: refresh on each minute and immediately on return to the tab. */
export function watchContactReplyTiming(
  onChange: (timing: ContactReplyTiming) => void,
  awayMessage?: string | null,
): () => void {
  let timer: number;
  const update = () => {
    window.clearTimeout(timer);
    const visitorTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
    onChange(getContactReplyTiming(new Date(), awayMessage, visitorTimeZone));
    timer = window.setTimeout(update, MINUTE_MS - Date.now() % MINUTE_MS);
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
