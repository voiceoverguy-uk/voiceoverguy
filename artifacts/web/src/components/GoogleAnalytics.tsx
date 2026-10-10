'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useThirdPartyConsent } from './ThirdPartyConsent';
import { trackPage } from '@/lib/googleAnalytics';

export default function GoogleAnalytics() {
  const { preferences } = useThirdPartyConsent();
  const pathname = usePathname();
  const lastPage = useRef<string | null>(null);

  useEffect(() => {
    if (!preferences.analytics || !pathname) {
      lastPage.current = null;
      return;
    }
    if (lastPage.current === pathname) return;
    trackPage(pathname);
    lastPage.current = pathname;
  }, [preferences.analytics, pathname]);

  return null;
}
