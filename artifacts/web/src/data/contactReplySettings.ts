/** Optional holiday/away override shared by every contact-form reply estimate.
 * Set a message to replace the usual schedule, then return to null when back.
 * This is static site content: changes go live when the site is republished.
 */
export const contactReplySettings: { awayMessage: string | null } = {
  awayMessage: null,
};
