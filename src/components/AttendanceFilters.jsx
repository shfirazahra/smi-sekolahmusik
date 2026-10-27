import FilterField from "./FilterField";
import { STATUS_LABELS } from "../utils/attendance";

// Filter riwayat kehadiran (rentang tanggal, status, dan opsional pencarian).
// Dipakai bersama oleh riwayat personal dan riwayat murid.
export default function AttendanceFilters({ filters, onChange, maxDate, searchLabel }) {
  const { startDate, endDate, status, search } = filters;
  const hasSearch = typeof searchLabel === "string";

  return (
    <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${hasSearch ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
      <FilterField
        label="Dari tanggal"
        type="date"
        value={startDate}
        max={endDate || maxDate}
        onChange={(e) => onChange({ startDate: e.target.value })}
      />
      <FilterField
        label="Sampai tanggal"
        type="date"
        value={endDate}
        min={startDate || undefined}
        max={maxDate}
        onChange={(e) => onChange({ endDate: e.target.value })}
      />
      <FilterField label="Status kehadiran" as="select" value={status} onChange={(e) => onChange({ status: e.target.value })}>
        <option value="semua">Semua status</option>
        {Object.entries(STATUS_LABELS).map(([val, label]) => (
          <option key={val} value={val}>
            {label}
          </option>
        ))}
      </FilterField>
      {hasSearch && (
        <FilterField
          label={searchLabel}
          type="search"
          value={search}
          placeholder="Nama atau email..."
          onChange={(e) => onChange({ search: e.target.value })}
        />
      )}
    </div>
  );
}
