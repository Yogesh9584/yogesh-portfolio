import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-surface" />
      <div className="absolute inset-0 bg-mesh-gradient opacity-80" />

      <motion.div
        className="absolute -left-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-accent-indigo/20 blur-[100px]"
        animate={{ x: [0, 80, 0], y: [0, 40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 bottom-1/4 h-[24rem] w-[24rem] rounded-full bg-accent-violet/15 blur-[100px]"
        animate={{ x: [0, -60, 0], y: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-cyan/10 blur-[80px]"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />
    </div>
  );
}
