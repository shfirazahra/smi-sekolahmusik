import { useState } from "react";
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

  // State untuk form input presensi baru oleh Admin
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentStatus, setNewStudentStatus] = useState("hadir");
  const [manualRecords, setManualRecords] = useState([]);

  const handleAddAttendance = (e) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;

    const newEntry = {
      id: `manual-${Date.now()}`,
      name: newStudentName,
      date: todayValue,
      status: newStudentStatus,
    };

    setManualRecords([newEntry, ...manualRecords]);
    setNewStudentName("");
    alert("Data kehadiran berhasil dicatat!");
  };

  const combinedRecords = [...manualRecords, ...a.filtered];

  const cards = [
    { label: "Total data kehadiran", value: a.summary.total + manualRecords.length, note: "Sesuai filter aktif" },
    { label: "Hadir / terlambat", value: a.summary.present, note: `${a.summary.rate}% tingkat kehadiran`, color: "text-emerald-700" },
    { label: "Tidak hadir (alpa)", value: a.summary.absent, note: "Perlu ditindaklanjuti", color: "text-rose-700" },
    { label: "Izin / sakit", value: a.summary.permission, note: "Ketidakhadiran tercatat", color: "text-sky-700" },
  ];

  return (
    <section className="min-h-[75vh] bg-slate-50 px-4 py-8 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
              Panel Pengelola / Admin
            </p>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              Kelola Presensi & Kehadiran
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-500">
              Mencatat, mengonfirmasi, dan memantau kehadiran siswa dalam satu sistem.
            </p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-white px-4 py-3 text-sm shadow-sm">
            <p className="text-xs text-slate-500">Hari ini</p>
            <p className="font-bold text-slate-800">{formatDate(todayValue)}</p>
          </div>
        </div>

        {/* Form Pencatatan Kehadiran Baru oleh Admin */}
        <article className="mb-8 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-extrabold text-slate-900 mb-1">Catat Kehadiran Baru</h2>
          <p className="text-xs text-slate-500 mb-4">Input manual konfirmasi kehadiran siswa hari ini.</p>
          <form onSubmit={handleAddAttendance} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nama Murid..."
              value={newStudentName}
              onChange={(e) => setNewStudentName(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              required
            />
            <select
              value={newStudentStatus}
              onChange={(e) => setNewStudentStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            >
              <option value="hadir">Hadir</option>
              <option value="terlambat">Terlambat</option>
              <option value="izin">Izin</option>
              <option value="sakit">Sakit</option>
              <option value="alpa">Alpa</option>
            </select>
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-xl font-bold text-xs uppercase px-5 py-3 hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
            >
              Simpan Presensi
            </button>
          </form>
        </article>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <StatCard key={card.label} {...card} />
          ))}
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
        </div>

        <PersonalHistory records={a.personalRecords} />

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5 sm:p-6">
            <div className="mb-5">
              <h2 className="text-lg font-extrabold text-slate-900">Riwayat Kehadiran Murid</h2>
              <p className="mt-1 text-xs text-slate-500">
                Kelola dan verifikasi status kehadiran siswa terdaftar.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <FilterField
                label="Dari tanggal"
                type="date"
                value={startDate}
                max={endDate || undefined}
                onChange={(e) => a.setStartDate(e.target.value)}
              />
              <FilterField
                label="Sampai tanggal"
                type="date"
                value={endDate}
                min={startDate || undefined}
                max={todayValue}
                onChange={(e) => a.setEndDate(e.target.value)}
              />
              <FilterField
                label="Status kehadiran"
                as="select"
                value={status}
                onChange={(e) => a.setStatus(e.target.value)}
              >
                <option value="semua">Semua status</option>
                {Object.entries(STATUS_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </FilterField>
              <FilterField
                label="Cari murid"
                type="search"
                value={search}
                placeholder="Nama atau email..."
                onChange={(e) => a.setSearch(e.target.value)}
              />
            </div>
          </div>
          <AsyncBoundary
            loading={team.loading}
            error={team.error}
            onRetry={team.retry}
            isEmpty={combinedRecords.length === 0}
            emptyTitle="Data kehadiran tidak ditemukan"
            emptyHint="Coba ubah tanggal, status, atau kata kunci pencarian."
          >
            <StudentAttendanceTable records={combinedRecords} />
          </AsyncBoundary>
        </article>
      </div>
    </section>
  );
}