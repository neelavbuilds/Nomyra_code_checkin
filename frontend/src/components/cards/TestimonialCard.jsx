import { Quote, User } from "lucide-react";

export const TestimonialCard = ({ testimonial, index = 0 }) => (
  <figure
    data-testid={`testimonial-card-${index}`}
    className="flex h-full flex-col border border-white/10 bg-night-2 p-8 transition-colors duration-500 hover:border-beige/30"
  >
    <Quote className="h-6 w-6 text-terra" strokeWidth={1.4} aria-hidden="true" />
    <blockquote className="mt-6 flex-1 font-display text-xl leading-relaxed text-ink/90">
      {testimonial.quote}
    </blockquote>
    <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
      {testimonial.photo ? (
        <img src={testimonial.photo} alt={testimonial.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
      ) : (
        <span className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-night-3 text-stone" aria-hidden="true">
          <User className="h-4 w-4" strokeWidth={1.5} />
        </span>
      )}
      <span>
        <span className="block text-sm text-ink">{testimonial.name}</span>
        <span className="block text-xs uppercase tracking-[0.14em] text-stone">{testimonial.trip}</span>
      </span>
    </figcaption>
  </figure>
);

export default TestimonialCard;
