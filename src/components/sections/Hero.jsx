import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail, Briefcase, Sparkles } from "lucide-react";
import { profile } from "../../data/profile";
import Button from "../ui/Button";
import SocialLinks from "../ui/SocialLinks";
import { fadeUp, staggerContainer } from "../../utils/animations";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-5 sm:px-6 pt-28 pb-20 scroll-mt-0"
    >
      <motion.div
        className="max-w-5xl mx-auto text-center"
        variants={staggerContainer}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.div variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 rounded-full glass border border-white/10 px-4 py-2 text-sm text-muted mb-8">
            <Sparkles size={16} className="text-accent-amber" aria-hidden />
            {profile.greeting}
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={0.1}
          className="hero-title font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight"
          style={{ lineHeight: 1.5 }}
        >
          <span className="block gradient-text py-0.5">{profile.name}</span>
        </motion.h1>

        <motion.h2
          variants={fadeUp}
          custom={0.2}
          className="mt-4 font-display text-xl sm:text-2xl md:text-3xl font-medium text-white/90"
        >
          {profile.role}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          custom={0.3}
          className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-muted leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={0.4}
          className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
        >
          <Button
            variant="primary"
            icon={Briefcase}
            onClick={() => scrollTo("contact")}
          >
            Hire Me
          </Button>
          <Button
            variant="secondary"
            icon={Download}
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            aria-label="Download resume PDF"
          >
            Download Resume
          </Button>
          <Button
            variant="secondary"
            icon={Mail}
            onClick={() => scrollTo("contact")}
          >
            Contact
          </Button>
        </motion.div>

        <motion.div variants={fadeUp} custom={0.5} className="mt-12">
          <SocialLinks links={profile.social} className="justify-center" />
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={0.6}
          className="mt-16 flex justify-center"
          aria-hidden
        >
          <motion.div
            className="h-10 w-6 rounded-full border-2 border-white/20 flex justify-center pt-2"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              className="h-2 w-1 rounded-full bg-accent-indigo"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute left-1/2 top-1/2 -z-10 h-[min(80vw,520px)] w-[min(80vw,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-indigo/10 bg-gradient-radial from-accent-indigo/10 to-transparent animate-pulse-soft" />
    </section>
  );
}
