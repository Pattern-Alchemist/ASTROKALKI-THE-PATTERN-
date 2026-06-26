/**
 * WhatsApp Modal Event System
 *
 * Simple event-based approach — any component can dispatch
 * 'open-whatsapp-modal' and the modal listener (rendered once
 * in layout.tsx) will open it.
 */

export function openWhatsAppModal(prefillService?: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('open-whatsapp-modal', {
    detail: { prefillService }
  }));
}
