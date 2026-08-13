import { useParams } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import DestinationCard from "@/components/cards/DestinationCard";
import { Overline, Reveal } from "@/components/Reveal";
import { useDestination, useDestinations } from "@/lib/content";
import { useEnquiry } from "@/context/EnquiryContext";
import { telHref } from "@/lib/site";

export default function DestinationDetail() {
  const { slug } = useParams();
  const { data: destination, error } = useDestination(slug);
  const { data: all = [] } = useDestinations();
  const { openEnquiry } = useEnquiry();

  if (error) {
    return (
      <div className="shell py-40 text-center">
        <h1 className="text-4xl">Destination not found</h1>
        <CTAButton to="/meghalaya" variant="outline" className="mt-8">Browse destinations</CTAButton>
      </div>
    );
  }
  if (!destination) return <div className="min-h-[70vh]" />;

  const related = all.filter((d) => d.state === destination.state && d.slug !== destination.slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${destination.name} — ${destination.state} Travel Guide`}
        description={destination.description}
        image={destination.image}
        path={`/destinations/${destination.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "TouristAttraction",
          name: destination.name,
          description: destination.description,
          address: { "@type": "PostalAddress", addressRegion: destination.state, addressCountry: "IN" },
        }}
      />
      <PageHero
        overline={`${destination.state}${destination.region ? ` · ${destination.region}` : ""}`}
        title={destination.name}
        subtitle={destination.tagline}
        image={destination.image}
        alt={destination.image_alt}
      />

      <section className="bg-night py-20 md:py-28" data-testid="destination-detail">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-stone">
              <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} /> {destination.region || destination.state}
            </p>
            <p className="mt-7 text-lg leading-[1.9] text-ink-soft">{destination.description}</p>
            <div className="hairline my-10" />
            <Overline className="mb-6">Highlights</Overline>
            <ul className="grid gap-3 sm:grid-cols-2">
              {(destination.highlights || []).map((h) => (
                <li key={h} className="border-l border-terra/60 pl-4 text-sm text-ink">{h}</li>
              ))}
            </ul>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-white/10 bg-night-2 p-8">
              <Overline className="mb-5">Add to your trip</Overline>
              <p className="font-display text-2xl leading-snug">Want {destination.name} in your itinerary?</p>
              <div className="mt-8 flex flex-col gap-3">
                <CTAButton
                  onClick={() => openEnquiry({ destination: destination.state, message: `I'd like to include ${destination.name} in my trip.` })}
                  data-testid="destination-add-trip"
                >
                  Add to Custom Trip
                </CTAButton>
                <CTAButton href={telHref} variant="outline" data-testid="destination-call">
                  <Phone className="h-4 w-4" strokeWidth={1.6} /> Call Now
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-night-2 py-20 md:py-28">
          <div className="shell">
            <Reveal>
              <h2 className="text-4xl sm:text-5xl leading-tight">More in {destination.state}</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((d) => (
                <DestinationCard key={d.slug} destination={d} bento={false} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
