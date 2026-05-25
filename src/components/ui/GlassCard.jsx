import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  ...props
}) {
  return (
    <motion.div
      className={`glass rounded-2xl md:rounded-3xl shadow-card ${hover ? "transition-shadow duration-300 hover:shadow-card-hover" : ""} ${className}`}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.25 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
