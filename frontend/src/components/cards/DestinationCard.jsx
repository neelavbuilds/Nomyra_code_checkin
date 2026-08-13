import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Img from "@/components/Img";

const SPANS = {
  large: "lg:col-span-6 lg:row-span-2 min-h-[320px] lg:min-h-[620px]",
  wide: "lg:col-span-6 min-h-[300px]",
  tall: "lg:col-span-3 lg:row-span-2 min-h-[320px] lg:min-h-[620px]",
  standard: "lg:col-span-3 min-h-[300px]",
};

export const DestinationCard = ({ destination, bento = true, index = 0 }) => (
  <Link
    to={`/destinations/${destination.slug}`}
    data-testid={`destination-card-${destination.slug}`}
    className={`group relative block overflow-hidden bg-night-2 ${
      bento ? SPANS[destination.span] || SPANS.standard : "min-h-[340px]"
    }`}
  >
    <div className="absolute inset-0">
      <Img src={destination.image} alt={destination.image_alt || destination.name} zoom priority={index < 2} />
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent transition-opacity duration-500 group-hover:from-night group-hover:via-night/55" />
    <div className="relative flex h-full flex-col justify-end p-6 md:p-8">
      <p className="overline mb-3 text-beige/70">{destination.region || destination.state}</p>
      <h3 className="text-2xl md:text-3xl leading-tight text-ink">{destination.name}</h3>
      {destination.tagline && (
        <p className="mt-2 max-w-md text-sm text-ink-soft leading-relaxed">{destination.tagline}</p>
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-beige opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        View Experience <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
      </span>
    </div>
  </Link>
);

export default DestinationCard;
