/** Optional holiday/away override shared by homepage and blog reply estimates.
 * Set a message to replace the usual schedule, then return to null when back.
 * This is static site content: changes go live when the site is republished.
 */
export const contactReplySettings: { awayMessage: string | null } = {
  awayMessage: null,
};
