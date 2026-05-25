import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Play, Code2 } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import SectionWrapper from "../ui/SectionWrapper";
import GlassCard from "../ui/GlassCard";
import Tag from "../ui/Tag";
import Button from "../ui/Button";
import DemoPreview from "../demos/DemoPreview";
import { demoProjects } from "../../data/demoProjects";
import { staggerContainer, fadeUp } from "../../utils/animations";

export default function DemoProjects() {
  return (
    <SectionWrapper id="demos" containerClass="max-w-7xl mx-auto">
      <SectionTitle
        eyebrow="Playground"
        title="Demo Projects"
        subtitle="Production-ready UI showcases — open live demos built with React, Tailwind, and motion."
      />

      <motion.div
        className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {demoProjects.map((project, index) => (
          <motion.div key={project.id} variants={fadeUp} custom={index * 0.05}>
            <GlassCard className="overflow-hidden p-0 h-full flex flex-col group">
              <Link
                to={project.demoUrl}
                className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-indigo rounded-t-2xl"
                aria-label={`View demo: ${project.title}`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    className="h-44 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <DemoPreview variant={project.preview} />
                )}
              </Link>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-lg font-bold text-white group-hover:text-accent-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <Button
                    variant="primary"
                    href={project.demoUrl}
                    icon={Play}
                    className="w-full !py-2.5 text-sm"
                  >
                    Live Demo
                  </Button>
                  <Button
                    variant="secondary"
                    href={project.sourceUrl}
                    icon={Code2}
                    className="w-full !py-2.5 text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
