'use client';

import { useEffect, useState } from 'react';
import { watchContactReplyTiming, type ContactReplyTiming } from '@/lib/contactReplyTiming';
import { contactReplySettings } from '@/data/contactReplySettings';
import ReplyEstimateInfo from '@/components/ReplyEstimateInfo';

/** Shared by all contact forms: one schedule, copy and override. */
export default function ContactReplyEstimate() {
  // Identical server/first-browser markup; personalised clocks run after mount.
  const [replyTiming, setReplyTiming] = useState<ContactReplyTiming>({
    estimate: contactReplySettings.awayMessage?.trim() || 'I’ll reply as quickly as I can.',
    localHint: null,
  });

  useEffect(() => watchContactReplyTiming(setReplyTiming, contactReplySettings.awayMessage), []);

  return (
    <div className="contact-reply-time">
      <p className="contact-reply-time-line">
        <ReplyEstimateInfo away={Boolean(contactReplySettings.awayMessage?.trim())} />{' '}
        <span className="contact-reply-time-estimate">{replyTiming.estimate}</span>
      </p>
      {replyTiming.localHint && <small className="contact-reply-time-local">{replyTiming.localHint}</small>}
    </div>
  );
}
