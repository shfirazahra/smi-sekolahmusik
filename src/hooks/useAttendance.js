import { useCallback, useMemo, useState } from "react";
import { getDaysAgoValue, getTodayValue } from "../utils/date";
import {
  buildPersonalRecords,
  buildStudentRecords,
  createManualRecord,
  filterByDateAndSearch,
  filterByStatus,
  filterPersonalRecords,
  isValidRange,
  mergeManualRecords,
  statusBreakdown,
  summarizePersonal,
  summarizeRecords,
} from "../utils/attendance";

// State filter + hasil olahan data kehadiran. UI hanya menampilkan hasilnya.
// Filter murid dan filter personal berdiri sendiri-sendiri.
// Ringkasan & persentase mengikuti rentang tanggal (dan pencarian), sedangkan filter status
// hanya mempersempit isi tabel, supaya persentase kehadiran tidak berubah menjadi 0% / 100%.
export function useAttendance(students) {
  const [studentFilters, setStudentFilters] = useState(() => ({
    startDate: getDaysAgoValue(6),
    endDate: getTodayValue(),
    status: "semua",
    search: "",
  }));
  const [personalFilters, setPersonalFilters] = useState(() => ({
    startDate: getDaysAgoValue(6),
    endDate: getTodayValue(),
    status: "semua",
  }));
  const [manualRecords, setManualRecords] = useState([]);

  const generated = useMemo(() => buildStudentRecords(students), [students]);
  const records = useMemo(() => mergeManualRecords(generated, manualRecords), [generated, manualRecords]);

  const inStudentScope = useMemo(() => filterByDateAndSearch(records, studentFilters), [records, studentFilters]);
  const studentRows = useMemo(
    () => filterByStatus(inStudentScope, studentFilters.status),
    [inStudentScope, studentFilters.status],
  );
  const summary = useMemo(() => summarizeRecords(inStudentScope), [inStudentScope]);
  const breakdown = useMemo(() => statusBreakdown(inStudentScope), [inStudentScope]);

  const personalAll = useMemo(() => buildPersonalRecords(), []);
  const inPersonalScope = useMemo(() => filterPersonalRecords(personalAll, personalFilters), [personalAll, personalFilters]);
  const personalRows = useMemo(
    () => filterByStatus(inPersonalScope, personalFilters.status),
    [inPersonalScope, personalFilters.status],
  );
  const personal = useMemo(() => summarizePersonal(inPersonalScope), [inPersonalScope]);

  const updateStudentFilters = useCallback((patch) => setStudentFilters((f) => ({ ...f, ...patch })), []);
  const updatePersonalFilters = useCallback((patch) => setPersonalFilters((f) => ({ ...f, ...patch })), []);

  // Mencatat kehadiran murid hari ini. Mengembalikan true jika murid ditemukan.
  const addAttendance = useCallback(
    (studentId, status) => {
      const student = students.find((s) => String(s.id) === String(studentId));
      if (!student) return false;
      const record = createManualRecord(student, status);
      setManualRecords((prev) => [record, ...prev.filter((r) => r.id !== record.id)]);
      return true;
    },
    [students],
  );

  return {
    studentFilters,
    updateStudentFilters,
    studentRangeValid: isValidRange(studentFilters.startDate, studentFilters.endDate),
    studentRows,
    summary,
    breakdown,
    personalFilters,
    updatePersonalFilters,
    personalRangeValid: isValidRange(personalFilters.startDate, personalFilters.endDate),
    personalRows,
    personal,
    addAttendance,
  };
}
