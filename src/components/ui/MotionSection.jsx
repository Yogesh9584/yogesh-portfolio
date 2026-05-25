import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp } from "../../utils/animations";

/**
 * Reliable scroll reveal — fixes whileInView not firing when remounting in viewport.
 */
export default function MotionSection({
  children,
  className = "",
  as: Component = motion.div,
  delay = 0,
  amount = 0.12,
}) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: false,
    amount,
    margin: "0px 0px -10% 0px",
  });

  const MotionComp = Component;

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <MotionComp
      ref={ref}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={delay}
    >
      {children}
    </MotionComp>
  );
}
