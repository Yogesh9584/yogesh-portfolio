import { useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedBackground from "../components/effects/AnimatedBackground";
import Particles from "../components/effects/Particles";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ScrollToTop from "../components/layout/ScrollToTop";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Experience from "../components/sections/Experience";
import Projects from "../components/sections/Projects";
import DemoProjects from "../components/sections/DemoProjects";
import Services from "../components/sections/Services";
import Contact from "../components/sections/Contact";

function PortfolioContent() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <AnimatedBackground />
      <Particles />

      <motion.div
        className="relative min-h-screen font-body text-white antialiased"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-surface-elevated focus:px-4 focus:py-3 focus:text-white focus:outline focus:outline-2 focus:outline-accent-indigo"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main-content">
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <DemoProjects />
          <Services />
          <Contact />
        </main>

        <Footer />
        <ScrollToTop />
      </motion.div>
    </>
  );
}

/**
 * Keyed remount on each navigation to home ensures clean state after demo routes.
 */
export default function PortfolioPage() {
  const location = useLocation();

  return <PortfolioContent key={`portfolio-${location.key}`} />;
}
