import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ChevronDown,
  Check,
  Menu,
  X,
} from "lucide-react";
import DemoShell from "../shared/DemoShell";
import {
  navLinks,
  bentoFeatures,
  testimonials,
  pricingPlans,
  faqs,
} from "./data/landingData";
import { GitHubIcon, LinkedInIcon } from "../../components/ui/BrandIcons";

function FloatingGradients() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity }}
      />
      <motion.div
        className="absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px]"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
    </div>
  );
}

function FAQItem({ item, open, onToggle }) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-5 text-left text-white font-medium"
        aria-expanded={open}
      >
        {item.q}
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm text-white/60 leading-relaxed">{item.a}</p>
      </motion.div>
    </div>
  );
}

export default function AILandingDemo() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const glowX = useTransform(mx, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(my, [0, 1], ["30%", "70%"]);

  const handleMouse = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <DemoShell
      title="AI Startup Landing"
      subtitle="Nexus AI — futuristic product marketing"
      className="bg-[#050508] text-white"
    >
      <FloatingGradients />

      <nav className="sticky top-[57px] z-40 border-b border-white/5 bg-[#050508]/70 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="font-display text-lg font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
            Nexus<span className="text-violet-400">AI</span>
          </span>
          <ul className="hidden md:flex gap-8 text-sm text-white/60">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white transition">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex gap-3">
            <button
              type="button"
              className="rounded-full px-4 py-2 text-sm text-white/70 hover:text-white"
            >
              Sign in
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black"
            >
              Get started
            </motion.button>
          </div>
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="block text-white/70"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <section
        className="relative mx-auto max-w-6xl px-4 sm:px-6 pt-20 pb-28 text-center"
        onMouseMove={handleMouse}
      >
        <motion.div
          style={{ left: glowX, top: glowY }}
          className="pointer-events-none absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[80px]"
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70 mb-8"
        >
          <Sparkles size={14} className="text-violet-400" />
          Introducing Nexus Agents 2.0
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
        >
          <span className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-transparent">
            Intelligence
          </span>
          <br />
          for modern product teams
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-white/50"
        >
          Build, ship, and scale AI-native workflows with a platform designed for
          speed, clarity, and world-class UX.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(139,92,246,0.4)" }}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-3.5 font-semibold"
          >
            Start building <ArrowRight size={18} />
          </motion.button>
          <button
            type="button"
            className="rounded-full border border-white/15 px-8 py-3.5 text-white/80 hover:bg-white/5"
          >
            Watch demo
          </button>
        </motion.div>
      </section>

      <section id="bento" className="mx-auto max-w-6xl px-4 sm:px-6 pb-24">
        <h2 id="features" className="font-display text-3xl font-bold text-center mb-12">
          Built for the AI era
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {bentoFeatures.map((f, i) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`rounded-3xl border border-white/10 bg-gradient-to-br ${f.gradient} p-6 ${f.span}`}
            >
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-white/60">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          Loved by builders
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.author}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <p className="text-white/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4">
                <p className="font-semibold text-white">{t.author}</p>
                <p className="text-xs text-white/40">{t.role}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <h2 className="font-display text-3xl font-bold text-center mb-12">
          Simple pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ y: -8 }}
              className={`rounded-3xl border p-8 ${
                plan.popular
                  ? "border-violet-500/50 bg-violet-500/10 shadow-[0_0_60px_-12px_rgba(139,92,246,0.5)]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              {plan.popular && (
                <span className="text-xs font-mono text-violet-300 uppercase tracking-wider">
                  Most popular
                </span>
              )}
              <h3 className="mt-2 font-display text-xl font-bold">{plan.name}</h3>
              <p className="mt-4 font-display text-4xl font-bold">
                {plan.price}
                <span className="text-base font-normal text-white/40">
                  {plan.period}
                </span>
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-white/70">
                    <Check size={16} className="text-violet-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className={`mt-8 w-full rounded-full py-3 font-semibold transition ${
                  plan.popular
                    ? "bg-white text-black hover:bg-white/90"
                    : "border border-white/20 hover:bg-white/5"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-2xl px-4 sm:px-6 py-20">
        <h2 className="font-display text-3xl font-bold text-center mb-10">FAQ</h2>
        {faqs.map((item, i) => (
          <FAQItem
            key={item.q}
            item={item}
            open={openFaq === i}
            onToggle={() => setOpenFaq(openFaq === i ? -1 : i)}
          />
        ))}
      </section>

      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-20 text-center">
        <motion.div
          whileInView={{ scale: [0.98, 1] }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-600/20 to-cyan-600/10 p-12"
        >
          <h2 className="font-display text-3xl font-bold">
            Ready to ship AI faster?
          </h2>
          <p className="mt-4 text-white/50">
            Join 12,000+ teams building on Nexus AI.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            type="button"
            className="mt-8 rounded-full bg-white px-8 py-3.5 font-semibold text-black"
          >
            Get started free
          </motion.button>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-white/40">© 2026 Nexus AI — Demo showcase</p>
          <div className="flex gap-4 text-white/50">
            <GitHubIcon size={20} />
            <LinkedInIcon size={20} />
          </div>
        </div>
      </footer>
    </DemoShell>
  );
}
