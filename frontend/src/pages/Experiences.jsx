import { useMemo, useState } from "react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import ExperienceCard from "@/components/cards/ExperienceCard";
import TripBuilder from "@/components/TripBuilder";
import { Reveal } from "@/components/Reveal";
import { useExperiences } from "@/lib/content";

export default function Experiences() {
  const { data: experiences = [] } = useExperiences();
  const [filter, setFilter] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(experiences.map((e) => e.category).filter(Boolean)))],
    [experiences]
  );
  const visible = filter === "All" ? experiences : experiences.filter((e) => e.category === filter);

  return (
    <>
      <Seo
        title="Meghalaya Adventure & Offbeat Experiences"
        description="Shnongpdeng camping beside the Umngot river, the Thlu Chjawpaw falls trek from Nongnah, Mawkyrwat monoliths, the Nognah infinity pool, Nongriat root bridge trek and Kaziranga safari — offbeat Northeast India experiences."
        path="/experiences"
        image={experiences[0]?.image}
      />
      <PageHero
        overline="Unexplored & adventure"
        title="Go Beyond the Tourist Trail"
        subtitle="For travellers who want to experience the Northeast differently."
        image={experiences[0]?.image}
        alt={experiences[0]?.image_alt}
      />

      <section className="relative bg-[#0d100e] py-20 md:py-28" data-testid="experiences-list">
        <div className="absolute inset-0 grain" />
        <div className="shell relative z-10">
          <div className="no-scrollbar mb-16 flex gap-2.5 overflow-x-auto pb-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                data-testid={`experience-filter-${c.toLowerCase()}`}
                className={`flex-none rounded-sm border px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                  filter === c ? "border-beige bg-beige text-night" : "border-white/12 text-ink-soft hover:border-beige/50 hover:text-beige"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="space-y-20 md:space-y-24">
            {visible.map((exp, i) => (
              <Reveal key={exp.slug}>
                <ExperienceCard experience={exp} reverse={i % 2 === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TripBuilder />
    </>
  );
}
