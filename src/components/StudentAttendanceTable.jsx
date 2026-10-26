import { formatDate } from "../utils/date";
import StatusBadge from "./StatusBadge";

const MAX_ROWS = 100;

export default function StudentAttendanceTable({ records }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-4 font-bold">Murid</th>
              <th className="px-5 py-4 font-bold">Tanggal</th>
              <th className="px-5 py-4 font-bold">Jam masuk</th>
              <th className="px-5 py-4 font-bold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {records.slice(0, MAX_ROWS).map((r) => (
              <tr key={r.id} className="hover:bg-slate-50/80">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {r.avatar ? (
                      <img src={r.avatar} alt="" className="h-9 w-9 rounded-full bg-slate-100 object-cover" loading="lazy" />
                    ) : (
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">{r.name[0]}</div>
                    )}
                    <div>
                      <p className="font-bold text-slate-800">{r.name}</p>
                      <p className="mt-0.5 text-xs text-slate-400">{r.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-slate-600">{formatDate(r.date)}</td>
                <td className="px-5 py-4 text-slate-600">{r.checkIn}</td>
                <td className="px-5 py-4"><StatusBadge status={r.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {records.length > MAX_ROWS && (
        <p className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          Menampilkan {MAX_ROWS} dari {records.length} catatan. Gunakan filter untuk mempersempit hasil.
        </p>
      )}
    </>
  );
}
