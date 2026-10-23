export const REPLY_ESTIMATE_EXPLANATION = 'This estimate updates automatically using Guy’s usual reply hours of 7am–11pm UK time. Any local times shown use your device’s time zone. It’s a guide, rather than live availability.';

export const AWAY_REPLY_EXPLANATION = 'Guy’s away or holiday message is currently shown instead of the normal reply-hours estimate. It’s a guide, rather than live availability.';

/** Prefer above the label to leave form fields clear; clamp to screen edges. */
export function replyTooltipPosition(
  anchor: { left: number; top: number; bottom: number },
  tooltip: { width: number; height: number },
  viewport: { width: number; height: number },
) {
  const edge = 12;
  const above = anchor.top - tooltip.height - 8;
  const below = anchor.bottom + 8;
  return {
    left: Math.max(edge, Math.min(anchor.left, viewport.width - tooltip.width - edge)),
    top: above >= edge
      ? above
      : Math.max(edge, Math.min(below, viewport.height - tooltip.height - edge)),
  };
}
