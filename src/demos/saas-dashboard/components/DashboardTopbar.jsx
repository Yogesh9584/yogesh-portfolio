import { useState } from "react";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDemoTheme } from "../../shared/DemoThemeContext";
import { notifications } from "../data/dashboardData";

export default function DashboardTopbar({
  onMenuClick,
  filter,
  onFilterChange,
  filters,
  showFilters = true,
}) {
  const { theme, toggleTheme } = useDemoTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-white/10 bg-[#0d0f14]/90 backdrop-blur-xl px-4 lg:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-white/70 hover:bg-white/5 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
        />
        <input
          type="search"
          placeholder="Search transactions, customers..."
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-indigo-500/50"
          aria-label="Search dashboard"
        />
      </div>

      <div className="flex items-center gap-2">
        {showFilters && (
        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80"
          >
            {filter}
            <ChevronDown size={14} />
          </button>
          <AnimatePresence>
            {filterOpen && (
              <motion.ul
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-40 rounded-xl border border-white/10 bg-[#141820] py-1 shadow-xl"
              >
                {filters.map((f) => (
                  <li key={f}>
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-white/80 hover:bg-white/5"
                      onClick={() => {
                        onFilterChange(f);
                        setFilterOpen(false);
                      }}
                    >
                      {f}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        )}

        <button
          type="button"
          onClick={toggleTheme}
          className="rounded-xl border border-white/10 p-2.5 text-white/70 hover:bg-white/5"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative rounded-xl border border-white/10 p-2.5 text-white/70 hover:bg-white/5"
            aria-label="Notifications"
          >
            <Bell size={18} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-400" />
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#141820] p-3 shadow-2xl"
              >
                <p className="mb-2 px-2 text-xs font-semibold text-white/50">
                  Notifications
                </p>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="rounded-xl p-3 hover:bg-white/5 transition"
                  >
                    <p className="text-sm font-medium text-white">{n.title}</p>
                    <p className="text-xs text-white/50 mt-0.5">{n.body}</p>
                    <p className="text-[10px] text-indigo-400 mt-1">{n.time}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 pl-2 pr-3 py-1.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-bold">
            YK
          </span>
          <div className="text-left">
            <p className="text-xs font-medium text-white">Yogesh K.</p>
            <p className="text-[10px] text-white/40">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
