import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./BrandIcons";
import GlassCard from "./GlassCard";
import Tag from "./Tag";
import Button from "./Button";

function ProjectThumbnail({ image, title }) {
  if (image) {
    return (
      <img
        src={image}
        alt={`${title} preview`}
        className="h-52 w-full object-cover"
        loading="lazy"
      />
    );
  }

  return (
    <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-accent-indigo/40 via-accent-violet/30 to-accent-cyan/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="absolute bottom-4 left-4 font-mono text-xs text-white/50">
        {title}
      </div>
    </div>
  );
}

export default function ProjectCard({
  title,
  description,
  image,
  tech = [],
  liveUrl,
  githubUrl,
  demoLabel = "Live Demo",
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <GlassCard className="group overflow-hidden p-0">
      <motion.div
        className="overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.35 }}
      >
        <ProjectThumbnail image={image} title={title} />
      </motion.div>

      <div className="p-6 md:p-7">
        <h3 className="font-display text-xl md:text-2xl font-bold text-white group-hover:text-accent-cyan transition-colors">
          {title}
        </h3>

        {/* Description */}
        <div className="mt-3">
          <p
            className={`text-sm md:text-base text-muted leading-relaxed transition-all duration-300 ${
              expanded ? "" : "line-clamp-2"
            }`}
          >
            {description}
          </p>

          {description?.length > 120 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-sm text-accent-cyan hover:underline"
            >
              {expanded ? "Show Less" : "Show More"}
            </button>
          )}
        </div>

        <div className="mt-6 w-full">
          <Button
            variant="primary"
            href={liveUrl}
            icon={ExternalLink}
            className="!py-2.5 !px-5 text-sm block w-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            {demoLabel}
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}