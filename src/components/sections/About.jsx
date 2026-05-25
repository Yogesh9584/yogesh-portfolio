import { motion } from "framer-motion";
import { MapPin, CheckCircle2 } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SectionWrapper from "../ui/SectionWrapper";
import GlassCard from "../ui/GlassCard";
import { profile } from "../../data/profile";
import { staggerContainer, fadeUp } from "../../utils/animations";

export default function About() {
  return (
    <SectionWrapper id="about" containerClass="max-w-6xl mx-auto">
      <SectionTitle
        eyebrow="About"
        title="About Me"
        subtitle="Crafting digital products with precision, motion, and scalable UI systems."
      />

      <div className="grid lg:grid-cols-5 gap-8 items-start">
        <GlassCard className="lg:col-span-3 p-8 md:p-10">
          <p className="text-muted text-base md:text-lg leading-8">
            {profile.about}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm text-accent-cyan">
            <MapPin size={18} aria-hidden />
            {profile.location}
          </p>
        </GlassCard>

        <motion.div
          className="lg:col-span-2 space-y-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <GlassCard className="p-6 text-center">
            <p className="font-display text-4xl font-bold gradient-text">
              {profile.yearsExperience}
            </p>
            <p className="mt-2 text-sm text-muted">Years of Experience</p>
          </GlassCard>

          {profile.highlights.map((item, i) => (
            <motion.div key={item} variants={fadeUp} custom={i * 0.05}>
              <GlassCard className="p-4 flex items-start gap-3" hover={false}>
                <CheckCircle2
                  className="shrink-0 text-accent-indigo mt-0.5"
                  size={20}
                  aria-hidden
                />
                <p className="text-sm text-muted leading-relaxed">{item}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
