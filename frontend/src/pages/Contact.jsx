import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import { Overline } from "@/components/Reveal";
import { SITE, telHref, waHref } from "@/lib/site";
import { useEnquiry } from "@/context/EnquiryContext";

const HERO = "https://images.unsplash.com/photo-1633323773493-71920ed75215?crop=entropy&cs=srgb&fm=jpg&q=85&w=1800";

export default function Contact() {
  const { openEnquiry } = useEnquiry();

  return (
    <>
      <Seo
        title="Contact Nomyra Travels"
        description={`Call or WhatsApp Nomyra Travels to plan a Meghalaya, Assam or Arunachal Pradesh trip. Phone ${SITE.phone}.`}
        path="/contact"
        image={HERO}
        schema={{
          "@context": "https://schema.org",
          "@type": "TravelAgency",
          name: SITE.name,
          telephone: SITE.phone,
          email: SITE.email,
          areaServed: "Northeast India",
        }}
      />
      <PageHero
        overline="Contact"
        title="Let's Plan Your Northeast Journey"
        subtitle="Call us for a quick conversation or send your trip details — we usually reply the same day."
        image={HERO}
        alt="Village on a green hillside in Northeast India"
      />

      <section className="bg-night py-20 md:py-28" data-testid="contact-page">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Overline className="mb-8">Direct contact</Overline>
            <ul className="space-y-7">
              <li>
                <a href={telHref} data-testid="contact-phone" className="group flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-terra" strokeWidth={1.5} />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-stone">Call</span>
                    <span className="font-display text-3xl text-ink group-hover:text-beige transition-colors">{SITE.phone}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={waHref()} target="_blank" rel="noreferrer noopener" data-testid="contact-whatsapp" className="group flex items-start gap-4">
                  <MessageCircle className="mt-1 h-5 w-5 text-terra" strokeWidth={1.5} />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-stone">WhatsApp</span>
                    <span className="font-display text-3xl text-ink group-hover:text-beige transition-colors">{SITE.whatsapp}</span>
                  </span>
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} data-testid="contact-email" className="group flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-terra" strokeWidth={1.5} />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-stone">Email</span>
                    <span className="break-all text-lg text-ink group-hover:text-beige transition-colors">{SITE.email}</span>
                  </span>
                </a>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-terra" strokeWidth={1.5} />
                <span>
                  <span className="block text-xs uppercase tracking-[0.16em] text-stone">Based in</span>
                  <span className="text-lg text-ink">{SITE.location}</span>
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="border border-white/10 bg-night-2 p-8 md:p-10">
              <Overline className="mb-5">Enquiry form</Overline>
              <h2 className="text-3xl md:text-4xl leading-tight">Tell us what you're looking for</h2>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                Share your dates, group size and the kind of trip you have in mind. Your enquiry reaches us directly
                and you can also forward it to us on WhatsApp with one tap.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <CTAButton onClick={() => openEnquiry({})} size="lg" data-testid="contact-open-form">Send Enquiry</CTAButton>
                <CTAButton href={telHref} variant="outline" size="lg" data-testid="contact-call-btn">
                  <Phone className="h-4 w-4" strokeWidth={1.6} /> Call Now
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
