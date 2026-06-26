'use client';

import { useState, useEffect } from 'react';
import WhatsAppEnquiryModal from './WhatsAppEnquiryModal';

/**
 * SiteModalListener — renders the WhatsApp modal once at the site level.
 * Listens for 'open-whatsapp-modal' events dispatched from any component.
 */
export default function SiteModalListener() {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillService, setPrefillService] = useState<string | undefined>();

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setPrefillService(detail?.prefillService);
      setIsOpen(true);
    };
    window.addEventListener('open-whatsapp-modal', handler);
    return () => window.removeEventListener('open-whatsapp-modal', handler);
  }, []);

  return (
    <WhatsAppEnquiryModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      prefillService={prefillService}
    />
  );
}
