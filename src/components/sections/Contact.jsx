import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { LinkedInIcon } from "../ui/BrandIcons";
import ContactForm from "../contact/ContactForm";
import SectionTitle from "../ui/SectionTitle";
import SectionWrapper from "../ui/SectionWrapper";
import GlassCard from "../ui/GlassCard";
import Button from "../ui/Button";
import { profile } from "../../data/profile";
import { fadeUp } from "../../utils/animations";

export default function Contact() {
  return (
    <SectionWrapper id="contact" containerClass="max-w-5xl mx-auto">
      <SectionTitle
        eyebrow="Get in Touch"
        title="Contact"
        subtitle="Open to freelance, full-time, and international product roles."
      />

      <div className="w-full md:w-1/2 mx-auto">
        <motion.div
          className=""
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <GlassCard className="p-8">
            <h3 className="font-display text-2xl font-bold gradient-text">
              Let&apos;s build something exceptional
            </h3>
            <p className="mt-4 text-muted text-sm leading-relaxed">
              Reach out for hiring inquiries, collaborations or project
              discussions..
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-muted hover:text-accent-cyan transition-colors"
                >
                  <Mail size={20} className="text-accent-indigo" />
                  {profile.email}
                </a>
              </li>
              {profile.social.map((link) => {
                const icons = { linkedin: LinkedInIcon };
                const Icon = icons[link.icon];
                if (!Icon) return null;

                return (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-muted hover:text-accent-cyan transition-colors"
                    >
                      <Icon size={20} className="text-accent-indigo" />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </GlassCard>

        </motion.div>

        {/* <GlassCard className="lg:col-span-3 p-8 md:p-10 relative">
          <ContactForm />
        </GlassCard> */}
      </div>
    </SectionWrapper>
  );
}
