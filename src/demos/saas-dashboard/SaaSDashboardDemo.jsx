import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import DemoShell from "../shared/DemoShell";
import DashboardSidebar from "./components/DashboardSidebar";
import DashboardTopbar from "./components/DashboardTopbar";
import DashboardOverview from "./components/DashboardOverview";
import DashboardPlaceholderPage from "./components/DashboardPlaceholderPage";
import {
  navItems,
  pageMeta,
  kpis,
  revenueData,
  activityData,
  transactions,
  filterOptions,
} from "./data/dashboardData";

export default function SaaSDashboardDemo() {
  const [activeNav, setActiveNav] = useState("overview");
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const [filter, setFilter] = useState(filterOptions[1]);

  const meta = pageMeta[activeNav] ?? pageMeta.overview;

  const renderPage = () => {
    if (activeNav === "overview") {
      return (
        <DashboardOverview
          meta={meta}
          filter={filter}
          kpis={kpis}
          revenueData={revenueData}
          activityData={activityData}
          transactions={transactions}
        />
      );
    }

    return <DashboardPlaceholderPage meta={meta} />;
  };

  return (
    <DemoShell
      title="SaaS Analytics Dashboard"
      subtitle="PulseMetrics — premium admin UI"
      className="bg-[#0a0b0f] text-white"
    >
      <div className="flex min-h-[calc(100vh-57px)]">
        <DashboardSidebar
          items={navItems}
          active={activeNav}
          onSelect={setActiveNav}
          mobileOpen={mobileSidebar}
          onClose={() => setMobileSidebar(false)}
        />
        <div className="flex flex-1 flex-col min-w-0">
          <DashboardTopbar
            onMenuClick={() => setMobileSidebar(true)}
            filter={filter}
            onFilterChange={setFilter}
            filters={filterOptions}
            showFilters={activeNav === "overview" || activeNav === "analytics"}
          />
          <div className="flex-1 overflow-auto p-4 lg:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNav}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
