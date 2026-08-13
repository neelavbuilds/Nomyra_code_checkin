import { useParams, Link } from "react-router-dom";
import { Check, Phone } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import CTAButton from "@/components/CTAButton";
import { Reveal, Overline } from "@/components/Reveal";
import DestinationCard from "@/components/cards/DestinationCard";
import { usePackage, useDestinations } from "@/lib/content";
import { useEnquiry } from "@/context/EnquiryContext";
import { telHref } from "@/lib/site";

export default function PackageDetail() {
  const { slug } = useParams();
  const { data: pkg, error } = usePackage(slug);
  const { data: destinations = [] } = useDestinations();
  const { openEnquiry } = useEnquiry();

  if (error) {
    return (
      <div className="shell py-40 text-center">
        <h1 className="text-4xl">Package not found</h1>
        <CTAButton to="/packages" variant="outline" className="mt-8">All packages</CTAButton>
      </div>
    );
  }
  if (!pkg) return <div className="min-h-[70vh]" />;

  const related = destinations.filter((d) =>
    (pkg.highlights || []).some((h) => d.name.toLowerCase().includes(h.toLowerCase()) || d.state === h)
  ).slice(0, 4);

  return (
    <>
      <Seo
        title={`${pkg.title} Tour Package`}
        description={pkg.description}
        image={pkg.image}
        path={`/packages/${pkg.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: pkg.title,
          description: pkg.description,
          touristType: pkg.highlights,
          provider: { "@type": "TravelAgency", name: "Nomyra Travels" },
        }}
      />
      <PageHero
        overline={`Package ${pkg.code}`}
        title={pkg.title}
        subtitle={pkg.description}
        image={pkg.image}
        alt={pkg.image_alt}
      />

      <section className="bg-night py-20 md:py-28" data-testid="package-detail">
        <div className="shell grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Overline className="mb-6">What's included in the route</Overline>
            <ul className="space-y-4">
              {(pkg.highlights || []).map((h) => (
                <li key={h} className="flex items-start gap-4 border-b border-white/8 pb-4">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-terra" strokeWidth={1.6} />
                  <span className="text-lg text-ink">{h}</span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-base leading-[1.9] text-ink-soft">
              Nothing here is fixed. We use this as a frame and then adjust the nights, the driving days and the
              experiences to match your dates, your pace and how much comfort you want along the way.
            </p>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="border border-white/10 bg-night-2 p-8">
              <Overline className="mb-5">Enquire</Overline>
              <p className="font-display text-3xl leading-tight">{pkg.subtitle || pkg.title}</p>
              <dl className="mt-7 space-y-3 text-sm">
                <div className="flex justify-between border-b border-white/8 pb-3">
                  <dt className="text-ink-faint">Suggested duration</dt>
                  <dd className="text-ink">{pkg.duration || "Flexible"}</dd>
                </div>
                <div className="flex justify-between border-b border-white/8 pb-3">
                  <dt className="text-ink-faint">Pricing</dt>
                  <dd className="text-ink">On enquiry</dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                <CTAButton onClick={() => openEnquiry({ destination: pkg.title })} data-testid="package-detail-enquire">
                  {pkg.cta_label}
                </CTAButton>
                <CTAButton href={telHref} variant="outline" data-testid="package-detail-call">
                  <Phone className="h-4 w-4" strokeWidth={1.6} /> Call Now
                </CTAButton>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="bg-night-2 py-20 md:py-28" data-testid="package-related">
          <div className="shell">
            <Reveal>
              <Overline className="mb-5">On this route</Overline>
              <h2 className="text-4xl sm:text-5xl leading-tight">Places you will see</h2>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((d) => (
                <DestinationCard key={d.slug} destination={d} bento={false} />
              ))}
            </div>
            <Link to="/meghalaya" className="mt-10 inline-block text-xs uppercase tracking-[0.16em] text-beige">
              Explore more destinations
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
