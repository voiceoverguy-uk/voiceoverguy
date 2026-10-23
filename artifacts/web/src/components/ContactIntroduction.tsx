import type { CSSProperties, ReactNode } from 'react';
import ContactReplyEstimate from '@/components/ContactReplyEstimate';
import VisitorLocalGreeting from '@/components/VisitorLocalGreeting';

/** One contact introduction pattern for all form variants and future pages. */
export default function ContactIntroduction({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <>
      <p className={className} style={style}><VisitorLocalGreeting />{children}</p>
      <ContactReplyEstimate />
    </>
  );
}
