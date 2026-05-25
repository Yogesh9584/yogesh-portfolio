import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { isPortfolioRoute } from "../../routes/paths";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);

    if (!isPortfolioRoute(pathname)) return undefined;

    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isPortfolioRoute(pathname)) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollUp}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full glass border border-white/10 text-white shadow-glow hover:border-accent-indigo/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
