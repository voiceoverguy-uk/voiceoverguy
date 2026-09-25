'use client';

import { useEffect } from 'react';
import { ConsentGate } from '@/components/ThirdPartyConsent';

declare global {
  interface Window {
    paypal?: {
      HostedButtons: (opts: { hostedButtonId: string }) => { render: (selector: string) => void };
    };
  }
}

const CLIENT_ID =
  'BAAMP01Wih3RJwwY9pp3zcmeSuwovmzMaYB2M05VF9QTxY_RJ7nB38i59Sn-SGnDIR1BD2zhuSVkcx1rZU';
const BUTTON_ID = '88CKT5NKL3DJ6';
const CONTAINER_ID = 'paypal-container-88CKT5NKL3DJ6';

function PayPalCheckout() {
  useEffect(() => {
    let cancelled = false;
    const existing = document.getElementById('paypal-sdk-script');
    if (existing) {
      renderButton();
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk-script';
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&components=hosted-buttons&disable-funding=venmo&currency=GBP`;
    script.onload = () => { if (!cancelled) renderButton(); };
    document.body.appendChild(script);

    function renderButton() {
      if (!cancelled && window.paypal) {
        window.paypal
          .HostedButtons({ hostedButtonId: BUTTON_ID })
          .render(`#${CONTAINER_ID}`);
      }
    }
    return () => { cancelled = true; };
  }, []);

  return <div id={CONTAINER_ID} style={{ marginTop: '16px' }} />;
}

export default function PayPalButton() {
  return <ConsentGate category="payments" provider="PayPal"><PayPalCheckout /></ConsentGate>;
}
