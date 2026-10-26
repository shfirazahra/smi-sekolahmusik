// Format tanggal lokal (YYYY-MM-DD) untuk input type="date", tanpa pergeseran zona waktu.
export const toDateInput = (date) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
};

export const getTodayValue = () => toDateInput(new Date());

export const getDaysAgoValue = (days) => {
  const now = new Date();
  return toDateInput(new Date(now.getFullYear(), now.getMonth(), now.getDate() - days));
};

export const formatDate = (value) =>
  value
    ? new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(
        new Date(`${value}T00:00:00`),
      )
    : "-";
