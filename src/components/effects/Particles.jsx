import { motion } from "framer-motion";

/** Fixed positions — avoids layout shift on route remount */
const PARTICLES = [
  { id: 0, left: "12%", top: "18%", size: 3, duration: 14, delay: 0 },
  { id: 1, left: "78%", top: "22%", size: 2, duration: 18, delay: 1 },
  { id: 2, left: "45%", top: "8%", size: 4, duration: 16, delay: 0.5 },
  { id: 3, left: "88%", top: "55%", size: 3, duration: 20, delay: 2 },
  { id: 4, left: "6%", top: "62%", size: 2, duration: 15, delay: 1.5 },
  { id: 5, left: "32%", top: "75%", size: 3, duration: 17, delay: 0.8 },
  { id: 6, left: "65%", top: "82%", size: 2, duration: 19, delay: 2.5 },
  { id: 7, left: "92%", top: "38%", size: 4, duration: 13, delay: 0.3 },
  { id: 8, left: "22%", top: "42%", size: 2, duration: 21, delay: 3 },
  { id: 9, left: "55%", top: "48%", size: 3, duration: 16, delay: 1.2 },
  { id: 10, left: "38%", top: "28%", size: 2, duration: 14, delay: 2.2 },
  { id: 11, left: "72%", top: "12%", size: 3, duration: 18, delay: 0.6 },
];

export default function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden" aria-hidden>
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-accent-indigo/40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
