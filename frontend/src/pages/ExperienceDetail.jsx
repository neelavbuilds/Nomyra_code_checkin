import { useParams } from "react-router-dom";
import { MapPin, Phone, Mountain, CalendarDays } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import { Overline } from "@/components/Reveal";
import { useExperience } from "@/lib/content";
import { useEnquiry } from "@/context/EnquiryContext";
import { telHref } from "@/lib/site";

export default function ExperienceDetail() {
  const { slug } = useParams();
  const { data: exp, error } = useExperience(slug);
  const { openEnquiry } = useEnquiry();

  if (error) {
    return (
      <div className="shell py-40 text-center">
        <h1 className="text-4xl">Experience not found</h1>
        <CTAButton to="/experiences" variant="outline" className="mt-8">All experiences</CTAButton>
      </div>
    );
  }
  if (!exp) return <div className="min-h-[70vh]" />;

  return (
    <>
      <Seo
        title={`${exp.title} — ${exp.category} in Northeast India`}
        description={exp.description || exp.summary}
        image={exp.image}
        path={`/experiences/${exp.slug}`}
      />
      <PageHero overline={exp.category} title={exp.title} subtitle={exp.summary} image={exp.image} alt={exp.image_alt} />

      <section className="bg-night py-20 md:py-28" data-testid="experience-detail">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.14em] text-stone">
              {exp.location && <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />{exp.location}</span>}
              {exp.difficulty && <span className="flex items-center gap-2"><Mountain className="h-3.5 w-3.5" strokeWidth={1.5} />{exp.difficulty}</span>}
              {exp.best_time && <span className="flex items-center gap-2"><CalendarDays className="h-3.5 w-3.5" strokeWidth={1.5} />{exp.best_time}</span>}
            </div>
            <p className="mt-8 text-lg leading-[1.9] text-ink-soft">{exp.description}</p>
            <div className="hairline my-10" />
            <Overline className="mb-6">What it includes</Overline>
            <ul className="grid gap-3 sm:grid-cols-2">
              {(exp.highlights || []).map((h) => (
                <li key={h} className="border-l border-terra/60 pl-4 text-sm text-ink">{h}</li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-white/10 bg-night-2 p-8">
              <Overline className="mb-5">Enquire</Overline>
              <p className="font-display text-2xl leading-snug">Add {exp.title} to your journey</p>
              <div className="mt-8 flex flex-col gap-3">
                <CTAButton
                  onClick={() => openEnquiry({ experiences: [exp.title], message: `I'm interested in ${exp.title}.` })}
                  data-testid="experience-detail-enquire"
                >
                  {exp.cta_label || "Explore Experience"}
                </CTAButton>
                <CTAButton href={telHref} variant="outline" data-testid="experience-detail-call">
                  <Phone className="h-4 w-4" strokeWidth={1.6} /> Call Now
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
