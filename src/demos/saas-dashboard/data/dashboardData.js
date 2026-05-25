export const navItems = [
  { id: "overview", label: "Overview", icon: "layout" },
  { id: "analytics", label: "Analytics", icon: "chart" },
  { id: "customers", label: "Customers", icon: "users" },
  { id: "billing", label: "Billing", icon: "credit" },
  { id: "settings", label: "Settings", icon: "settings" },
];

export const pageMeta = {
  overview: {
    title: "Dashboard Overview",
    subtitle: "Real-time metrics and recent activity",
  },
  analytics: {
    title: "Analytics",
    subtitle: "Deep-dive reports and performance insights",
  },
  customers: {
    title: "Customers",
    subtitle: "User accounts, segments, and engagement",
  },
  billing: {
    title: "Billing",
    subtitle: "Subscriptions, invoices, and payment history",
  },
  settings: {
    title: "Settings",
    subtitle: "Workspace preferences and team configuration",
  },
};

export const kpis = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$128,430",
    change: "+12.4%",
    trend: "up",
  },
  {
    id: "users",
    label: "Active Users",
    value: "24,891",
    change: "+8.1%",
    trend: "up",
  },
  {
    id: "mrr",
    label: "MRR",
    value: "$42,180",
    change: "+5.2%",
    trend: "up",
  },
  {
    id: "churn",
    label: "Churn Rate",
    value: "2.3%",
    change: "-0.4%",
    trend: "down",
  },
];

export const revenueData = [
  { month: "Jan", revenue: 42000, profit: 28000 },
  { month: "Feb", revenue: 48000, profit: 31000 },
  { month: "Mar", revenue: 45000, profit: 29500 },
  { month: "Apr", revenue: 52000, profit: 34000 },
  { month: "May", revenue: 58000, profit: 38000 },
  { month: "Jun", revenue: 61000, profit: 40000 },
  { month: "Jul", revenue: 64000, profit: 42000 },
  { month: "Aug", revenue: 68000, profit: 45000 },
  { month: "Sep", revenue: 72000, profit: 48000 },
  { month: "Oct", revenue: 76000, profit: 51000 },
  { month: "Nov", revenue: 81000, profit: 54000 },
  { month: "Dec", revenue: 88000, profit: 59000 },
];

export const activityData = [
  { day: "Mon", sessions: 4200, signups: 320 },
  { day: "Tue", sessions: 3800, signups: 280 },
  { day: "Wed", sessions: 5100, signups: 410 },
  { day: "Thu", sessions: 4600, signups: 360 },
  { day: "Fri", sessions: 6200, signups: 490 },
  { day: "Sat", sessions: 2900, signups: 210 },
  { day: "Sun", sessions: 2400, signups: 180 },
];

export const transactions = [
  {
    id: "TXN-9281",
    customer: "Acme Corp",
    email: "billing@acme.io",
    amount: "$2,400.00",
    status: "completed",
    date: "May 24, 2026",
  },
  {
    id: "TXN-9280",
    customer: "Nova Labs",
    email: "finance@novalabs.com",
    amount: "$890.00",
    status: "completed",
    date: "May 24, 2026",
  },
  {
    id: "TXN-9279",
    customer: "Pixel Studio",
    email: "hello@pixel.studio",
    amount: "$1,120.00",
    status: "pending",
    date: "May 23, 2026",
  },
  {
    id: "TXN-9278",
    customer: "Orbit Health",
    email: "accounts@orbit.health",
    amount: "$3,200.00",
    status: "completed",
    date: "May 23, 2026",
  },
  {
    id: "TXN-9277",
    customer: "Flow Metrics",
    email: "pay@flowmetrics.io",
    amount: "$560.00",
    status: "failed",
    date: "May 22, 2026",
  },
  {
    id: "TXN-9276",
    customer: "Zen Commerce",
    email: "billing@zen.co",
    amount: "$1,780.00",
    status: "completed",
    date: "May 22, 2026",
  },
  {
    id: "TXN-9275",
    customer: "Atlas AI",
    email: "team@atlas.ai",
    amount: "$4,100.00",
    status: "completed",
    date: "May 21, 2026",
  },
  {
    id: "TXN-9274",
    customer: "Brightline",
    email: "ops@brightline.dev",
    amount: "$720.00",
    status: "pending",
    date: "May 21, 2026",
  },
];

export const notifications = [
  {
    id: 1,
    title: "New enterprise signup",
    body: "Atlas AI upgraded to Enterprise plan.",
    time: "2m ago",
  },
  {
    id: 2,
    title: "Payment received",
    body: "$4,100 from Atlas AI processed successfully.",
    time: "15m ago",
  },
  {
    id: 3,
    title: "Usage spike detected",
    body: "API calls increased 34% in the last hour.",
    time: "1h ago",
  },
];

export const filterOptions = ["Last 7 days", "Last 30 days", "Last 90 days", "This year"];
