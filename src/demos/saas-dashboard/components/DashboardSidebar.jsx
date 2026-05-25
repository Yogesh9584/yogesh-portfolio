import {
  LayoutDashboard,
  BarChart3,
  Users,
  CreditCard,
  Settings,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

const icons = {
  layout: LayoutDashboard,
  chart: BarChart3,
  users: Users,
  credit: CreditCard,
  settings: Settings,
};

export default function DashboardSidebar({ items, active, onSelect, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar"
        />
      )}
      <aside
        className={`fixed lg:sticky top-0 z-50 h-screen w-64 shrink-0 border-r border-white/10 bg-[#0d0f14] transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-white/10 px-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400">
            <Zap size={18} />
          </span>
          <div>
            <p className="font-display font-bold text-white">PulseMetrics</p>
            <p className="text-[10px] text-white/40 font-mono">SaaS Analytics</p>
          </div>
        </div>
        <nav className="p-3 space-y-1" aria-label="Dashboard">
          {items.map((item) => {
            const Icon = icons[item.icon];
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelect(item.id);
                  onClose?.();
                }}
                className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  isActive
                    ? "text-white"
                    : "text-white/50 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="dash-nav"
                    className="absolute inset-0 rounded-xl bg-indigo-500/15 border border-indigo-500/25"
                  />
                )}
                <Icon size={18} className="relative z-10" />
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
