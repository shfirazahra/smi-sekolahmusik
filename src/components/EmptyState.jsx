export default function EmptyState({ title = "Tidak ada data", hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
      <p className="text-base font-bold text-slate-700">{title}</p>
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
