import { Reveal, Overline } from "@/components/Reveal";
import Img from "@/components/Img";

/** Standard inner-page hero with image, overline and title. */
export const PageHero = ({ overline, title, subtitle, image, alt, testid = "page-hero" }) => (
  <section data-testid={testid} className="relative flex min-h-[62vh] items-end overflow-hidden md:min-h-[70vh]">
    {image && (
      <div className="absolute inset-0">
        <Img src={image} alt={alt || title} priority />
      </div>
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-night via-night/55 to-night/30" />
    <div className="absolute inset-0 grain" />
    <div className="shell relative z-10 pb-16 pt-40 md:pb-24">
      <Reveal>
        {overline && <Overline className="mb-5 text-beige/80">{overline}</Overline>}
        <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl leading-[1.04]">{title}</h1>
        {subtitle && <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-ink-soft">{subtitle}</p>}
      </Reveal>
    </div>
  </section>
);

export default PageHero;
