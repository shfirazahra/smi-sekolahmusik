export default function StatCard({ label, value, note, color = "text-slate-900" }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className={`mt-3 text-3xl font-black ${color}`}>{value}</p>
      <p className="mt-2 text-xs text-slate-400">{note}</p>
    </article>
  );
}
