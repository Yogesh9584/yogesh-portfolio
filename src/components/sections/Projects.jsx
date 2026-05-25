import { motion } from "framer-motion";
import SectionTitle from "../ui/SectionTitle";
import SectionWrapper from "../ui/SectionWrapper";
import ProjectCard from "../ui/ProjectCard";
import { projects } from "../../data/projects";
import { staggerContainer, fadeUp } from "../../utils/animations";

export default function Projects() {
  return (
    <SectionWrapper id="projects" containerClass="max-w-7xl mx-auto">
      <SectionTitle
        eyebrow="Work"
        title="Projects"
        subtitle="Selected builds showcasing premium UI, React architecture, and polished interactions."
      />

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => (
          <motion.div key={project.id} variants={fadeUp} custom={index * 0.05}>
            <ProjectCard
              title={project.title}
              description={project.description}
              image={project.image}
              tech={project.tech}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
            />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
