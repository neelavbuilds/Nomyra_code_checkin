import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV_LINKS, SITE, telHref } from "@/lib/site";
import { useEnquiry } from "@/context/EnquiryContext";
import CTAButton from "@/components/CTAButton";

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenu(false), [pathname]);

  return (
    <header
      data-testid="site-nav"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || menu ? "bg-night/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className={`shell flex items-center justify-between transition-all duration-500 ${scrolled ? "py-3" : "py-5 md:py-7"}`}>
        <Link to="/" data-testid="nav-logo" className="group flex flex-col leading-none">
          <span
            className={`font-display tracking-[0.18em] text-ink transition-all duration-500 ${
              scrolled ? "text-lg" : "text-xl md:text-2xl"
            }`}
          >
            NOMYRA
          </span>
          <span className="overline mt-1 text-[0.6rem] text-stone group-hover:text-beige transition-colors">
            Travels
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-[0.78rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300 ${
                pathname === l.to ? "text-beige" : "text-ink-soft hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <CTAButton href={telHref} variant="outline" size="sm" data-testid="nav-call-btn">
            <Phone className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden="true" />
            Call Now
          </CTAButton>
          <CTAButton onClick={() => openEnquiry({})} variant="solid" size="sm" data-testid="nav-plan-btn">
            Plan Your Trip
          </CTAButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <a
            href={telHref}
            aria-label={`Call ${SITE.name}`}
            data-testid="nav-mobile-call"
            className="grid h-11 w-11 place-items-center rounded-sm border border-white/15 text-ink"
          >
            <Phone className="h-4 w-4" strokeWidth={1.6} />
          </a>
          <button
            type="button"
            onClick={() => setMenu((v) => !v)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            data-testid="nav-menu-toggle"
            className="grid h-11 w-11 place-items-center rounded-sm border border-white/15 text-ink"
          >
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/10 bg-night/95 backdrop-blur-xl"
            data-testid="nav-mobile-menu"
          >
            <div className="shell flex flex-col py-6">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  data-testid={`nav-mobile-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                  className="py-3.5 font-display text-2xl text-ink border-b border-white/5"
                >
                  {l.label}
                </Link>
              ))}
              <CTAButton
                onClick={() => { setMenu(false); openEnquiry({}); }}
                variant="solid"
                size="lg"
                className="mt-7 w-full"
                data-testid="nav-mobile-plan-btn"
              >
                Plan Your Trip
              </CTAButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Nav;
