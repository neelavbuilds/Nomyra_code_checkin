import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Img from "@/components/Img";
import CTAButton from "@/components/CTAButton";
import { useEnquiry } from "@/context/EnquiryContext";

export const ExperienceCard = ({ experience, reverse = false }) => {
  const { openEnquiry } = useEnquiry();
  return (
    <article
      data-testid={`experience-card-${experience.slug}`}
      className={`group grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${reverse ? "lg:[direction:rtl]" : ""}`}
    >
      <Link
        to={`/experiences/${experience.slug}`}
        className="relative block overflow-hidden lg:col-span-7 [direction:ltr]"
      >
        <div className="aspect-[16/11] w-full overflow-hidden">
          <Img src={experience.image} alt={experience.image_alt || experience.title} zoom position={experience.image_position} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
      </Link>

      <div className="lg:col-span-5 [direction:ltr]">
        <p className="overline mb-4 text-terra">{experience.category}</p>
        <h3 className="text-3xl md:text-4xl leading-tight text-ink">{experience.title}</h3>
        {experience.location && (
          <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-stone">
            <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />
            {experience.location}
          </p>
        )}
        <p className="mt-5 text-base text-ink-soft leading-relaxed">{experience.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {(experience.highlights || []).slice(0, 4).map((h) => (
            <li key={h} className="rounded-sm border border-white/10 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton
            onClick={() => openEnquiry({ destination: experience.location, experiences: [experience.title] })}
            variant="outline"
            size="sm"
            data-testid={`experience-cta-${experience.slug}`}
          >
            {experience.cta_label || "Explore Experience"}
          </CTAButton>
          <CTAButton to={`/experiences/${experience.slug}`} variant="ghost" size="sm" arrow data-testid={`experience-details-${experience.slug}`}>
            Details
          </CTAButton>
        </div>
      </div>
    </article>
  );
};

export default ExperienceCard;
