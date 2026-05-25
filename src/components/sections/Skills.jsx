import { motion } from "framer-motion";
import {
  Code2,
  Palette,
  Layers,
  FileCode,
  Braces,
  Sparkles,
} from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SectionWrapper from "../ui/SectionWrapper";
import GlassCard from "../ui/GlassCard";
import { skillCategories } from "../../data/skills";
import { staggerContainer, fadeUp } from "../../utils/animations";

const categoryIcons = {
  html: FileCode,
  css: Code2,
  javascript: Braces,
  palette: Palette,
  ai: Sparkles,
  layers: Layers,
};

function SkillBar({ name, level }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between gap-2 text-sm">
        <span className="text-white/90">{name}</span>
        <span className="font-mono text-xs text-muted shrink-0">{level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-accent-indigo to-accent-cyan"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills" containerClass="max-w-6xl mx-auto">
      <SectionTitle
        eyebrow="Expertise"
        title="Skills"
        subtitle="HTML, CSS, and JavaScript frameworks, UI/UX tooling, AI-assisted development, and production frontend practices."
      />

      <motion.div
        className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {skillCategories.map((category) => {
          const Icon = categoryIcons[category.icon] || Code2;

          return (
            <motion.div key={category.id} variants={fadeUp}>
              <GlassCard className="p-6 md:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-indigo/20 text-accent-cyan">
                    <Icon size={22} aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-bold text-white leading-snug">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={`${category.id}-${skill.name}`}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionWrapper>
  );
}
