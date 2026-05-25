export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Product", href: "#bento" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const bentoFeatures = [
  {
    id: "agents",
    title: "Autonomous Agents",
    description: "Deploy AI agents that plan, execute, and report across your stack.",
    span: "lg:col-span-2 lg:row-span-2",
    gradient: "from-violet-600/30 to-indigo-900/20",
  },
  {
    id: "sync",
    title: "Real-time Sync",
    description: "Sub-50ms inference with edge-optimized pipelines.",
    span: "",
    gradient: "from-cyan-600/20 to-slate-900/20",
  },
  {
    id: "security",
    title: "Enterprise Security",
    description: "SOC2-ready controls, SSO, and audit logs built in.",
    span: "",
    gradient: "from-emerald-600/20 to-slate-900/20",
  },
  {
    id: "api",
    title: "Developer API",
    description: "Type-safe SDKs for React, Node, and Python.",
    span: "lg:col-span-2",
    gradient: "from-fuchsia-600/20 to-indigo-900/20",
  },
];

export const testimonials = [
  {
    quote:
      "Nexus AI cut our content ops time by 60%. The UI feels like magic — fast, minimal, and insanely polished.",
    author: "Sarah Chen",
    role: "VP Product, Lumen",
  },
  {
    quote:
      "We shipped an AI copilot in two weeks. The developer experience rivals the best tools in the market.",
    author: "Marcus Reid",
    role: "CTO, Stackform",
  },
  {
    quote:
      "Finally an AI platform that designers and engineers both love using daily.",
    author: "Elena Voss",
    role: "Design Lead, Orbit",
  },
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    features: ["5K AI credits", "2 workspaces", "Email support", "Basic analytics"],
    cta: "Start free trial",
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/mo",
    features: [
      "50K AI credits",
      "Unlimited workspaces",
      "Priority support",
      "Advanced analytics",
      "Custom agents",
    ],
    cta: "Get Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Unlimited credits", "SSO & SAML", "Dedicated CSM", "SLA 99.9%"],
    cta: "Contact sales",
    popular: false,
  },
];

export const faqs = [
  {
    q: "How does Nexus AI handle data privacy?",
    a: "All data is encrypted in transit and at rest. Enterprise plans include zero-retention inference and regional data residency.",
  },
  {
    q: "Can I integrate with my existing tools?",
    a: "Yes — connect Slack, Notion, GitHub, Figma, and 40+ integrations via our marketplace or REST API.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan includes a 14-day trial with full Pro features. No credit card required to start.",
  },
  {
    q: "What models power the platform?",
    a: "We route across frontier models with automatic failover, latency optimization, and cost controls.",
  },
];
