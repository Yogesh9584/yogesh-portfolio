import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { DemoThemeProvider } from "./DemoThemeContext";

export default function DemoShell({
  title,
  subtitle,
  children,
  theme = "dark",
  className = "",
}) {
  return (
    <DemoThemeProvider defaultTheme={theme}>
      <div
        className={`min-h-screen font-body antialiased transition-colors duration-300 ${className}`}
      >
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="sticky top-0 z-50 border-b border-white/10 bg-[#0a0b0f]/80 backdrop-blur-xl"
        >
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-indigo-500/40 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            >
              <ArrowLeft size={16} aria-hidden />
              Back to Portfolio
            </Link>
            <div className="hidden sm:block text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-indigo-400">
                Live Demo
              </p>
              <p className="font-display text-sm font-semibold text-white">
                {title}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-3 py-1.5 text-xs text-indigo-300">
              <ExternalLink size={12} aria-hidden />
              Showcase Build
            </span>
          </div>
          {subtitle && (
            <p className="pb-3 text-center text-xs text-white/50 sm:hidden">
              {subtitle}
            </p>
          )}
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {children}
        </motion.main>
      </div>
    </DemoThemeProvider>
  );
}
