import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import { fetcher } from "@/lib/api";
import { SITE } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import EnquiryForm from "@/components/EnquiryForm";

export const Layout = ({ children }) => {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: "instant" }), [pathname]);

  useEffect(() => {
    // Runtime fallback so contact details stay correct even without a rebuild.
    if (SITE.phone && SITE.whatsapp && SITE.email) return;
    fetcher("/settings")
      .then((s) => {
        SITE.phone = SITE.phone || s.phone;
        SITE.whatsapp = SITE.whatsapp || s.whatsapp;
        SITE.email = SITE.email || s.email;
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-night text-ink">
      <Nav />
      <main>{children}</main>
      <Footer />
      <FloatingContact />
      <EnquiryForm />
    </div>
  );
};

export default Layout;
