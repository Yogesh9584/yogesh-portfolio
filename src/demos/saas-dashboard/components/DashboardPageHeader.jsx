export default function DashboardPageHeader({ title, subtitle, filter }) {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white">{title}</h1>
      {subtitle && (
        <p className="text-sm text-white/50 mt-1">
          {filter ? `${subtitle} · ${filter.toLowerCase()}` : subtitle}
        </p>
      )}
    </div>
  );
}
