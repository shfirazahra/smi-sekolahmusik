import { STATUS_LABELS, STATUS_STYLES } from "../utils/attendance";

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${STATUS_STYLES[status] || ""}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}
