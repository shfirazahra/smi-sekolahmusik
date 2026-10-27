import { useState } from "react";
import AsyncBoundary from "../components/AsyncBoundary";
import AttendanceFilters from "../components/AttendanceFilters";
import FilterField from "../components/FilterField";
import StatCard from "../components/StatCard";
import StudentAttendanceTable from "../components/StudentAttendanceTable";
import { PersonalHistory, PersonalSummary } from "../components/PersonalAttendance";
import { useAttendance } from "../hooks/useAttendance";
import { STATUS_BAR_COLORS, STATUS_LABELS } from "../utils/attendance";
import { formatDate, getTodayValue } from "../utils/date";

export default function Attendance({ team, onNotify }) {
  const a = useAttendance(team.data);
  const todayValue = getTodayValue();

  const [studentId, setStudentId] = useState("");
  const [newStatus, setNewStatus] = useState("hadir");

  const handleAddAttendance = (e) => {
    e.preventDefault();
    if (a.addAttendance(studentId, newStatus)) {
      setStudentId("");
      onNotify?.("Kehadiran murid hari ini berhasil dicatat.");
    }
  };

  const cards = [
    { label: "Total catatan murid", value: a.summary.total, note: "Sesuai rentang tanggal & pencarian" },
    {
      label: "Hadir / terlambat",
      value: a.summary.present,
      note: "Murid yang masuk kelas",
      color: "text-emerald-700",
    },
    {
      label: "Total absensi murid",
      value: a.summary.absentTotal,
      note: `Alpa ${a.summary.absent} · Izin/sakit ${a.summary.permission}`,
      color: "text-rose-700",
    },
    {
      label: "Persentase kehadiran murid",
      value: `${a.summary.rate}%`,
      note: "Hadir + terlambat dari total catatan",
      color: "text-indigo-700",
    },
  ];

  return (
    <section className="min-h-[75vh] bg-slate-50 px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Panel Instruktur</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Presensi & Kehadiran</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Pantau kehadiran Anda sendiri dan kehadiran murid, lengkap dengan persentase dan filter riwayat.
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-sm shadow-sm">
            <p className="text-xs text-slate-500">Hari ini</p>
            <p className="font-bold text-slate-800">{formatDate(todayValue)}</p>
          </div>
        </div>

        <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Kehadiran personal</h2>
        <div className="mb-6">
          <PersonalSummary personal={a.personal} />
        </div>
        <PersonalHistory
          records={a.personalRows}
          filters={a.personalFilters}
          onFilterChange={a.updatePersonalFilters}
          rangeValid={a.personalRangeValid}
          maxDate={todayValue}
        />

        <h2 className="mb-3 mt-10 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Kehadiran murid</h2>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
        </div>

        <div className="mb-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">Presentasi Kehadiran Murid</h2>
            <p className="mb-5 mt-1 text-xs text-slate-500">
              Proporsi status kehadiran pada rentang tanggal &amp; pencarian aktif
            </p>
            {a.breakdown.map((item) => (
              <div key={item.status} className="mb-4 last:mb-0">
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-semibold text-slate-600">{item.label}</span>
                  <span className="tabular-nums text-slate-500">
                    {item.count} ({item.percent}%)
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${STATUS_BAR_COLORS[item.status]}`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </article>

          <article className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-extrabold text-slate-900">Catat Kehadiran Hari Ini</h2>
            <p className="mb-4 text-xs text-slate-500">
              Mengganti status murid pada hari ini (hilang saat halaman dimuat ulang).
            </p>
            <form onSubmit={handleAddAttendance} className="space-y-3">
              <FilterField
                label="Murid"
                as="select"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                required
                disabled={team.loading || team.data.length === 0}
              >
                <option value="">Pilih murid...</option>
                {team.data.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </FilterField>
              <FilterField label="Status" as="select" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                {Object.entries(STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </FilterField>
              <button
                type="submit"
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-xs font-bold uppercase text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 disabled:opacity-50"
                disabled={!studentId}
              >
                Simpan Presensi
              </button>
            </form>
          </article>
        </div>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-slate-900">Riwayat Kehadiran Murid</h2>
              <p className="mt-1 text-xs text-slate-500">
                Filter berdasarkan rentang tanggal, status, atau nama/email murid. Data murid diambil dari DummyJSON.
              </p>
            </div>
            <AttendanceFilters
              filters={a.studentFilters}
              onChange={a.updateStudentFilters}
              maxDate={todayValue}
              searchLabel="Cari murid"
            />
          </div>
          {!a.studentRangeValid && !team.loading && !team.error ? (
            <p role="alert" className="p-6 text-sm text-rose-700">
              Rentang tanggal tidak valid. Pastikan tanggal awal tidak melewati tanggal akhir.
            </p>
          ) : (
            <AsyncBoundary
              loading={team.loading}
              error={team.error}
              onRetry={team.retry}
              isEmpty={a.studentRows.length === 0}
              emptyTitle="Data kehadiran tidak ditemukan"
              emptyHint="Coba ubah tanggal, status, atau kata kunci pencarian."
            >
              <StudentAttendanceTable records={a.studentRows} />
            </AsyncBoundary>
          )}
        </article>
      </div>
    </section>
  );
}
