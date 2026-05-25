import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const statusStyles = {
  completed: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-amber-500/15 text-amber-400",
  failed: "bg-rose-500/15 text-rose-400",
};

const PAGE_SIZE = 5;

export default function TransactionsTable({ rows }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(rows.length / PAGE_SIZE);
  const slice = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <h3 className="font-display font-semibold text-white">Recent Transactions</h3>
        <span className="text-xs text-white/40">{rows.length} total</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="border-b border-white/10 text-white/50 text-xs uppercase tracking-wider">
              <th className="px-5 py-3 font-medium">ID</th>
              <th className="px-5 py-3 font-medium">Customer</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {slice.map((row, i) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-white/5 hover:bg-white/[0.03] transition"
              >
                <td className="px-5 py-4 font-mono text-indigo-300">{row.id}</td>
                <td className="px-5 py-4">
                  <p className="text-white font-medium">{row.customer}</p>
                  <p className="text-xs text-white/40">{row.email}</p>
                </td>
                <td className="px-5 py-4 text-white">{row.amount}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs capitalize ${statusStyles[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-white/50">{row.date}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
        <p className="text-xs text-white/40">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-white/10 p-2 disabled:opacity-30 hover:bg-white/5"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-white/10 p-2 disabled:opacity-30 hover:bg-white/5"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
