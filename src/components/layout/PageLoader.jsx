import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useInitialLoad } from "../../context/InitialLoadContext";
import { isPortfolioRoute } from "../../routes/paths";
import { profile } from "../../data/profile";

export default function PageLoader() {
  const { pathname } = useLocation();
  const { isInitialLoad, markInitialLoadDone } = useInitialLoad();
  const showOnPortfolio = isPortfolioRoute(pathname);

  useEffect(() => {
    if (!isInitialLoad) return undefined;

    if (!showOnPortfolio) {
      markInitialLoadDone();
      return undefined;
    }

    const timer = setTimeout(markInitialLoadDone, 900);
    return () => clearTimeout(timer);
  }, [isInitialLoad, showOnPortfolio, markInitialLoadDone]);

  const visible = isInitialLoad && showOnPortfolio;

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="status"
          aria-label="Loading portfolio"
        >
          <motion.div
            className="h-14 w-14 rounded-2xl border-2 border-accent-indigo/30 border-t-accent-indigo"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="mt-6 font-display text-lg gradient-text"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {profile.brand}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
