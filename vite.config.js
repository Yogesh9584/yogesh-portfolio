import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/demos/saas-dashboard/")) return "demo-saas";
          if (id.includes("/demos/admin-kit/")) return "demo-admin";
          if (id.includes("/demos/ecommerce/")) return "demo-ecommerce";
          if (id.includes("/demos/ai-landing/")) return "demo-ai";
        },
      },
    },
  },
});
