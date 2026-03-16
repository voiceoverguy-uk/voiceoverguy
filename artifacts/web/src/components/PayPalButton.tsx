'use client';

import { useEffect } from 'react';

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

export default function PayPalButton() {
  useEffect(() => {
    const existing = document.getElementById('paypal-sdk-script');
    if (existing) {
      renderButton();
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk-script';
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&components=hosted-buttons&disable-funding=venmo&currency=GBP`;
    script.onload = renderButton;
    document.body.appendChild(script);

    function renderButton() {
      if (window.paypal) {
        window.paypal
          .HostedButtons({ hostedButtonId: BUTTON_ID })
          .render(`#${CONTAINER_ID}`);
      }
    }
  }, []);

  return <div id={CONTAINER_ID} style={{ marginTop: '16px' }} />;
}
