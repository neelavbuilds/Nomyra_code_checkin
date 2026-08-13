import Seo from "@/components/Seo";
import CTAButton from "@/components/CTAButton";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" noindex />
      <section className="grid min-h-[80vh] place-items-center bg-night px-6 text-center" data-testid="not-found">
        <div>
          <p className="overline mb-6">404</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl leading-tight">This trail doesn't exist.</h1>
          <p className="mx-auto mt-6 max-w-md text-base text-ink-soft">
            The page you were looking for has moved or never existed. Let's get you back to the mountains.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <CTAButton to="/" data-testid="notfound-home-btn">Back home</CTAButton>
            <CTAButton to="/packages" variant="outline" data-testid="notfound-packages-btn">See packages</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
