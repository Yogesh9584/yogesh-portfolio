import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function KpiCards({ items }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((kpi, i) => (
        <motion.div
          key={kpi.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ y: -4 }}
          className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-5 shadow-lg hover:border-indigo-500/30 transition-colors"
        >
          <p className="text-xs text-white/50 font-medium">{kpi.label}</p>
          <p className="mt-2 font-display text-2xl font-bold text-white">
            {kpi.value}
          </p>
          <p
            className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${
              kpi.trend === "up" ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {kpi.trend === "up" ? (
              <TrendingUp size={14} />
            ) : (
              <TrendingDown size={14} />
            )}
            {kpi.change} vs last period
          </p>
        </motion.div>
      ))}
    </div>
  );
}
