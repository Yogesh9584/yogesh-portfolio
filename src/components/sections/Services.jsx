import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import SectionWrapper from "../ui/SectionWrapper";
import GlassCard from "../ui/GlassCard";
import { services } from "../../data/services";
import { staggerContainer, fadeUp } from "../../utils/animations";

export default function Services() {
  return (
    <SectionWrapper id="services" containerClass="max-w-6xl mx-auto">
      <SectionTitle
        eyebrow="What I Offer"
        title="Services"
        subtitle="End-to-end frontend delivery for startups, agencies, and product teams."
      />

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div key={service.id} variants={fadeUp} custom={index * 0.05}>
              <GlassCard className="p-7 md:p-8 h-full group">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-indigo/30 to-accent-violet/20 text-accent-cyan mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={24} aria-hidden />
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {service.description}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
