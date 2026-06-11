import React, { useEffect, useRef, useState } from 'react';

export default function AdSense({
  adClient = 'ca-pub-8793649344824940',
  adSlot,
  style = { display: 'block' },
  adFormat,
  adLayoutKey,
  fullWidthResponsive,
  className,
}) {
  const ref = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    try {
      const consentRaw = localStorage.getItem('cookieConsent');
      const consent = consentRaw ? JSON.parse(consentRaw) : null;
      // Only show marketing ads if user granted marketing consent
      if (consent && consent.marketing) {
        setEnabled(true);
      }
    } catch (e) {
      // if parsing fails, keep ads disabled
      setEnabled(false);
    }
  }, []);

  useEffect(() => {
    const scriptSrc =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' +
      encodeURIComponent(adClient);

    let script = Array.from(document.getElementsByTagName('script')).find(
      (s) => s.src && s.src.indexOf('pagead2.googlesyndication.com/pagead/js/adsbygoogle.js') !== -1
    );

    const ensureScript = () => {
      return new Promise((resolve) => {
        if (window.adsbygoogle) return resolve();
        if (script) {
          if (script.getAttribute('data-loaded')) return resolve();
          script.addEventListener('load', () => resolve());
        } else {
          script = document.createElement('script');
          script.async = true;
          script.crossOrigin = 'anonymous';
          script.src = scriptSrc;
          script.addEventListener('load', () => {
            script.setAttribute('data-loaded', '1');
            resolve();
          });
          document.head.appendChild(script);
        }
      });
    };

    let mounted = true;

    const tryInit = () => {
      if (!mounted) return;
      ensureScript().then(() => {
        try {
          if (ref.current) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } catch (e) {
          // ignore
        }
      });
    };

    if (enabled) tryInit();

    const onConsent = () => {
      // re-evaluate consent and initialize if granted
      try {
        const consentRaw = localStorage.getItem('cookieConsent');
        const consent = consentRaw ? JSON.parse(consentRaw) : null;
        if (consent && consent.marketing) {
          setEnabled(true);
        }
      } catch (e) {}
    };

    window.addEventListener('cookieConsentChanged', onConsent);
    window.addEventListener('storage', onConsent);

    return () => {
      mounted = false;
      window.removeEventListener('cookieConsentChanged', onConsent);
      window.removeEventListener('storage', onConsent);
    };
  }, [enabled, adClient]);

  if (!enabled) return null;

  const dataAttrs = {};
  if (adSlot) dataAttrs['data-ad-slot'] = adSlot;
  if (adFormat) dataAttrs['data-ad-format'] = adFormat;
  if (adLayoutKey) dataAttrs['data-ad-layout-key'] = adLayoutKey;
  if (fullWidthResponsive) dataAttrs['data-full-width-responsive'] = 'true';

  return (
    <ins
      ref={ref}
      className={className ? `adsbygoogle ${className}` : 'adsbygoogle'}
      style={style}
      data-ad-client={adClient}
      {...dataAttrs}
    ></ins>
  );
}
