import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon } from "./BrandIcons";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  mail: Mail,
};

export default function SocialLinks({ links, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map((item, index) => {
        const Icon = iconMap[item.icon];
        if (!Icon) return null;

        return (
          <motion.a
            key={item.id}
            href={item.href}
            target={item.icon !== "mail" ? "_blank" : undefined}
            rel={item.icon !== "mail" ? "noopener noreferrer" : undefined}
            aria-label={item.label}
            className="flex h-11 w-11 items-center justify-center rounded-xl glass border border-white/10 text-muted transition-colors hover:border-accent-indigo/50 hover:text-accent-cyan hover:shadow-glow"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Icon size={20} />
          </motion.a>
        );
      })}
    </div>
  );
}
