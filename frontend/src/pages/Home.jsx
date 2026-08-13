import { Link } from "react-router-dom";
import { ArrowRight, Compass, Headset, Map, Route as RouteIcon, Phone, MessageCircle } from "lucide-react";
import Seo from "@/components/Seo";
import Img from "@/components/Img";
import CTAButton from "@/components/CTAButton";
import { Reveal, Overline, SectionHead } from "@/components/Reveal";
import TripBuilder from "@/components/TripBuilder";
import PackageCard from "@/components/cards/PackageCard";
import DestinationCard from "@/components/cards/DestinationCard";
import ExperienceCard from "@/components/cards/ExperienceCard";
import TestimonialCard from "@/components/cards/TestimonialCard";
import GalleryCard from "@/components/cards/GalleryCard";
import { useEnquiry } from "@/context/EnquiryContext";
import { SITE, telHref, waHref } from "@/lib/site";
import {
  usePackages, useDestinations, useExperiences, useTestimonials, useGallery, useBlog, useWhyUs,
} from "@/lib/content";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1752543523383-6563710b0e34?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000";

const ICONS = { map: Map, route: RouteIcon, compass: Compass, headset: Headset };

const PILLARS = [
  { key: "LOCAL", text: "Meet the people, communities and cultures that make Northeast India unique.", image: "https://static.prod-images.emergentagent.com/jobs/98a77621-5d9d-419a-b5a6-462a35c63ca7/images/4c6e85e14619e7ec7be3afd2e2e4d0136af1e8df8fcce52adbb3e623080edd84.jpeg", alt: "Local street life in a Meghalaya hill town" },
  { key: "OFFBEAT", text: "Go beyond the places everyone else visits.", image: "https://static.prod-images.emergentagent.com/jobs/98a77621-5d9d-419a-b5a6-462a35c63ca7/images/a6306b6aceb20da283c63a16cd79b9893e2c83dc771a87d541d288382707407e.jpeg", alt: "Ancient monoliths in the offbeat South West Khasi Hills" },
  { key: "ADVENTURE", text: "Trek, camp, discover waterfalls and experience the landscape.", image: "https://images.pexels.com/photos/10151003/pexels-photo-10151003.jpeg?auto=compress&cs=tinysrgb&w=1200", alt: "Trekkers walking a green ridge in Northeast India" },
  { key: "PERSONAL", text: "Your journey should fit you — not a fixed itinerary.", image: "https://images.unsplash.com/photo-1633323773493-71920ed75215?crop=entropy&cs=srgb&fm=jpg&q=85&w=1200", alt: "Village on a green hillside in Northeast India" },
];

const FAQS = [
  {
    q: "What does a Northeast India tour package with Nomyra Travels include?",
    a: "Every Nomyra Travels package includes route planning, a local driver and vehicle, stays matched to your comfort level, local guides for treks and experiences, and support on WhatsApp or phone through the trip. Flights, permits and optional activities are quoted separately so you always know what you are paying for.",
  },
  {
    q: "How many days do I need for a Meghalaya and Assam tour?",
    a: "Six to eight days works well for Meghalaya with a couple of days in Assam. Nine to twelve days is better if you want Kaziranga, Shnongpdeng camping and the offbeat South West Khasi Hills without long driving days.",
  },
  {
    q: "What is the best time to visit Meghalaya and Arunachal Pradesh?",
    a: "October to April is the best overall window. December to March gives the clearest water at Dawki and Shnongpdeng, June to September brings Meghalaya's biggest waterfalls, and the Arunachal mountain roads to Tawang and Sela Pass are best avoided during peak monsoon.",
  },
  {
    q: "Do I need a permit for Arunachal Pradesh?",
    a: "Yes. Indian travellers need an Inner Line Permit and foreign nationals need a Protected Area Permit for Arunachal Pradesh. Nomyra Travels arranges the paperwork for your journey. Meghalaya and Assam need no permits.",
  },
  {
    q: "Can I get a customized Northeast India itinerary instead of a fixed package?",
    a: "Yes — most of our trips are custom. Tell us your dates, group size, budget and the experiences you want (camping, trekking, waterfalls, wildlife, culture, photography) and we build the route around you.",
  },
];

