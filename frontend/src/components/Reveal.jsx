import { motion } from "framer-motion";

/** Subtle fade-up scroll reveal. */
export const Reveal = ({ children, delay = 0, y = 24, className = "", as = "div" }) => {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
};

export const Overline = ({ children, className = "" }) => (
  <p className={`overline ${className}`}>{children}</p>
);

export const SectionHead = ({ overline, title, subtitle, align = "left", className = "" }) => (
  <div className={`${align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} ${className}`}>
    {overline && <Overline className="mb-5">{overline}</Overline>}
    <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-ink">{title}</h2>
    {subtitle && <p className="mt-6 text-base md:text-lg text-ink-soft max-w-2xl leading-relaxed">{subtitle}</p>}
  </div>
);
