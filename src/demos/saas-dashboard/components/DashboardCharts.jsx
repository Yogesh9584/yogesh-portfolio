import { SimpleAreaChart, SimpleBarChart } from "../../shared/charts/SimpleCharts";

const CHART_HEIGHT = 260;

export function RevenueChart({ data }) {
  return (
    <SimpleAreaChart
      title="Revenue Overview"
      data={data}
      xKey="month"
      height={CHART_HEIGHT}
      delay={600}
      series={[
        {
          key: "revenue",
          label: "Revenue",
          stroke: "#6366f1",
          fill: "#6366f1",
        },
        {
          key: "profit",
          label: "Profit",
          stroke: "#22d3ee",
          fill: "transparent",
          dashed: true,
        },
      ]}
    />
  );
}

export function ActivityChart({ data }) {
  return (
    <SimpleBarChart
      title="User Activity"
      data={data}
      xKey="day"
      height={CHART_HEIGHT}
      delay={800}
      bars={[
        { key: "sessions", label: "Sessions", fill: "#6366f1" },
        { key: "signups", label: "Signups", fill: "#22d3ee" },
      ]}
    />
  );
}
