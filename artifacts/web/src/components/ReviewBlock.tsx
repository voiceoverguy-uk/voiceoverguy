export default function ReviewBlock() {
  return (
    <div className="review-block">
      <div className="review-stars">★★★★★</div>
      <p className="review-text">
        Rated <span className="review-highlight">5.0</span> on Google by{' '}
        <span className="review-highlight">119</span> Happy Clients
      </p>
      <a
        href="https://www.google.com/search?q=voiceoverguy+guy+harris+reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="review-cta"
      >
        READ REVIEWS ON GOOGLE &rarr;
      </a>
    </div>
  );
}
