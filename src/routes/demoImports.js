/**
 * Centralized demo imports — avoids Vite dynamic fetch failures on lazy chunks.
 */
import SaaSDashboardDemo from "../demos/saas-dashboard/SaaSDashboardDemo";
import AILandingDemo from "../demos/ai-landing/AILandingDemo";
import EcommerceDemo from "../demos/ecommerce/EcommerceDemo";
import AdminKitDemo from "../demos/admin-kit/AdminKitDemo";

export const demoPages = {
  saas: SaaSDashboardDemo,
  ai: AILandingDemo,
  ecommerce: EcommerceDemo,
  admin: AdminKitDemo,
};
