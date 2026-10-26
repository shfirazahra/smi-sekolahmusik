import { useMemo, useState } from "react";
import { getDaysAgoValue, getTodayValue } from "../utils/date";
import {
  buildPersonalRecords,
  buildStudentRecords,
  filterStudentRecords,
  statusBreakdown,
  summarizePersonal,
  summarizeRecords,
} from "../utils/attendance";

// State filter + hasil olahan data kehadiran. UI hanya menampilkan hasilnya.
export function useAttendance(students) {
  const [startDate, setStartDate] = useState(() => getDaysAgoValue(6));
  const [endDate, setEndDate] = useState(getTodayValue);
  const [status, setStatus] = useState("semua");
  const [search, setSearch] = useState("");

  const records = useMemo(() => buildStudentRecords(students), [students]);
  const filtered = useMemo(
    () => filterStudentRecords(records, { startDate, endDate, status, search }),
    [records, startDate, endDate, status, search],
  );
  const summary = useMemo(() => summarizeRecords(filtered), [filtered]);
  const breakdown = useMemo(() => statusBreakdown(filtered), [filtered]);
  const personalRecords = useMemo(() => buildPersonalRecords(startDate, endDate), [startDate, endDate]);
  const personal = useMemo(() => summarizePersonal(personalRecords), [personalRecords]);

  return {
    filters: { startDate, endDate, status, search },
    setStartDate,
    setEndDate,
    setStatus,
    setSearch,
    filtered,
    summary,
    breakdown,
    personalRecords,
    personal,
  };
}
