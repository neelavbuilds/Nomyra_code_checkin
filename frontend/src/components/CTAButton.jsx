import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-sm font-sans text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none";

const sizes = {
  sm: "px-5 py-2.5",
  md: "px-7 py-3.5",
  lg: "px-9 py-4",
};

const variants = {
  solid: "bg-beige text-night hover:bg-ink",
  terra: "bg-terra text-night hover:bg-beige",
  outline: "border border-ink/25 text-ink hover:border-beige hover:text-beige backdrop-blur-md bg-white/[0.04]",
  ghost: "text-ink-soft hover:text-beige",
};

/** Reusable CTA. Renders as Link, anchor or button depending on props. */
export const CTAButton = ({
  children,
  to,
  href,
  onClick,
  variant = "solid",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}) => {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button type="button" onClick={onClick} className={cls} {...rest}>{inner}</button>;
};

export default CTAButton;
