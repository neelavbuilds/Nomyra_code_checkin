import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import Img from "@/components/Img";
import CTAButton from "@/components/CTAButton";
import { Overline, Reveal } from "@/components/Reveal";
import { useAbout, useWhyUs } from "@/lib/content";
import { useEnquiry } from "@/context/EnquiryContext";

export default function About() {
  const { data: about } = useAbout();
  const { data: whyUs = [] } = useWhyUs();
  const { openEnquiry } = useEnquiry();

  if (!about) return <div className="min-h-[70vh]" />;

  return (
    <>
      <Seo
        title="About Nomyra Travels — Northeast India Travel Company"
        description="Nomyra Travels plans personal, local, offbeat journeys across Meghalaya, Assam and Arunachal Pradesh with local drivers, guides and village stays."
        path="/about"
        image={about.image}
      />
      <PageHero
        overline="About us"
        title={about.heading}
        subtitle="Local knowledge, flexible journeys and a genuine relationship with the places we send you."
        image={about.image}
        alt={about.image_alt}
      />

      <section className="bg-night py-20 md:py-28" data-testid="about-story">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Overline className="mb-6">Our story</Overline>
            {(about.story || []).map((p, i) => (
              <p key={i} className="mb-6 text-lg leading-[1.9] text-ink-soft">{p}</p>
            ))}
            <div className="hairline my-10" />
            <Overline className="mb-4">Mission</Overline>
            <p className="font-display text-2xl leading-snug text-ink md:text-3xl">{about.mission}</p>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-white/10 bg-night-2">
              <div className="aspect-square w-full overflow-hidden">
                <Img src={about.founder_photo} alt={about.founder_photo_alt} />
              </div>
              <div className="p-7">
                <Overline className="mb-3">Founder</Overline>
                <p className="text-sm leading-relaxed text-ink-soft" data-testid="about-founder-note">{about.founder_note}</p>
              </div>
            </div>
            <div className="mt-6 border border-dashed border-white/12 p-7">
              <Overline className="mb-3">Team & local guides</Overline>
              <p className="text-sm leading-relaxed text-ink-soft" data-testid="about-team-note">{about.team_note}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-night-2 py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <Overline className="mb-5">Why us</Overline>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">Why Travel With Nomyra?</h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.08} className="border-t border-white/12 pt-7">
                <h3 className="text-2xl text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">{f.text}</p>
              </Reveal>
            ))}
          </div>
          <CTAButton onClick={() => openEnquiry({})} size="lg" className="mt-16" data-testid="about-plan-btn">
            Plan My Trip
          </CTAButton>
        </div>
      </section>
    </>
  );
}
