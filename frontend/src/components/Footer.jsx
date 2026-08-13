import { Link } from "react-router-dom";
import { Phone, MessageCircle, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { SITE, telHref, waHref } from "@/lib/site";
import { useEnquiry } from "@/context/EnquiryContext";
import CTAButton from "@/components/CTAButton";
import { Reveal } from "@/components/Reveal";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { label: "Home", to: "/" },
      { label: "Packages", to: "/packages" },
      { label: "Meghalaya", to: "/meghalaya" },
      { label: "Arunachal", to: "/arunachal" },
      { label: "Experiences", to: "/experiences" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Travel Stories", to: "/blog" },
      { label: "Gallery", to: "/gallery" },
      { label: "Privacy Policy", to: "/privacy-policy" },
      { label: "Terms & Conditions", to: "/terms" },
    ],
  },
];

export const Footer = () => {
  const { openEnquiry } = useEnquiry();
  const socials = [
    { href: SITE.instagram, Icon: Instagram, label: "Instagram" },
    { href: SITE.facebook, Icon: Facebook, label: "Facebook" },
    { href: SITE.youtube, Icon: Youtube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer data-testid="site-footer" className="relative grain border-t border-white/10 bg-night-2">
      <div className="shell relative z-10 py-20 md:py-24">
        <Reveal className="mb-16 flex flex-col gap-8 border-b border-white/10 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="overline mb-4">Ready to explore Northeast India?</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] max-w-2xl">
              Let's build your journey together.
            </h2>
          </div>
          <CTAButton onClick={() => openEnquiry({})} size="lg" data-testid="footer-plan-btn">
            Plan My Trip
          </CTAButton>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl tracking-[0.16em]">NOMYRA TRAVELS</p>
            <p className="mt-4 max-w-xs text-sm text-ink-soft leading-relaxed">{SITE.tagline}</p>
            <p className="mt-3 max-w-xs text-sm text-ink-faint leading-relaxed">{SITE.statement}</p>
            {socials.length > 0 && (
              <div className="mt-7 flex gap-3">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    data-testid={`footer-social-${label.toLowerCase()}`}
                    className="grid h-10 w-10 place-items-center rounded-sm border border-white/12 text-ink-soft transition-colors hover:border-beige hover:text-beige"
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="overline mb-6">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.to}>
                    <Link
                      to={l.to}
                      data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                      className="text-sm text-ink-soft transition-colors hover:text-beige"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="overline mb-6">Contact</p>
            <ul className="space-y-4 text-sm">
              <li>
                <a href={telHref} data-testid="footer-phone" className="flex items-center gap-3 text-ink-soft hover:text-beige transition-colors">
                  <Phone className="h-4 w-4 text-terra" strokeWidth={1.5} />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={waHref()} target="_blank" rel="noreferrer noopener" data-testid="footer-whatsapp" className="flex items-center gap-3 text-ink-soft hover:text-beige transition-colors">
                  <MessageCircle className="h-4 w-4 text-terra" strokeWidth={1.5} />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} data-testid="footer-email" className="flex items-center gap-3 break-all text-ink-soft hover:text-beige transition-colors">
                  <Mail className="h-4 w-4 text-terra" strokeWidth={1.5} />
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-ink-soft">
                <MapPin className="h-4 w-4 text-terra" strokeWidth={1.5} />
                {SITE.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Nomyra Travels. All rights reserved.</p>
          <p>Curated journeys across Northeast India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
