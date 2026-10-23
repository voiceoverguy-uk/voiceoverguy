'use client';

import { useEffect, useState } from 'react';
import { watchContactReplyTiming } from '@/lib/contactReplyTiming';
import { contactReplySettings } from '@/data/contactReplySettings';

/** Shared by homepage and blog contact forms: one schedule, copy and override. */
export default function ContactReplyEstimate() {
  const [replyTiming, setReplyTiming] = useState(
    contactReplySettings.awayMessage?.trim() || 'I’ll reply as quickly as I can.',
  );

  useEffect(() => watchContactReplyTiming(setReplyTiming, contactReplySettings.awayMessage), []);

  return (
    <div className="contact-reply-time">
      <span className="contact-reply-time-label">Typical reply time</span>
      <p className="contact-reply-time-estimate">{replyTiming}</p>
      <small className="contact-reply-time-note">An estimate, not a guaranteed response time.</small>
    </div>
  );
}