const KEYWORD_LINKS = [
  { label: "Meghalaya tour packages", to: "/meghalaya" },
  { label: "Meghalaya + Assam tour package", to: "/packages/meghalaya-assam" },
  { label: "Assam + Arunachal tour package", to: "/packages/assam-arunachal" },
  { label: "Customized Northeast India tour", to: "/packages/custom-northeast-india" },
  { label: "Shnongpdeng camping", to: "/experiences/camping-shnongpdeng" },
  { label: "Meghalaya trekking packages", to: "/experiences" },
  { label: "Dawki & Umngot river tour", to: "/destinations/dawki-umngot-river" },
  { label: "Cherrapunji (Sohra) tour", to: "/destinations/sohra-cherrapunji" },
  { label: "Offbeat South West Khasi Hills", to: "/blog/south-west-khasi-hills-travel-guide" },
  { label: "Arunachal Pradesh tour package", to: "/arunachal" },
];

const Hero = () => {
  const { openEnquiry } = useEnquiry();
  return (
    <section data-testid="hero" className="relative flex min-h-[100svh] items-end overflow-hidden">
      <div className="absolute inset-0">
        <Img src={HERO_IMAGE} alt="Waterfall falling through mist covered hills in Meghalaya, Northeast India" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-night/30" />
      <div className="absolute inset-0 grain" />

      <div className="shell relative z-10 pb-28 pt-40 md:pb-36">
        <Reveal>
          <Overline className="mb-6 text-beige/80">Northeast India · Curated Journeys</Overline>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl leading-[1.02] text-ink">
            Discover the Northeast,
            <span className="block italic text-beige">Beyond the Ordinary.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-xl text-base md:text-lg text-ink-soft leading-relaxed">{SITE.statement}</p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CTAButton to="/packages" size="lg" data-testid="hero-explore-btn">Explore Packages</CTAButton>
            <CTAButton onClick={() => openEnquiry({})} variant="outline" size="lg" data-testid="hero-plan-btn">Plan My Trip</CTAButton>
          </div>
        </Reveal>
        <Reveal delay={0.32}>
          <p className="mt-10 text-[0.7rem] uppercase tracking-[0.2em] text-stone">
            Local Experiences • Flexible Itineraries • Personalized Journeys
          </p>
        </Reveal>
      </div>

      <div className="scroll-hint absolute bottom-8 right-6 hidden h-16 w-[1px] overflow-hidden bg-white/15 md:block" aria-hidden="true">
        <span className="block h-8 w-[1px] bg-beige" />
      </div>
    </section>
  );
};

