import { motion } from "framer-motion";

export default function DashboardPlaceholderPage({ meta }) {
  return (
    <motion.div
      className="min-h-[min(50vh,400px)] flex items-start"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
        {meta.title}
      </h1>
    </motion.div>
  );
}
