import { Suspense } from "react";
import { Routes, Route, Link } from "react-router-dom";
import ErrorBoundary from "../components/layout/ErrorBoundary";
import PageLoader from "../components/layout/PageLoader";
import PortfolioPage from "../pages/PortfolioPage";
import { ROUTES } from "./paths";
import { demoPages } from "./demoImports";

const SaaSDashboardDemo = demoPages.saas;
const AILandingDemo = demoPages.ai;
const EcommerceDemo = demoPages.ecommerce;
const AdminKitDemo = demoPages.admin;

function DemoFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-[#0a0b0f]"
      role="status"
      aria-label="Loading demo"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-indigo-500/30 border-t-indigo-500" />
    </div>
  );
}

function DemoRoute({ children }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<DemoFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default function AppRoutes() {
  return (
    <ErrorBoundary>
      <PageLoader />
      <Routes>
        <Route path={ROUTES.home} element={<PortfolioPage />} />
        <Route
          path={ROUTES.demos.saas}
          element={
            <DemoRoute>
              <SaaSDashboardDemo />
            </DemoRoute>
          }
        />
        <Route
          path={ROUTES.demos.ai}
          element={
            <DemoRoute>
              <AILandingDemo />
            </DemoRoute>
          }
        />
        <Route
          path={ROUTES.demos.ecommerce}
          element={
            <DemoRoute>
              <EcommerceDemo />
            </DemoRoute>
          }
        />
        <Route
          path={ROUTES.demos.admin}
          element={
            <DemoRoute>
              <AdminKitDemo />
            </DemoRoute>
          }
        />
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center bg-surface text-white">
              <div className="text-center px-6">
                <h1 className="font-display text-3xl font-bold">Page not found</h1>
                <Link
                  to={ROUTES.home}
                  className="mt-6 inline-block rounded-full bg-accent-indigo px-6 py-3 text-sm font-semibold"
                >
                  Back to portfolio
                </Link>
              </div>
            </div>
          }
        />
      </Routes>
    </ErrorBoundary>
  );
}