export default function Home() {
  const { openEnquiry } = useEnquiry();
  const { data: packages = [] } = usePackages();
  const { data: meghalaya = [] } = useDestinations("Meghalaya");
  const { data: experiences = [] } = useExperiences();
  const { data: testimonials = [] } = useTestimonials();
  const { data: gallery = [] } = useGallery();
  const { data: posts = [] } = useBlog();
  const { data: whyUs = [] } = useWhyUs();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: SITE.name,
      description: SITE.statement,
      slogan: SITE.tagline,
      telephone: SITE.phone,
      email: SITE.email,
      url: window.location.origin,
      image: HERO_IMAGE,
      priceRange: "On enquiry",
      areaServed: ["Meghalaya", "Assam", "Arunachal Pradesh", "Northeast India"],
      knowsAbout: [
        "Northeast India tour packages",
        "Meghalaya tour packages",
        "Meghalaya Assam tour package",
        "Assam Arunachal tour package",
        "Meghalaya camping packages",
        "Shnongpdeng camping",
        "Dawki tour",
        "Cherrapunji tour",
        "Arunachal Pradesh tour package",
        "Northeast India customized tour",
      ],
      address: { "@type": "PostalAddress", addressRegion: "Northeast India", addressCountry: "IN" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: SITE.phone,
        contactType: "reservations",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Assamese", "Khasi"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <Seo
        title="Northeast India Tour Packages — Meghalaya, Assam & Arunachal"
        description="Nomyra Travels plans Northeast India tour packages — Meghalaya and Assam, Assam and Arunachal Pradesh, or a fully customized trip. Camping, treks, waterfalls, wildlife and offbeat journeys with local guides. Call +91 70024 92612."
        image={HERO_IMAGE}
        path="/"
        schema={schema}
      />

      <Hero />

      {/* Brand statement */}
      <section className="relative grain bg-night py-24 md:py-32" data-testid="brand-statement">
        <div className="shell relative z-10 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Overline className="mb-5">Our approach</Overline>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Travel Further.<br />
              <span className="italic text-beige">Discover Deeper.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <p className="text-base md:text-lg leading-[1.9] text-ink-soft">
              Nomyra Travels creates journeys for people who want to experience Northeast India beyond the usual
              tourist routes — from mist-covered Meghalaya and crystal-clear rivers to the mountains and remote
              landscapes of Arunachal Pradesh.
            </p>
            <div className="hairline my-10" />
            <div className="flex flex-wrap gap-x-12 gap-y-6">
              {["3 States", "Local Guides", "Flexible Days", "No Fixed Groups"].map((s) => (
                <span key={s} className="text-xs uppercase tracking-[0.16em] text-stone">{s}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-night-2 py-24 md:py-32" data-testid="packages-section">
        <div className="shell">
          <Reveal>
            <SectionHead overline="Tour packages" title="Choose Your Journey" subtitle="Three ways to explore Northeast India." />
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.slug} delay={i * 0.08}>
                <PackageCard pkg={pkg} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meghalaya */}
      <section className="relative grain bg-night py-24 md:py-32" data-testid="meghalaya-section">
        <div className="shell relative z-10">
          <Reveal>
            <SectionHead
              overline="Meghalaya"
              title="Meghalaya — Where the Clouds Meet the Mountains"
              subtitle="Explore the landscapes, villages, rivers and hidden experiences that make Meghalaya unforgettable."
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-14">
            <div className="relative aspect-[21/9] w-full overflow-hidden">
              <Img
                src="https://images.unsplash.com/photo-1494472155656-f34e81b17ddc?crop=entropy&cs=srgb&fm=jpg&q=85&w=2000"
                alt="Cinematic view of a waterfall over cliffs in Sohra Cherrapunji Meghalaya"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night/80 to-transparent" />
            </div>
          </Reveal>
          <div className="mt-8 grid auto-rows-[300px] grid-flow-row-dense grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
            {meghalaya.map((d, i) => (
              <DestinationCard key={d.slug} destination={d} index={i} />
            ))}
          </div>
          <div className="mt-12">
            <CTAButton to="/meghalaya" variant="outline" arrow data-testid="view-all-meghalaya">All Meghalaya destinations</CTAButton>
          </div>
        </div>
      </section>

      {/* Unexplored & Adventure */}
      <section className="relative overflow-hidden bg-[#0d100e] py-24 md:py-32" data-testid="unexplored-section">
        <div className="absolute inset-0 grain" />
        <div className="shell relative z-10">
          <Reveal>
            <Overline className="mb-5 text-terra">Unexplored & adventure</Overline>
            <h2 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">Go Beyond the Tourist Trail</h2>
            <p className="mt-6 max-w-xl text-base md:text-lg text-ink-soft">
              For travellers who want to experience the Northeast differently.
            </p>
          </Reveal>
          <div className="mt-16 space-y-20 md:space-y-24">
            {experiences.slice(0, 4).map((exp, i) => (
              <Reveal key={exp.slug} delay={0.05}>
                <ExperienceCard experience={exp} reverse={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
          <div className="mt-16">
            <CTAButton to="/experiences" variant="outline" arrow data-testid="view-all-experiences">View All Experiences</CTAButton>
          </div>
        </div>
      </section>

      {/* Travel differently */}
      <section className="bg-night py-24 md:py-32" data-testid="travel-differently">
        <div className="shell">
          <Reveal>
            <SectionHead overline="Why it feels different" title="Travel Deeper. Travel Differently." />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.08}>
                <article className="group relative h-[420px] overflow-hidden" data-testid={`pillar-${p.key.toLowerCase()}`}>
                  <Img src={p.image} alt={p.alt} zoom />
                  <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6">
                    <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-beige">{p.key}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TripBuilder />

      {/* Why Nomyra */}
      <section className="bg-night-2 py-24 md:py-32" data-testid="why-nomyra">
        <div className="shell">
          <Reveal>
            <SectionHead overline="Why us" title="Why Travel With Nomyra?" />
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((f, i) => {
              const Icon = ICONS[f.icon] || Compass;
              return (
                <Reveal key={f.title} delay={i * 0.08} className="border-t border-white/12 pt-7">
                  <Icon className="h-6 w-6 text-terra" strokeWidth={1.4} aria-hidden="true" />
                  <h3 className="mt-6 text-2xl text-ink">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-night py-24 md:py-32" data-testid="gallery-preview">
        <div className="shell">
          <Reveal>
            <SectionHead overline="Gallery" title="Northeast India, Frame by Frame" subtitle="Mountains, rivers, camps and villages across Meghalaya, Assam and Arunachal Pradesh." />
          </Reveal>
          <div className="mt-14 grid auto-rows-[190px] grid-cols-2 gap-3 sm:grid-cols-4 md:auto-rows-[220px]">
            {gallery.slice(0, 8).map((item, i) => (
              <GalleryCard key={item.id || i} item={item} index={i} />
            ))}
          </div>
          <div className="mt-10">
            <CTAButton to="/gallery" variant="outline" arrow data-testid="view-gallery-btn">Open full gallery</CTAButton>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-night-2 py-24 md:py-32" data-testid="testimonials-section">
        <div className="shell">
          <Reveal>
            <SectionHead overline="Testimonials" title="Stories From the Road" subtitle="These cards are editable placeholders. Real traveller reviews will be published here with their permission." />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.id || i} delay={i * 0.08}>
                <TestimonialCard testimonial={t} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      <section className="bg-night py-24 md:py-32" data-testid="blog-preview">
        <div className="shell">
          <Reveal>
            <SectionHead overline="Journal" title="Northeast Travel Stories" subtitle="Guides, routes and honest advice from the road." />
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {posts.slice(0, 3).map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link to={`/blog/${p.slug}`} data-testid={`home-blog-${p.slug}`} className="group block">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Img src={p.cover_image} alt={p.cover_alt || p.title} zoom />
                  </div>
                  <p className="overline mt-6">{p.category} · {p.read_time}</p>
                  <h3 className="mt-3 text-2xl leading-tight text-ink group-hover:text-beige transition-colors">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">{p.excerpt}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <CTAButton to="/blog" variant="outline" arrow data-testid="view-all-blog">Read all stories</CTAButton>
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section className="relative overflow-hidden bg-forest/25 py-24 md:py-32" data-testid="enquiry-cta">
        <div className="absolute inset-0 grain" />
        <div className="shell relative z-10 flex flex-col items-start gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <Overline className="mb-5">Enquire</Overline>
            <h2 className="max-w-2xl text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">
              Two ways to start your journey.
            </h2>
            <p className="mt-6 max-w-lg text-base md:text-lg text-ink-soft">
              Call us directly for a quick conversation, or send your details on WhatsApp and we will come back with a plan.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <CTAButton href={telHref} size="lg" data-testid="cta-call-btn">
              <Phone className="h-4 w-4" strokeWidth={1.6} /> Call Nomyra Travels
            </CTAButton>
            <CTAButton onClick={() => openEnquiry({})} variant="terra" size="lg" data-testid="cta-whatsapp-btn">
              <MessageCircle className="h-4 w-4" strokeWidth={1.6} /> Plan My Trip on WhatsApp
            </CTAButton>
          </Reveal>
        </div>
      </section>

      {/* SEO: FAQ + planning content */}
      <section className="bg-night-2 py-24 md:py-32" data-testid="faq-section">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Overline className="mb-5">Planning questions</Overline>
            <h2 className="text-4xl sm:text-5xl leading-[1.05]">
              Planning a Northeast India trip?
            </h2>
            <p className="mt-6 text-base md:text-lg text-ink-soft leading-relaxed">
              The questions travellers ask us most before booking a Meghalaya, Assam or Arunachal
              Pradesh journey.
            </p>
            <CTAButton onClick={() => openEnquiry({})} variant="outline" className="mt-8" data-testid="faq-plan-btn">
              Ask us anything
            </CTAButton>
          </Reveal>

          <div className="lg:col-span-6 lg:col-start-7">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05} className="border-t border-white/10 py-7">
                <h3 className="text-2xl leading-snug text-ink">{f.q}</h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-ink-soft">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="shell mt-16">
          <Overline className="mb-5">Popular searches</Overline>
          <div className="flex flex-wrap gap-2.5">
            {KEYWORD_LINKS.map((k) => (
              <Link
                key={k.label}
                to={k.to}
                data-testid={`keyword-link-${k.to.replace(/\//g, "-")}`}
                className="rounded-sm border border-white/12 px-4 py-2.5 text-xs uppercase tracking-[0.12em] text-ink-soft transition-colors hover:border-beige hover:text-beige"
              >
                {k.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Journey steps */}
      <section className="bg-night py-20" data-testid="journey-steps">
        <div className="shell">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            {["Discover", "Explore", "Choose", "Customize", "Enquire", "WhatsApp"].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-6">
                <span className="text-xs uppercase tracking-[0.2em] text-stone">
                  <span className="mr-2 text-terra">{String(i + 1).padStart(2, "0")}</span>{step}
                </span>
                {i < arr.length - 1 && <ArrowRight className="h-3.5 w-3.5 text-white/20" aria-hidden="true" />}
              </span>
            ))}
          </div>
          <a href={waHref()} target="_blank" rel="noreferrer noopener" className="sr-only">
            WhatsApp Nomyra Travels
          </a>
        </div>
      </section>
    </>
  );
}
