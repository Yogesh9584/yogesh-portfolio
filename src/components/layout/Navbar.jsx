import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../../data/navigation";
import { profile } from "../../data/profile";
import { useActiveSection } from "../../hooks/useActiveSection";
import Button from "../ui/Button";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <nav
        className="mx-auto max-w-7xl glass rounded-2xl border border-white/10 shadow-card backdrop-blur-xl"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <ScrollLink
            to="hero"
            smooth
            duration={500}
            className="cursor-pointer font-display text-xl font-bold gradient-text"
          >
            {profile.brand}
          </ScrollLink>

          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <ScrollLink
                  to={link.id}
                  smooth
                  spy
                  offset={-100}
                  duration={500}
                  onClick={() => setOpen(false)}
                  className={`relative cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    active === link.id
                      ? "text-white"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="portfolio-nav-indicator"
                      className="absolute inset-0 -z-10 rounded-lg bg-accent-indigo/20 border border-accent-indigo/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </ScrollLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button
              variant="primary"
              className="!py-2.5 !px-5 text-sm"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Hire Me
            </Button>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 text-white rounded-lg hover:bg-white/5"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
            >
              <ul className="flex flex-col gap-1 p-4">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <ScrollLink
                      to={link.id}
                      smooth
                      offset={-80}
                      duration={500}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-4 py-3 text-sm font-medium ${
                        active === link.id ? "bg-accent-indigo/20 text-white" : "text-muted"
                      }`}
                    >
                      {link.label}
                    </ScrollLink>
                  </li>
                ))}
                <li className="pt-2">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      setOpen(false);
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    Hire Me
                  </Button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
