export const GA_MEASUREMENT_ID = 'G-94QXHW47HG';
const scriptId = 'google-analytics-script';
type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  'ga-disable-G-94QXHW47HG'?: boolean;
};

export function trackPage(pathname: string) {
  const browser = window as AnalyticsWindow;
  const referrer = document.referrer ? new URL(document.referrer) : null;
  const page = {
    page_location: window.location.origin + pathname,
    page_title: document.title,
    page_referrer: referrer ? referrer.origin + referrer.pathname : '',
  };
  browser[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  if (!document.getElementById(scriptId)) {
    browser.dataLayer = browser.dataLayer || [];
    browser.gtag = function () { browser.dataLayer!.push(arguments); };
    browser.gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied',
      ad_user_data: 'denied', ad_personalization: 'denied',
    });
    browser.gtag('consent', 'update', { analytics_storage: 'granted' });
    browser.gtag('js', new Date());
    browser.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      cookie_path: '/',
      ...page,
    });
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }
  // Do not send query strings or fragments, which can contain form/personal data.
  browser.gtag?.('event', 'page_view', page);
}

export function withdrawAnalytics() {
  const browser = window as AnalyticsWindow;
  browser[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  browser.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  // Clear GA cookies on this host and parent domains before reloading the tag away.
  const host = window.location.hostname.split('.');
  const domains = ['', ...host.map((_, index) => host.slice(index).join('.'))];
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0];
    if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/${domain ? `; Domain=${domain}` : ''}`;
    }
  }
}
