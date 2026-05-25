import { motion } from "framer-motion";

const previews = {
  saas: () => (
    <div className="absolute inset-0 bg-[#0d0f14] p-3 flex gap-2">
      <div className="w-8 shrink-0 rounded-lg bg-indigo-500/20 border border-indigo-500/20" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="grid grid-cols-3 gap-1.5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 rounded-lg bg-white/5 border border-white/10" />
          ))}
        </div>
        <div className="h-16 rounded-lg bg-gradient-to-r from-indigo-500/30 to-cyan-500/20" />
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-2 rounded bg-white/5" />
          ))}
        </div>
      </div>
    </div>
  ),
  ai: () => (
    <div className="absolute inset-0 bg-[#050508] flex flex-col items-center justify-center p-4">
      <div className="h-2 w-16 rounded-full bg-violet-500/40 mb-3" />
      <div className="h-4 w-32 rounded bg-gradient-to-r from-violet-400/50 to-cyan-400/30 mb-4" />
      <div className="grid grid-cols-2 gap-1.5 w-full max-w-[140px]">
        <div className="col-span-2 h-10 rounded-lg bg-violet-500/15 border border-violet-500/20" />
        <div className="h-8 rounded-lg bg-white/5" />
        <div className="h-8 rounded-lg bg-white/5" />
      </div>
    </div>
  ),
  ecommerce: () => (
    <div className="absolute inset-0 bg-[#fafafa] p-3">
      <div className="h-10 rounded-lg bg-zinc-900 mb-2" />
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="aspect-[3/4] rounded-md bg-gradient-to-br from-zinc-200 to-zinc-300" />
        ))}
      </div>
    </div>
  ),
  admin: () => (
    <div className="absolute inset-0 bg-[#0a0b0f] p-3 flex gap-2">
      <div className="w-6 space-y-1">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-2 rounded bg-indigo-500/30" />
        ))}
      </div>
      <div className="flex-1 space-y-2">
        <div className="flex gap-1">
          {["primary", "sec", "ghost"].map((k) => (
            <div key={k} className="h-4 flex-1 rounded bg-indigo-500/25" />
          ))}
        </div>
        <div className="h-12 rounded-lg border border-white/10 bg-white/5" />
        <div className="h-8 rounded-lg bg-indigo-500/10" />
      </div>
    </div>
  ),
};

export default function DemoPreview({ variant }) {
  const Preview = previews[variant];
  if (!Preview) return null;

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-t-2xl border-b border-white/10">
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        <Preview />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}
