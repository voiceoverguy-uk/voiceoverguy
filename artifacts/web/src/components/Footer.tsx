import Link from 'next/link';
import CurrentYear from './CurrentYear';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-social">
          <a
            href="https://www.youtube.com/channel/UCBKf-ETUIQ5dgh1WNLifhEQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            YouTube
          </a>
          <a
            href="https://soundcloud.com/voiceoverguy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SoundCloud"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1.175 12.225c-.015 0-.03.005-.045.005-.015 0-.03 0-.045-.005H1.07c-.06 0-.12.005-.175.01C.42 12.3 0 12.76 0 13.32c0 .575.45 1.04 1.01 1.04.015 0 .03 0 .045-.005h.12c.015.005.03.005.045.005s.03 0 .045-.005H1.7c.04 0 .08-.005.12-.01.52-.075.92-.52.92-1.06 0-.445-.27-.83-.645-.99zM11.99 2C6.47 2 2 6.47 2 12c0 .25.01.5.03.75H1.175c-.315 0-.61.05-.885.14C.105 12.81 0 13.055 0 13.32c0 .545.415 1 .945 1.04h.12c.025 0 .05.005.075.005h.12c.025 0 .05-.005.075-.005h.13c.635-.06 1.135-.59 1.135-1.235V13.1A9.997 9.997 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
            </svg>
            SoundCloud
          </a>
        </div>

        <p className="footer-tagline">
          <strong>Guy Harris – Award Winning British Male Voiceover</strong>
          {' – © 2000 – '}
          <CurrentYear />
          {' VoiceoverGuy ®'}
        </p>

        <p className="footer-copyright">
          Guy Harris · English Male VoiceoverGuy
        </p>

        <p className="footer-copyright" style={{ marginTop: '8px' }}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          {' · '}
          <Link href="/contact-guy">Contact Guy</Link>
          {' · '}
          <Link href="/FAQ">FAQ</Link>
        </p>
      </div>
    </footer>
  );
}
