import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import DestinationCard from "@/components/cards/DestinationCard";
import TripBuilder from "@/components/TripBuilder";
import { useDestinations } from "@/lib/content";

const COPY = {
  Meghalaya: {
    title: "Meghalaya — Where the Clouds Meet the Mountains",
    subtitle:
      "Explore the landscapes, villages, rivers and hidden experiences that make Meghalaya unforgettable.",
    seoTitle: "Meghalaya Tour Packages & Destinations",
    seoDesc:
      "Shillong, Sohra (Cherrapunji), Dawki, Nongriat, Jowai, Mawsynram and offbeat South West Khasi Hills — plan a Meghalaya trip with Nomyra Travels.",
    overline: "Meghalaya",
  },
  "Arunachal Pradesh": {
    title: "Arunachal Pradesh — The Mountains Keep Going",
    subtitle:
      "Tawang, Sela Pass, Dirang, Bomdila and the wide green valley of Ziro — the least travelled corner of India.",
    seoTitle: "Arunachal Pradesh Tour Packages & Destinations",
    seoDesc:
      "Tawang, Sela Pass, Dirang, Bomdila and Ziro valley — Arunachal Pradesh tour packages with Inner Line Permit support from Nomyra Travels.",
    overline: "Arunachal Pradesh",
  },
  Assam: {
    title: "Assam — Rivers, Grasslands and Tea",
    subtitle: "Kaziranga's rhino country, the Brahmaputra and the green rows of Assam's tea belt.",
    seoTitle: "Assam Tour Packages — Kaziranga & Tea Country",
    seoDesc:
      "Kaziranga National Park, Brahmaputra sunsets and Assam tea gardens — plan an Assam trip with Nomyra Travels.",
    overline: "Assam",
  },
};

export default function StatePage({ stateName }) {
  const { data: destinations = [] } = useDestinations(stateName);
  const copy = COPY[stateName];
  const path = stateName === "Arunachal Pradesh" ? "/arunachal" : `/${stateName.toLowerCase()}`;

  return (
    <>
      <Seo
        title={copy.seoTitle}
        description={copy.seoDesc}
        path={path}
        image={destinations[0]?.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${stateName} destinations`,
          itemListElement: destinations.map((d, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: d.name,
            description: d.tagline,
          })),
        }}
      />
      <PageHero
        overline={copy.overline}
        title={copy.title}
        subtitle={copy.subtitle}
        image={destinations[0]?.image}
        alt={destinations[0]?.image_alt}
      />

      <section className="bg-night py-20 md:py-28" data-testid={`state-destinations-${stateName.toLowerCase().replace(/\s+/g, "-")}`}>
        <div className="shell grid auto-rows-[300px] grid-flow-row-dense grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
          {destinations.map((d, i) => (
            <DestinationCard key={d.slug} destination={d} index={i} />
          ))}
        </div>
      </section>

      <TripBuilder />
    </>
  );
}
