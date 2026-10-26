export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2.5 z-50 border border-slate-700"
    >
      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
      {message}
    </div>
  );
}
