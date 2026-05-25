import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SectionWrapper from "../ui/SectionWrapper";
import GlassCard from "../ui/GlassCard";
import { experiences } from "../../data/experience";
import { fadeUp, staggerContainer } from "../../utils/animations";

function ExperienceProjects({ projects }) {
  if (!projects?.length) return null;

  return (
    <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
      <p className="text-xs font-mono uppercase tracking-wider text-accent-cyan">
        Key Projects
      </p>
      {projects.map((project) => (
        <div
          key={project.name}
          className="rounded-xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
        >
          <h4 className="font-display text-base font-semibold text-white flex items-center gap-2">
            <Briefcase size={16} className="text-accent-indigo shrink-0" aria-hidden />
            {project.name}
          </h4>
          {project.highlights?.length > 0 && (
            <ul className="mt-3 space-y-2">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-muted leading-relaxed"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-violet"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
  return (
    <SectionWrapper id="experience" containerClass="max-w-4xl mx-auto">
      <SectionTitle
        eyebrow="Career"
        title="Work Experience"
        subtitle="8+ years crafting responsive interfaces, design systems, and product-ready frontends across agencies and product teams."
      />

      <div className="relative">
        <div
          className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-accent-indigo via-accent-violet/50 to-transparent"
          aria-hidden
        />

        <motion.div
          className="space-y-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {experiences.map((job, index) => (
            <motion.article
              key={job.id}
              className="relative pl-12 md:pl-16"
              variants={fadeUp}
              custom={index * 0.08}
              aria-labelledby={`exp-${job.id}-title`}
            >
              <span
                className="absolute left-2.5 md:left-4 top-8 h-4 w-4 rounded-full border-2 border-accent-indigo bg-surface shadow-glow"
                aria-hidden
              />

              <GlassCard className="p-7 md:p-9">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3
                      id={`exp-${job.id}-title`}
                      className="font-display text-xl md:text-2xl font-bold text-white"
                    >
                      {job.role}
                    </h3>
                    <p className="mt-1 text-accent-cyan font-medium">
                      {job.company}
                    </p>
                  </div>
                  <time
                    dateTime={job.period}
                    className="shrink-0 font-mono text-xs text-muted sm:text-right sm:pt-1"
                  >
                    {job.period}
                  </time>
                </div>

                {job.achievements?.length > 0 && (
                  <ul className="mt-6 space-y-2.5">
                    {job.achievements.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 text-sm text-muted leading-relaxed"
                      >
                        <span
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-indigo"
                          aria-hidden
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <ExperienceProjects projects={job.projects} />
              </GlassCard>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
