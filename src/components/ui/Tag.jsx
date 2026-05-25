export default function Tag({ children }) {
  return (
    <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-muted">
      {children}
    </span>
  );
}
