/**
 * Close a native disclosure only after its following section reaches the top
 * of the readable viewport. Keep that section stationary when content shrinks.
 */
export function autoCloseDisclosure(
  details: HTMLDetailsElement,
  followingSection: Element,
) {
  let previousY = window.scrollY;
  let frame: number | null = null;

  const onToggle = () => {
    previousY = window.scrollY;
  };

  const checkPosition = () => {
    frame = null;
    const currentY = window.scrollY;
    const movingDown = currentY > previousY;
    previousY = currentY;
    if (!details.open || !movingDown) return;

    const navigation = document.querySelector('.navbar--fixed');
    const viewportTop = Math.max(0, navigation?.getBoundingClientRect().bottom ?? 0);
    const before = followingSection.getBoundingClientRect().top;
    if (details.getBoundingClientRect().bottom > viewportTop || before > viewportTop) return;

    // Measure after native layout/scroll anchoring, compensating only for any
    // remaining movement rather than subtracting the disclosure height twice.
    details.open = false;
    const displacement = followingSection.getBoundingClientRect().top - before;
    if (displacement !== 0) {
      window.scrollBy({ top: displacement, behavior: 'instant' });
    }
    previousY = window.scrollY;
  };

  const onScroll = () => {
    if (details.open && frame === null) frame = window.requestAnimationFrame(checkPosition);
    if (!details.open) previousY = window.scrollY;
  };

  details.addEventListener('toggle', onToggle);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => {
    details.removeEventListener('toggle', onToggle);
    window.removeEventListener('scroll', onScroll);
    if (frame !== null) window.cancelAnimationFrame(frame);
  };
}
