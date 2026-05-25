import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { navLinks } from "../data/navigation";
import { isPortfolioRoute } from "../routes/paths";

export function useActiveSection() {
  const { pathname } = useLocation();
  const [active, setActive] = useState(navLinks[0].id);
  const enabled = isPortfolioRoute(pathname);

  useEffect(() => {
    if (!enabled) return undefined;

    let observer;

    const setup = () => {
      const sections = navLinks
        .map((link) => document.getElementById(link.id))
        .filter(Boolean);

      if (sections.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible[0]?.target?.id) {
            setActive(visible[0].target.id);
          }
        },
        { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.25, 0.5] }
      );

      sections.forEach((section) => observer.observe(section));
    };

    const raf = requestAnimationFrame(setup);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [enabled, pathname]);

  return active;
}
