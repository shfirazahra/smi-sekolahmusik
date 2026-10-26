import AsyncBoundary from "../components/AsyncBoundary";
import FilterField from "../components/FilterField";
import StatCard from "../components/StatCard";
import StudentAttendanceTable from "../components/StudentAttendanceTable";
import { PersonalHistory, PersonalSummary } from "../components/PersonalAttendance";
import { useAttendance } from "../hooks/useAttendance";
import { STATUS_BAR_COLORS, STATUS_LABELS } from "../utils/attendance";
import { formatDate, getTodayValue } from "../utils/date";

export default function Attendance({ team }) {
  const a = useAttendance(team.data);
  const { startDate, endDate, status, search } = a.filters;
  const todayValue = getTodayValue();

  const cards = [
    { label: "Total data kehadiran", value: a.summary.total, note: "Sesuai filter aktif" },
    { label: "Hadir / terlambat", value: a.summary.present, note: `${a.summary.rate}% tingkat kehadiran`, color: "text-emerald-700" },
    { label: "Tidak hadir (alpa)", value: a.summary.absent, note: "Perlu ditindaklanjuti", color: "text-rose-700" },
    { label: "Izin / sakit", value: a.summary.permission, note: "Ketidakhadiran tercatat", color: "text-sky-700" },
  ];

  return (
    <section className="min-h-[75vh] bg-slate-50 px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Panel Instruktur</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Ringkasan Kehadiran</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">Pantau kehadiran murid dan riwayat kehadiran personal dalam satu dashboard.</p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-sm shadow-sm">
            <p className="text-xs text-slate-500">Hari ini</p>
            <p className="font-bold text-slate-800">{formatDate(todayValue)}</p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => <StatCard key={card.label} {...card} />)}
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <PersonalSummary personal={a.personal} />
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">Presentasi Kehadiran Murid</h2>
            <p className="mb-5 mt-1 text-xs text-slate-500">Proporsi status kehadiran berdasarkan filter aktif</p>
            {a.breakdown.map((item) => (
              <div key={item.status} className="mb-4 last:mb-0">
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-semibold text-slate-600">{item.label}</span>
                  <span className="tabular-nums text-slate-500">{item.count} ({item.percent}%)</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${STATUS_BAR_COLORS[item.status]}`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </article>
        </div>

        <PersonalHistory records={a.personalRecords} />

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-slate-900">Riwayat Kehadiran Murid</h2>
              <p className="mt-1 text-xs text-slate-500">Data nama murid bersumber dari DummyJSON; status presensi adalah data simulasi.</p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <FilterField label="Dari tanggal" type="date" value={startDate} max={endDate || undefined} onChange={(e) => a.setStartDate(e.target.value)} />
              <FilterField label="Sampai tanggal" type="date" value={endDate} min={startDate || undefined} max={todayValue} onChange={(e) => a.setEndDate(e.target.value)} />
              <FilterField label="Status kehadiran" as="select" value={status} onChange={(e) => a.setStatus(e.target.value)}>
                <option value="semua">Semua status</option>
                {Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </FilterField>
              <FilterField label="Cari murid" type="search" value={search} placeholder="Nama atau email..." onChange={(e) => a.setSearch(e.target.value)} />
            </div>
          </div>
          <AsyncBoundary
            loading={team.loading}
            error={team.error}
            onRetry={team.retry}
            isEmpty={a.filtered.length === 0}
            emptyTitle="Data kehadiran tidak ditemukan"
            emptyHint="Coba ubah tanggal, status, atau kata kunci pencarian."
          >
            <StudentAttendanceTable records={a.filtered} />
          </AsyncBoundary>
        </article>
      </div>
    </section>
  );
}
