export const ROUTES = {
  home: "/",
  demos: {
    saas: "/demos/saas-analytics",
    ai: "/demos/ai-landing",
    ecommerce: "/demos/ecommerce",
    admin: "/demos/admin-kit",
  },
};

export const DEMO_ROUTE_LIST = Object.values(ROUTES.demos);

export function isPortfolioRoute(pathname) {
  return pathname === ROUTES.home;
}
