import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Img from "@/components/Img";
import CTAButton from "@/components/CTAButton";
import { useEnquiry } from "@/context/EnquiryContext";

export const PackageCard = ({ pkg, index = 0 }) => {
  const { openEnquiry } = useEnquiry();
  const custom = pkg.variant === "custom";

  return (
    <article
      data-testid={`package-card-${pkg.slug}`}
      className={`group relative flex flex-col ${custom ? "ring-1 ring-beige/30 bg-night-2" : ""}`}
    >
      <Link to={`/packages/${pkg.slug}`} className="relative block overflow-hidden">
        <div className="aspect-[3/4] w-full overflow-hidden">
          <Img src={pkg.image} alt={pkg.image_alt || pkg.title} zoom priority={index === 0} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-night via-night/25 to-transparent opacity-90" />
        <div className="absolute left-5 top-5 flex items-center gap-3">
          <span className="font-display text-3xl text-beige/80">{pkg.code}</span>
          {custom && <span className="overline text-terra">Bespoke</span>}
        </div>
        <div className="absolute inset-x-5 bottom-5">
          <h3 className="text-3xl leading-tight text-ink">{pkg.title}</h3>
          {pkg.subtitle && <p className="mt-1 text-sm text-ink-soft">{pkg.subtitle}</p>}
        </div>
      </Link>

      <div className={`flex flex-1 flex-col px-1 pt-6 ${custom ? "px-5 pb-6" : "pb-1"}`}>
        <p className="text-sm leading-relaxed text-ink-soft">{pkg.description}</p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {(pkg.highlights || []).slice(0, 7).map((h) => (
            <li key={h} className="text-xs uppercase tracking-[0.12em] text-stone">
              {h}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
          <CTAButton
            onClick={() => openEnquiry({ destination: pkg.title, package: pkg.title })}
            variant={custom ? "terra" : "outline"}
            size="sm"
            data-testid={`package-cta-${pkg.slug}`}
          >
            {pkg.cta_label}
          </CTAButton>
          <Link
            to={`/packages/${pkg.slug}`}
            data-testid={`package-details-${pkg.slug}`}
            className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-ink-faint transition-colors hover:text-beige"
          >
            Details <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PackageCard;
