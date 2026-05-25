import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-accent-indigo to-accent-violet text-white shadow-glow hover:shadow-card-hover",
  secondary:
    "glass border border-white/10 text-white hover:border-accent-indigo/40 hover:bg-white/5",
  ghost: "text-muted hover:text-white hover:bg-white/5",
};

export default function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  icon: Icon,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo ${variants[variant]} ${className}`;

  const content = (
    <>
      {Icon && (
        <span className="inline-flex shrink-0" aria-hidden>
          <Icon size={18} />
        </span>
      )}
      {children}
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/");

    if (isInternal) {
      return (
        <Link to={href} className={classes} {...props}>
          <motion.span
            className="inline-flex w-full items-center justify-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            {content}
          </motion.span>
        </Link>
      );
    }

    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {content}
    </motion.button>
  );
}
