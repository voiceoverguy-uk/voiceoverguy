/** Use the visitor's local clock. Call only after the page has mounted. */
export function getContactReplyTiming(now: Date): string {
  const minutes = now.getHours() * 60 + now.getMinutes();

  if (minutes >= 22 * 60 + 1) return 'Mind you it will probably be tomorrow now.';
  if (minutes < 7 * 60) return 'More than likely this morning.';
  if (minutes < 11 * 60) return 'More than likely very shortly.';
  if (minutes <= 12 * 60) return 'Usually within the next couple of hours.';
  if (minutes < 16 * 60) return 'Most likely this afternoon.';
  if (minutes >= 17 * 60) return 'Yes, even this evening normally.';
  return '';
}
