/** Lazy, responsive image with a dark placeholder and optional hover zoom. */
export const Img = ({ src, alt, className = "", zoom = false, priority = false, sizes }) => (
  <img
    src={src}
    alt={alt}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    fetchpriority={priority ? "high" : undefined}
    sizes={sizes}
    className={`h-full w-full object-cover bg-night-2 ${
      zoom ? "transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]" : ""
    } ${className}`}
  />
);

export default Img;
