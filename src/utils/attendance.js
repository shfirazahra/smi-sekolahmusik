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
export const STUDENT_HISTORY_DAYS = 14;
export const PERSONAL_HISTORY_DAYS = 60;

export const isPresent = (status) => PRESENT_STATUSES.includes(status);
const percent = (part, total) => (total ? Math.round((part / total) * 100) : 0);

// Rentang tanggal tidak valid jika salah satu kosong atau tanggal awal melewati tanggal akhir.
export const isValidRange = (startDate, endDate) => Boolean(startDate && endDate && startDate <= endDate);

// Membuat data presensi simulasi untuk setiap murid. Status murid dibuat deterministik
// (berdasarkan urutan murid dan hari), sehingga hasilnya tidak berubah saat filter diganti.
export function buildStudentRecords(users, days = STUDENT_HISTORY_DAYS) {
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
      manual: false,
    })),
  );
}

// Catatan manual dari instruktur menggantikan catatan murid yang sama pada tanggal yang sama.
export function mergeManualRecords(records, manualRecords) {
  if (manualRecords.length === 0) return records;
  const overridden = new Set(manualRecords.map((r) => r.id));
  return [...manualRecords, ...records.filter((r) => !overridden.has(r.id))];
}

export function createManualRecord(student, status, now = new Date()) {
  const date = toDateInput(now);
  const checkIn = isPresent(status)
    ? `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    : "-";
  return {
    id: `${date}-${student.id}`,
    userId: student.id,
    name: student.name,
    email: student.email || "-",
    avatar: student.image || "",
    date,
    status,
    checkIn,
    manual: true,
  };
}

// Filter rentang tanggal + pencarian nama/email. Rentang tidak valid -> hasil kosong.
export function filterByDateAndSearch(records, { startDate, endDate, search = "" }) {
  if (!isValidRange(startDate, endDate)) return [];
  const keyword = search.toLowerCase().trim();
  return records.filter(
    (r) =>
      r.date >= startDate &&
      r.date <= endDate &&
      (!keyword || `${r.name} ${r.email}`.toLowerCase().includes(keyword)),
  );
}

export const filterByStatus = (records, status) =>
  !status || status === "semua" ? records : records.filter((r) => r.status === status);

export function summarizeRecords(records) {
  const count = (status) => records.filter((r) => r.status === status).length;
  const total = records.length;
  const present = count("hadir") + count("terlambat");
  return {
    total,
    present,
    absent: count("alpa"),
    permission: count("izin") + count("sakit"),
    absentTotal: total - present,
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

// Presensi personal instruktur (simulasi) untuk N hari terakhir. Status dihitung dari
// "berapa hari yang lalu", bukan dari filter, sehingga tanggal yang sama selalu bernilai sama.
export function buildPersonalRecords(days = PERSONAL_HISTORY_DAYS) {
  return Array.from({ length: days }, (_, daysAgo) => ({
    date: getDaysAgoValue(daysAgo),
    status: PERSONAL_STATUS_CYCLE[(daysAgo + 3) % PERSONAL_STATUS_CYCLE.length],
    checkIn: daysAgo % 5 === 3 ? "07:18" : "06:55",
  }));
}

export function filterPersonalRecords(records, { startDate, endDate }) {
  if (!isValidRange(startDate, endDate)) return [];
  return records.filter((r) => r.date >= startDate && r.date <= endDate);
}

export function summarizePersonal(records) {
  const present = records.filter((r) => isPresent(r.status)).length;
  return {
    present,
    absent: records.length - present,
    days: records.length,
    rate: percent(present, records.length),
  };
}
