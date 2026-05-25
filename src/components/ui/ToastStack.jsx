import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

const styles = {
  success: {
    icon: CheckCircle2,
    bar: "bg-emerald-500",
    ring: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  error: {
    icon: AlertCircle,
    bar: "bg-rose-500",
    ring: "border-rose-500/30",
    iconColor: "text-rose-400",
  },
};

export default function ToastStack({ toasts, onDismiss }) {
  if (!toasts.length) return null;

  return (
    <div
      className="fixed bottom-6 right-4 left-4 z-[100] flex flex-col gap-3 sm:left-auto sm:max-w-sm"
      aria-live="polite"
      aria-relevant="additions"
    >
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => {
          const config = styles[toast.type] ?? styles.error;
          const Icon = config.icon;

          return (
            <motion.div
              key={toast.id}
              layout
              role={toast.type === "error" ? "alert" : "status"}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={`glass flex items-start gap-3 rounded-xl border p-4 shadow-card-hover ${config.ring}`}
            >
              <span
                className={`mt-0.5 h-full w-1 shrink-0 rounded-full ${config.bar}`}
                aria-hidden
              />
              <Icon
                size={20}
                className={`shrink-0 ${config.iconColor}`}
                aria-hidden
              />
              <p className="flex-1 text-sm text-white leading-snug">
                {toast.message}
              </p>
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="shrink-0 rounded-lg p-1 text-muted transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo"
                aria-label="Dismiss notification"
              >
                <X size={16} aria-hidden />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
