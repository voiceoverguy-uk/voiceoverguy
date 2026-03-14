import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 – Page Not Found | VoiceoverGuy',
};

export default function NotFound() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>404 – Page Not Found</h1>
          <p>Sorry, we couldn&apos;t find the page you were looking for.</p>
        </div>
      </div>
      <section className="page-content">
        <div className="container" style={{ textAlign: 'center', padding: '60px 15px' }}>
          <p style={{ fontSize: '16px', marginBottom: '24px' }}>
            The page you&apos;re looking for may have moved, been renamed, or doesn&apos;t exist.
          </p>
          <Link href="/" className="cta-btn">Back to Home</Link>
          {' '}
          <Link href="/contact-guy" className="cta-btn-outline" style={{ marginLeft: '12px' }}>
            Contact Guy
          </Link>
        </div>
      </section>
    </>
  );
}
