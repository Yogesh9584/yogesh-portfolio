import KpiCards from "./KpiCards";
import { RevenueChart, ActivityChart } from "./DashboardCharts";
import TransactionsTable from "./TransactionsTable";
import DashboardPageHeader from "./DashboardPageHeader";

export default function DashboardOverview({ meta, filter, kpis, revenueData, activityData, transactions }) {
  return (
    <div className="space-y-6">
      <DashboardPageHeader title={meta.title} subtitle={meta.subtitle} filter={filter} />
      <KpiCards items={kpis} />
      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart data={revenueData} />
        <ActivityChart data={activityData} />
      </div>
      <TransactionsTable rows={transactions} />
    </div>
  );
}
