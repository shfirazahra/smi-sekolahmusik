// Logika pemrosesan data kehadiran (fungsi murni, tanpa UI).
import { getDaysAgoValue, toDateInput } from "./date";

export const STATUS_LABELS = {
  hadir: "Hadir",
  terlambat: "Terlambat",
  izin: "Izin",
  sakit: "Sakit",
  alpa: "Alpa",
};

export const STATUS_STYLES = {
  hadir: "bg-emerald-50 text-emerald-700",
  terlambat: "bg-amber-50 text-amber-700",
  izin: "bg-sky-50 text-sky-700",
  sakit: "bg-violet-50 text-violet-700",
  alpa: "bg-rose-50 text-rose-700",
};

export const STATUS_BAR_COLORS = {
  hadir: "bg-emerald-500",
  terlambat: "bg-amber-400",
  izin: "bg-sky-500",
  sakit: "bg-violet-500",
  alpa: "bg-rose-500",
};

const PRESENT_STATUSES = ["hadir", "terlambat"];
const STUDENT_STATUS_CYCLE = ["hadir", "hadir", "hadir", "terlambat", "izin", "sakit", "alpa"];
const PERSONAL_STATUS_CYCLE = ["hadir", "hadir", "hadir", "terlambat", "hadir", "izin", "hadir"];
const CHECK_IN_CYCLE = ["07:00", "07:05", "07:15", "07:28", "-"];
const MAX_PERSONAL_DAYS = 60;

export const isPresent = (status) => PRESENT_STATUSES.includes(status);
const percent = (part, total) => (total ? Math.round((part / total) * 100) : 0);

// Membuat data presensi simulasi 14 hari terakhir untuk setiap murid.
export function buildStudentRecords(users, days = 14) {
  const dates = Array.from({ length: days }, (_, i) => getDaysAgoValue(i));
  return dates.flatMap((date, dayIndex) =>
    users.map((user, userIndex) => ({
      id: `${date}-${user.id}`,
      userId: user.id,
      name: typeof user.name === "string" && user.name.trim() ? user.name.trim() : "Nama tidak tersedia",
      email: typeof user.email === "string" && user.email.trim() ? user.email.trim() : "-",
      avatar: typeof user.image === "string" ? user.image : "",
      date,
      status: STUDENT_STATUS_CYCLE[(userIndex + dayIndex * 2) % STUDENT_STATUS_CYCLE.length],
      checkIn: CHECK_IN_CYCLE[(userIndex + dayIndex) % CHECK_IN_CYCLE.length],
    })),
  );
}

export function filterStudentRecords(records, { startDate, endDate, status, search }) {
  const keyword = search.toLowerCase().trim();
  return records.filter(
    (r) =>
      r.date >= startDate &&
      r.date <= endDate &&
      (status === "semua" || r.status === status) &&
      `${r.name} ${r.email}`.toLowerCase().includes(keyword),
  );
}

export function summarizeRecords(records) {
  const count = (status) => records.filter((r) => r.status === status).length;
  const total = records.length;
  const present = count("hadir") + count("terlambat");
  return {
    total,
    present,
    absent: count("alpa"),
    permission: count("izin") + count("sakit"),
    rate: percent(present, total),
  };
}

// Distribusi persentase per status untuk bar presentasi.
export function statusBreakdown(records) {
  return Object.keys(STATUS_LABELS).map((status) => {
    const count = records.filter((r) => r.status === status).length;
    return { status, label: STATUS_LABELS[status], count, percent: percent(count, records.length) };
  });
}

// Presensi personal instruktur (simulasi) untuk rentang tanggal; rentang tidak valid -> [].
export function buildPersonalRecords(startDate, endDate) {
  if (!startDate || !endDate) return [];
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) return [];

  const days = [];
  for (let d = new Date(start); d <= end && days.length < MAX_PERSONAL_DAYS; d.setDate(d.getDate() + 1)) {
    days.push(toDateInput(d));
  }
  return days
    .map((date, index) => ({
      date,
      status: PERSONAL_STATUS_CYCLE[(index + 3) % PERSONAL_STATUS_CYCLE.length],
      checkIn: index % 5 === 3 ? "07:18" : "06:55",
    }))
    .reverse();
}

export function summarizePersonal(records) {
  const present = records.filter((r) => isPresent(r.status)).length;
  return { present, days: records.length, rate: percent(present, records.length) };
}
