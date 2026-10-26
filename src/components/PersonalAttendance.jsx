import { formatDate } from "../utils/date";
import StatusBadge from "./StatusBadge";

export function PersonalSummary({ personal }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Kehadiran Personal</h2>
          <p className="mt-1 text-xs text-slate-500">Ringkasan kehadiran instruktur (simulasi)</p>
        </div>
        <span className="rounded-xl bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700">{personal.rate}%</span>
      </div>
      <div className="mb-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${personal.rate}%` }} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Hadir / terlambat</p>
          <p className="mt-1 text-2xl font-black text-slate-900">{personal.present}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-xs text-slate-500">Hari tercatat</p>
          <p className="mt-1 text-2xl font-black text-slate-900">{personal.days}</p>
        </div>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-slate-400">
        Data kehadiran instruktur merupakan data contoh untuk demonstrasi antarmuka, bukan catatan presensi nyata.
      </p>
    </article>
  );
}

export function PersonalHistory({ records }) {
  return (
    <article className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <h2 className="text-lg font-extrabold text-slate-900">Riwayat Kehadiran Personal</h2>
        <p className="mt-1 text-xs text-slate-500">Riwayat instruktur mengikuti rentang tanggal yang dipilih di bawah ini.</p>
      </div>
      {records.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">Pilih rentang tanggal yang valid untuk melihat riwayat.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
              <tr><th className="px-5 py-3">Tanggal</th><th className="px-5 py-3">Jam masuk</th><th className="px-5 py-3">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.slice(0, 30).map((r) => (
                <tr key={r.date}>
                  <td className="px-5 py-3 text-slate-600">{formatDate(r.date)}</td>
                  <td className="px-5 py-3 text-slate-600">{r.checkIn}</td>
                  <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </article>
  );
}
