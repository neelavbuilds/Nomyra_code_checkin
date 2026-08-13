import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import PackageCard from "@/components/cards/PackageCard";
import TripBuilder from "@/components/TripBuilder";
import { Reveal } from "@/components/Reveal";
import { usePackages } from "@/lib/content";

export default function Packages() {
  const { data: packages = [] } = usePackages();

  return (
    <>
      <Seo
        title="Northeast India Tour Packages — Meghalaya, Assam & Arunachal"
        description="Meghalaya + Assam, Assam + Arunachal Pradesh, or a fully customized Northeast India tour package. Flexible itineraries built around your dates, pace and interests."
        path="/packages"
        image={packages[0]?.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Nomyra Travels Northeast India Tour Packages",
          itemListElement: packages.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            description: p.description,
          })),
        }}
      />
      <PageHero
        overline="Tour packages"
        title="Choose Your Journey"
        subtitle="Three ways to explore Northeast India — and every one of them can be reshaped around you."
        image={packages[1]?.image}
        alt="Mountains and valleys of Northeast India on a Nomyra Travels tour package"
      />

      <section className="bg-night py-20 md:py-28" data-testid="packages-list">
        <div className="shell grid gap-10 md:grid-cols-3 md:gap-8">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={i * 0.08}>
              <PackageCard pkg={pkg} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <TripBuilder />
    </>
  );
}
