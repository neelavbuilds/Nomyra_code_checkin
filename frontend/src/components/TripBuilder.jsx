import { useState } from "react";
import { TRIP_OPTIONS } from "@/lib/site";
import { useEnquiry } from "@/context/EnquiryContext";
import { Reveal, Overline } from "@/components/Reveal";

const Chip = ({ active, onClick, children, testid }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    data-testid={testid}
    className={`rounded-sm border px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors duration-300 ${
      active
        ? "border-beige bg-beige text-night"
        : "border-white/12 text-ink-soft hover:border-beige/50 hover:text-beige"
    }`}
  >
    {children}
  </button>
);

const Group = ({ title, options, value, onSelect, multi = false, name }) => (
  <div className="border-t border-white/10 py-8">
    <Overline className="mb-5">{title}</Overline>
    <div className="flex flex-wrap gap-2.5">
      {options.map((o) => (
        <Chip
          key={o}
          active={multi ? value.includes(o) : value === o}
          onClick={() => onSelect(o)}
          testid={`builder-${name}-${o.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
        >
          {o}
        </Chip>
      ))}
    </div>
  </div>
);

export const TripBuilder = () => {
  const { openEnquiry } = useEnquiry();
  const [destination, setDestination] = useState("");
  const [style, setStyle] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [duration, setDuration] = useState("");

  const toggle = (item) =>
    setExperiences((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]));

  return (
    <section id="trip-builder" data-testid="trip-builder" className="relative grain bg-night py-24 md:py-32">
      <div className="shell relative z-10">
        <Reveal className="max-w-3xl">
          <Overline className="mb-5">Custom trip builder</Overline>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05]">Tell Us What You're Looking For</h2>
          <p className="mt-6 text-base md:text-lg text-ink-soft">
            We'll help turn your idea into a Northeast India journey.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <Group title="Destination" name="destination" options={TRIP_OPTIONS.destination} value={destination} onSelect={setDestination} />
          <Group title="Travel Style" name="style" options={TRIP_OPTIONS.style} value={style} onSelect={setStyle} />
          <Group title="Experiences" name="experience" options={TRIP_OPTIONS.experiences} value={experiences} onSelect={toggle} multi />
          <Group title="Duration" name="duration" options={TRIP_OPTIONS.duration} value={duration} onSelect={setDuration} />

          <div className="flex flex-col items-start gap-5 border-t border-white/10 pt-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-md text-sm text-ink-faint">
              Your selections will be carried into the enquiry form automatically.
            </p>
            <button
              type="button"
              onClick={() =>
                openEnquiry({
                  destination,
                  travel_style: style,
                  experiences,
                  days: duration,
                  message: experiences.length ? `Interested in: ${experiences.join(", ")}.` : "",
                })
              }
              data-testid="build-my-trip-btn"
              className="w-full rounded-sm bg-terra px-10 py-5 font-display text-2xl text-night transition-colors duration-300 hover:bg-beige md:w-auto"
            >
              Build My Trip
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TripBuilder;
