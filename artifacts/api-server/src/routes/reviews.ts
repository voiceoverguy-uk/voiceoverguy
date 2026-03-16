import { Router, type IRouter } from "express";

const router: IRouter = Router();

const PLACE_ID = "ChIJL1W4QyVneUgRBV8j4XrOzaM";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const DEFAULT_RATING = 5.0;
const DEFAULT_COUNT = 120;

let cached: { rating: number; reviewCount: number; fetchedAt: number } | null = null;

async function fetchFromGoogle(): Promise<{ rating: number; reviewCount: number }> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return { rating: DEFAULT_RATING, reviewCount: DEFAULT_COUNT };
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=rating,user_ratings_total&key=${apiKey}`;

  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(`Google Places API returned ${resp.status}`);
  }

  const data = await resp.json();

  if (data.status !== "OK") {
    throw new Error(`Google Places API status: ${data.status}`);
  }

  return {
    rating: data.result?.rating ?? DEFAULT_RATING,
    reviewCount: data.result?.user_ratings_total ?? DEFAULT_COUNT,
  };
}

router.get("/reviews", async (_req, res) => {
  try {
    const now = Date.now();
    if (cached && now - cached.fetchedAt < CACHE_TTL_MS) {
      res.json({ rating: cached.rating, reviewCount: cached.reviewCount });
      return;
    }

    const result = await fetchFromGoogle();
    cached = { ...result, fetchedAt: now };
    res.json(result);
  } catch {
    res.json({ rating: DEFAULT_RATING, reviewCount: DEFAULT_COUNT });
  }
});

export default router;
