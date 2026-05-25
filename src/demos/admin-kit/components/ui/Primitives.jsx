import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronDown,
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { SimpleBarChart } from "../../../shared/charts/SimpleCharts";
import { useDemoTheme } from "../../../shared/DemoThemeContext";

const chartData = [
  { name: "Mon", v: 40 },
  { name: "Tue", v: 55 },
  { name: "Wed", v: 48 },
  { name: "Thu", v: 70 },
  { name: "Fri", v: 62 },
];

/* Buttons */
export function UIButton({
  children,
  variant = "primary",
  size = "md",
  disabled,
  onClick,
}) {
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500",
    secondary: "border border-white/15 bg-white/5 text-white hover:bg-white/10",
    ghost: "text-white/70 hover:bg-white/5",
    danger: "bg-rose-600/90 text-white hover:bg-rose-500",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-xl font-semibold transition disabled:opacity-40 ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </motion.button>
  );
}

/* Input */
export function UIInput({ label, error, ...props }) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-xs font-medium text-white/60">{label}</span>}
      <input
        className={`w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition ${
          error ? "border-rose-500/50" : "border-white/10 focus:border-indigo-500/50"
        }`}
        {...props}
      />
      {error && <span className="text-xs text-rose-400">{error}</span>}
    </label>
  );
}

/* Select */
export function UISelect({ label, options, value, onChange }) {
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-xs font-medium text-white/60">{label}</span>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500/50"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value} className="bg-zinc-900">
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/40"
        />
      </div>
    </label>
  );
}

/* Alert */
const alertStyles = {
  info: { bg: "bg-sky-500/10 border-sky-500/30", icon: Info, color: "text-sky-400" },
  success: { bg: "bg-emerald-500/10 border-emerald-500/30", icon: CheckCircle, color: "text-emerald-400" },
  warning: { bg: "bg-amber-500/10 border-amber-500/30", icon: AlertTriangle, color: "text-amber-400" },
  error: { bg: "bg-rose-500/10 border-rose-500/30", icon: AlertCircle, color: "text-rose-400" },
};

export function UIAlert({ variant = "info", title, children }) {
  const s = alertStyles[variant];
  const Icon = s.icon;
  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${s.bg}`}>
      <Icon size={20} className={s.color} />
      <div>
        {title && <p className="font-semibold text-white text-sm">{title}</p>}
        <p className="text-sm text-white/60 mt-0.5">{children}</p>
      </div>
    </div>
  );
}

/* Modal */
export function UIModal({ open, onClose, title, children }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#141820] p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-white">{title}</h3>
              <button type="button" onClick={onClose} aria-label="Close">
                <X size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* Tabs */
export function UITabs({ tabs, active, onChange }) {
  return (
    <div>
      <div className="flex gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative flex-1 rounded-lg py-2 text-sm font-medium transition ${
              active === tab.id ? "text-white" : "text-white/50 hover:text-white/80"
            }`}
          >
            {active === tab.id && (
              <motion.span
                layoutId="kit-tab"
                className="absolute inset-0 rounded-lg bg-indigo-500/20 border border-indigo-500/30"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Accordion */
export function UIAccordion({ items, openId, onToggle }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-xl border border-white/10 overflow-hidden">
          <button
            type="button"
            onClick={() => onToggle(item.id)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-white"
            aria-expanded={openId === item.id}
          >
            {item.title}
            <ChevronDown
              size={16}
              className={`transition ${openId === item.id ? "rotate-180" : ""}`}
            />
          </button>
          <AnimatePresence>
            {openId === item.id && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-3 text-sm text-white/60">{item.content}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

/* Table */
export function UITable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-left text-white/50 text-xs uppercase">
            {columns.map((c) => (
              <th key={c} className="px-4 py-3 font-medium">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 text-white/80">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* Pagination */
export function UIPagination({ page, total, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <UIButton
        variant="secondary"
        size="sm"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        Prev
      </UIButton>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`h-9 w-9 rounded-lg text-sm ${
            p === page ? "bg-indigo-600 text-white" : "text-white/50 hover:bg-white/5"
          }`}
        >
          {p}
        </button>
      ))}
      <UIButton
        variant="secondary"
        size="sm"
        disabled={page >= total}
        onClick={() => onChange(page + 1)}
      >
        Next
      </UIButton>
    </div>
  );
}

/* Loader */
export function UILoader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center gap-3 py-8" role="status">
      <motion.div
        className="h-10 w-10 rounded-full border-2 border-indigo-500/30 border-t-indigo-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="text-sm text-white/50">{label}</p>
    </div>
  );
}

/* Empty state */
export function UIEmpty({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 py-16 text-center">
      <p className="font-display font-semibold text-white">{title}</p>
      <p className="mt-2 text-sm text-white/50 max-w-sm mx-auto">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

/* Tooltip demo */
export function UITooltipWrap({ children, tip }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-800 px-2 py-1 text-xs text-white shadow-lg"
          >
            {tip}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* Toast */
export function ToastViewport({ toasts }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="pointer-events-auto rounded-xl border border-white/10 bg-[#141820] px-4 py-3 text-sm text-white shadow-xl min-w-[220px]"
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);
  const push = (message) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };
  return { toasts, push };
}

/* Mini chart */
export function UIChart() {
  return (
    <SimpleBarChart
      data={chartData}
      xKey="name"
      height={200}
      delay={400}
      bars={[{ key: "v", label: "Activity", fill: "#6366f1" }]}
    />
  );
}

/* Theme switcher block */
export function UIThemeSwitcher() {
  const { theme, toggleTheme } = useDemoTheme();
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
      <span className="text-sm text-white/70">Theme</span>
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
      >
        {theme === "dark" ? "Switch to light" : "Switch to dark"}
      </button>
    </div>
  );
}

/* Card */
export function UICard({ title, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.03] p-5 ${className}`}
    >
      {title && (
        <h4 className="text-xs font-mono uppercase tracking-wider text-white/40 mb-4">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}
