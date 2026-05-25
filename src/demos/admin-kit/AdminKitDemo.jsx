import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Layers,
  Bell,
  Settings,
  PanelLeft,
} from "lucide-react";
import DemoShell from "../shared/DemoShell";
import {
  UIButton,
  UIInput,
  UISelect,
  UIAlert,
  UIModal,
  UITabs,
  UIAccordion,
  UITable,
  UIPagination,
  UILoader,
  UIEmpty,
  UITooltipWrap,
  useToast,
  ToastViewport,
  UIChart,
  UIThemeSwitcher,
  UICard,
} from "./components/ui/Primitives";

const sidebarNav = [
  { id: "components", label: "Components", icon: Layers },
  { id: "layouts", label: "Layouts", icon: LayoutDashboard },
  { id: "settings", label: "Settings", icon: Settings },
];

const accordionItems = [
  { id: "a1", title: "What is included?", content: "40+ primitives with variants for forms, feedback, and data display." },
  { id: "a2", title: "Can I customize tokens?", content: "Yes — swap colors, radii, and spacing via Tailwind theme extension." },
  { id: "a3", title: "Production ready?", content: "Built for design systems with accessibility and responsive patterns." },
];

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="font-display text-xl font-bold text-white mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default function AdminKitDemo() {
  const [activeNav, setActiveNav] = useState("components");
  const [modalOpen, setModalOpen] = useState(false);
  const [tab, setTab] = useState("overview");
  const [accordionOpen, setAccordionOpen] = useState("a1");
  const [page, setPage] = useState(1);
  const [selectVal, setSelectVal] = useState("opt1");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { toasts, push } = useToast();

  return (
    <DemoShell
      title="Admin Panel UI Kit"
      subtitle="Aurora UI — reusable component system"
      className="bg-[#0a0b0f] text-white"
    >
      <ToastViewport toasts={toasts} />
      <div className="flex min-h-[calc(100vh-57px)]">
        <aside
          className={`hidden md:flex flex-col border-r border-white/10 bg-[#0d0f14] transition-all ${
            sidebarCollapsed ? "w-16" : "w-56"
          }`}
        >
          <div className="flex h-14 items-center justify-between px-4 border-b border-white/10">
            {!sidebarCollapsed && (
              <span className="font-display font-bold text-sm">Aurora UI</span>
            )}
            <button
              type="button"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="rounded-lg p-2 hover:bg-white/5"
              aria-label="Toggle sidebar"
            >
              <PanelLeft size={18} />
            </button>
          </div>
          <nav className="p-2 space-y-1 flex-1">
            {sidebarNav.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm ${
                    activeNav === item.id
                      ? "bg-indigo-500/15 text-white"
                      : "text-white/50 hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {!sidebarCollapsed && item.label}
                </button>
              );
            })}
          </nav>
        </aside>

        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-white/10 bg-[#0a0b0f]/90 backdrop-blur px-6">
            <p className="text-sm text-white/50">Component showcase</p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="rounded-lg border border-white/10 p-2 text-white/60 hover:bg-white/5"
                aria-label="Notifications"
              >
                <Bell size={18} />
              </button>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-4 sm:px-6 py-10 space-y-16">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display text-3xl font-bold">UI Kit Library</h1>
              <p className="mt-2 text-white/50 max-w-xl">
                Production-grade admin primitives — buttons, forms, feedback, data display,
                and layout patterns.
              </p>
            </motion.div>

            <Section id="buttons" title="Buttons">
              <div className="flex flex-wrap gap-3">
                <UIButton>Primary</UIButton>
                <UIButton variant="secondary">Secondary</UIButton>
                <UIButton variant="ghost">Ghost</UIButton>
                <UIButton variant="danger">Danger</UIButton>
                <UIButton disabled>Disabled</UIButton>
                <UITooltipWrap tip="Tooltip on hover">
                  <UIButton variant="secondary">With tooltip</UIButton>
                </UITooltipWrap>
              </div>
            </Section>

            <Section id="forms" title="Forms">
              <div className="grid sm:grid-cols-2 gap-4 max-w-xl">
                <UIInput label="Email" placeholder="you@company.com" type="email" />
                <UIInput label="With error" placeholder="Required" error="This field is required" />
                <UISelect
                  label="Role"
                  value={selectVal}
                  onChange={setSelectVal}
                  options={[
                    { value: "opt1", label: "Administrator" },
                    { value: "opt2", label: "Editor" },
                    { value: "opt3", label: "Viewer" },
                  ]}
                />
              </div>
            </Section>

            <Section id="feedback" title="Alerts & Toasts">
              <div className="grid gap-3 max-w-2xl">
                <UIAlert variant="info" title="Info">
                  System update scheduled tonight at 2 AM UTC.
                </UIAlert>
                <UIAlert variant="success" title="Success">
                  Your changes have been saved.
                </UIAlert>
                <UIAlert variant="warning" title="Warning">
                  API rate limit approaching 80%.
                </UIAlert>
                <UIAlert variant="error" title="Error">
                  Failed to sync workspace — retry in a moment.
                </UIAlert>
                <UIButton onClick={() => push("Toast notification triggered!", "success")}>
                  Show toast
                </UIButton>
              </div>
            </Section>

            <Section id="overlays" title="Modal & Tabs">
              <div className="space-y-6 max-w-xl">
                <UIButton onClick={() => setModalOpen(true)}>Open modal</UIButton>
                <UIModal open={modalOpen} onClose={() => setModalOpen(false)} title="Confirm action">
                  <p className="text-sm text-white/60 mb-6">
                    This is a demo modal with focus trap styling and smooth enter/exit motion.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <UIButton variant="ghost" onClick={() => setModalOpen(false)}>
                      Cancel
                    </UIButton>
                    <UIButton onClick={() => setModalOpen(false)}>Confirm</UIButton>
                  </div>
                </UIModal>
                <UITabs
                  tabs={[
                    { id: "overview", label: "Overview" },
                    { id: "analytics", label: "Analytics" },
                    { id: "settings", label: "Settings" },
                  ]}
                  active={tab}
                  onChange={setTab}
                />
                <p className="text-sm text-white/50">Active tab: {tab}</p>
              </div>
            </Section>

            <Section id="accordion" title="Accordion">
              <div className="max-w-xl">
                <UIAccordion
                  items={accordionItems}
                  openId={accordionOpen}
                  onToggle={(id) =>
                    setAccordionOpen((current) => (current === id ? "" : id))
                  }
                />
              </div>
            </Section>

            <Section id="data" title="Table & Pagination">
              <UITable
                columns={["Name", "Role", "Status"]}
                rows={[
                  ["Alex Morgan", "Admin", "Active"],
                  ["Jamie Lee", "Editor", "Active"],
                  ["Sam Ortiz", "Viewer", "Invited"],
                ]}
              />
              <div className="mt-6">
                <UIPagination page={page} total={5} onChange={setPage} />
              </div>
            </Section>

            <Section id="charts" title="Charts">
              <UIChart />
            </Section>

            <Section id="states" title="Loaders & Empty states">
              <div className="grid md:grid-cols-2 gap-6">
                <UICard>
                  <UILoader />
                </UICard>
                <UIEmpty
                  title="No results found"
                  description="Try adjusting filters or search terms."
                  action={<UIButton size="sm">Clear filters</UIButton>}
                />
              </div>
            </Section>

            <Section id="theme" title="Theme switcher">
              <UIThemeSwitcher />
            </Section>

            <Section id="cards" title="Cards & layout">
              <div className="grid sm:grid-cols-3 gap-4">
                {["Users", "Revenue", "Sessions"].map((label) => (
                  <UICard key={label} title={label}>
                    <p className="font-display text-2xl font-bold text-white">
                      {label === "Revenue" ? "$48.2k" : "2,841"}
                    </p>
                    <p className="text-xs text-emerald-400 mt-1">+12% this week</p>
                  </UICard>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
