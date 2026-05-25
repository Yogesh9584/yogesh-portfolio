import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { isPortfolioRoute } from "../../routes/paths";

export default function ScrollRestoration() {
  const { pathname, hash, key } = useLocation();

  useLayoutEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, key, hash]);

  useEffect(() => {
    document.documentElement.classList.remove("demo-light");
    document.body.style.overflow = "";
    document.body.style.removeProperty("overflow");
  }, [pathname]);

  useEffect(() => {
    if (!isPortfolioRoute(pathname) || !hash) return undefined;

    const id = hash.replace("#", "");
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
