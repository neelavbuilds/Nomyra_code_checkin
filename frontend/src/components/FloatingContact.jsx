import { Phone, MessageCircle } from "lucide-react";
import { SITE, telHref, waHref } from "@/lib/site";

export const FloatingContact = () => (
  <div
    data-testid="floating-contact"
    className="fixed bottom-4 right-4 z-40 flex flex-col gap-3 md:bottom-8 md:right-8"
  >
    <a
      href={waHref()}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`Message ${SITE.name} on WhatsApp`}
      data-testid="floating-whatsapp"
      className="group flex h-14 w-14 items-center justify-center rounded-full bg-forest text-ink shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/15 transition-colors duration-300 hover:bg-terra hover:text-night md:h-14 md:w-auto md:gap-2 md:px-6"
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.7} />
      <span className="hidden md:inline text-[0.75rem] font-semibold uppercase tracking-[0.16em]">WhatsApp</span>
    </a>
    <a
      href={telHref}
      aria-label={`Call ${SITE.name}`}
      data-testid="floating-call"
      className="group flex h-14 w-14 items-center justify-center rounded-full bg-beige text-night shadow-[0_10px_30px_rgba(0,0,0,0.45)] ring-1 ring-white/15 transition-colors duration-300 hover:bg-ink md:h-14 md:w-auto md:gap-2 md:px-6"
    >
      <Phone className="h-5 w-5" strokeWidth={1.7} />
      <span className="hidden md:inline text-[0.75rem] font-semibold uppercase tracking-[0.16em]">Call</span>
    </a>
  </div>
);

export default FloatingContact;
