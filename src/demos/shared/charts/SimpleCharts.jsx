import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SkeletonChart } from "../Skeleton";

const PADDING = { top: 24, right: 16, bottom: 32, left: 44 };

function ChartShell({ title, height = 260, loading, children, className = "" }) {
  if (loading) {
    return (
      <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 ${className}`}>
        <SkeletonChart style={{ height }} />
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 ${className}`}>
      {title && (
        <h3 className="font-display font-semibold text-white mb-4">{title}</h3>
      )}
      <svg
        viewBox={`0 0 400 ${height}`}
        className="w-full"
        style={{ height }}
        role="img"
        aria-label={title}
      >
        {children}
      </svg>
    </div>
  );
}

function GridLines({ height, rows = 4 }) {
  const innerH = height - PADDING.top - PADDING.bottom;
  return (
    <g stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4">
      {Array.from({ length: rows + 1 }).map((_, i) => {
        const y = PADDING.top + (innerH / rows) * i;
        return <line key={i} x1={PADDING.left} y1={y} x2={390} y2={y} />;
      })}
    </g>
  );
}

export function SimpleAreaChart({
  title,
  data,
  xKey,
  series,
  height = 260,
  delay = 600,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const innerW = 400 - PADDING.left - PADDING.right;
  const innerH = height - PADDING.top - PADDING.bottom;
  const max = Math.max(
    ...data.flatMap((d) => series.map((s) => d[s.key] ?? 0)),
    1
  );

  const points = (key) =>
    data
      .map((d, i) => {
        const x = PADDING.left + (i / Math.max(data.length - 1, 1)) * innerW;
        const y = PADDING.top + innerH - ((d[key] ?? 0) / max) * innerH;
        return `${x},${y}`;
      })
      .join(" ");

  const areaPath = (key) => {
    const pts = data.map((d, i) => {
      const x = PADDING.left + (i / Math.max(data.length - 1, 1)) * innerW;
      const y = PADDING.top + innerH - ((d[key] ?? 0) / max) * innerH;
      return { x, y };
    });
    if (pts.length === 0) return "";
    const baseY = PADDING.top + innerH;
    const line = pts.map((p) => `${p.x},${p.y}`).join(" L ");
    return `M ${pts[0].x},${baseY} L ${line} L ${pts[pts.length - 1].x},${baseY} Z`;
  };

  return (
    <ChartShell title={title} height={height} loading={loading}>
      <GridLines height={height} />
      {series
        .filter((s) => !s.dashed)
        .map((s) => (
          <motion.path
            key={s.key}
            d={areaPath(s.key)}
            fill={s.fill}
            fillOpacity={0.35}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          />
        ))}
      {series.map((s) => (
        <motion.polyline
          key={`line-${s.key}`}
          points={points(s.key)}
          fill="none"
          stroke={s.stroke}
          strokeWidth={2}
          strokeDasharray={s.dashed ? "6 4" : undefined}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
      ))}
      {data.map((d, i) => {
        const x = PADDING.left + (i / Math.max(data.length - 1, 1)) * innerW;
        return (
          <text
            key={d[xKey]}
            x={x}
            y={height - 8}
            textAnchor="middle"
            fill="#64748b"
            fontSize="10"
          >
            {d[xKey]}
          </text>
        );
      })}
      <g transform={`translate(8, ${PADDING.top})`}>
        {[0, 0.5, 1].map((t) => (
          <text
            key={t}
            y={innerH * (1 - t)}
            fill="#64748b"
            fontSize="9"
            dominantBaseline="middle"
          >
            ${Math.round((max * t) / 1000)}k
          </text>
        ))}
      </g>
      <g transform="translate(120, 8)">
        {series.map((s, i) => (
          <g key={s.key} transform={`translate(${i * 90}, 0)`}>
            <rect width="10" height="3" fill={s.stroke} rx="1" />
            <text x={14} y={6} fill="#94a3b8" fontSize="9">
              {s.label}
            </text>
          </g>
        ))}
      </g>
    </ChartShell>
  );
}

export function SimpleBarChart({
  title,
  data,
  xKey,
  bars,
  height = 260,
  delay = 800,
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const innerW = 400 - PADDING.left - PADDING.right;
  const innerH = height - PADDING.top - PADDING.bottom;
  const max = Math.max(
    ...data.flatMap((d) => bars.map((b) => d[b.key] ?? 0)),
    1
  );
  const groupW = innerW / data.length;
  const barW = Math.min(14, (groupW - 8) / bars.length);

  return (
    <ChartShell title={title} height={height} loading={loading}>
      <GridLines height={height} />
      {data.map((d, i) => {
        const gx = PADDING.left + i * groupW + groupW / 2;
        return bars.map((b, bi) => {
          const val = d[b.key] ?? 0;
          const bh = (val / max) * innerH;
          const x = gx - (bars.length * barW) / 2 + bi * (barW + 4);
          const y = PADDING.top + innerH - bh;
          return (
            <motion.rect
              key={`${d[xKey]}-${b.key}`}
              x={x}
              y={y}
              width={barW}
              height={bh}
              rx={4}
              fill={b.fill}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: `${x + barW / 2}px ${PADDING.top + innerH}px` }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            />
          );
        });
      })}
      {data.map((d, i) => {
        const x = PADDING.left + i * groupW + groupW / 2;
        return (
          <text
            key={`label-${d[xKey]}`}
            x={x}
            y={height - 8}
            textAnchor="middle"
            fill="#64748b"
            fontSize="10"
          >
            {d[xKey]}
          </text>
        );
      })}
      <g transform="translate(120, 8)">
        {bars.map((b, i) => (
          <g key={b.key} transform={`translate(${i * 80}, 0)`}>
            <rect width="10" height="10" fill={b.fill} rx="2" />
            <text x={14} y={8} fill="#94a3b8" fontSize="9">
              {b.label}
            </text>
          </g>
        ))}
      </g>
    </ChartShell>
  );
}
