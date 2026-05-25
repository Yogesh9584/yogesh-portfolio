import { motion } from "framer-motion";

export function Skeleton({ className = "" }) {
  return (
    <motion.div
      className={`animate-pulse rounded-lg bg-white/10 ${className}`}
      aria-hidden
    />
  );
}

export function SkeletonCard({ lines = 3 }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 space-y-3">
      <Skeleton className="h-4 w-1/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className={`h-3 ${i === lines - 1 ? "w-2/3" : "w-full"}`} />
      ))}
    </div>
  );
}

export function SkeletonChart({ className = "h-64", style }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${className}`}
      style={style}
    >
      <Skeleton className="h-4 w-32 mb-6" />
      <div className="flex items-end gap-2 h-40">
        {[40, 65, 45, 80, 55, 70, 50, 90, 60, 75].map((h, i) => (
          <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

export function SkeletonTable({ rows = 5 }) {
  return (
    <div className="space-y-3">
      <Skeleton className="h-10 w-full" />
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}

export function SkeletonProductGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="space-y-3">
          <Skeleton className="aspect-[4/5] w-full rounded-xl" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
