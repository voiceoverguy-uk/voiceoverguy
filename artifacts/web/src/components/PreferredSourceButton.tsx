'use client';

export default function PreferredSourceButton() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        margin: 0,
        width: '100%',
      }}
    >
      <a
        href="https://www.google.com/preferences/source?q=voiceoverguy.co.uk"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#fff', textDecoration: 'underline', padding: '12px 0' }}
      >
        Add VoiceoverGuy as a preferred source on Google
      </a>
    </div>
  );
}