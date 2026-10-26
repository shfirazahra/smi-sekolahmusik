import { useState } from "react";
import PriceTag from "./PriceTag";
import { unitOf } from "../utils/format";
import { getTodayValue } from "../utils/date";

export default function BookingModal({ item, onClose, onConfirm }) {
  const [error, setError] = useState("");
  const [today] = useState(getTodayValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const date = form.get("date");
    const duration = parseInt(form.get("duration"), 10);

    if (!date || date < today) return setError("Pilih tanggal mulai hari ini atau setelahnya.");
    if (!Number.isInteger(duration) || duration < 1) return setError("Durasi minimal 1.");
    onConfirm({ date, duration });
  };

  const inputClass =
    "bg-slate-50 w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs font-medium";

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-md relative overflow-hidden">
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 transition font-bold"
        >
          ✕
        </button>
        <h2 className="text-xl font-black mb-0.5 pr-6">{item.name}</h2>
        <PriceTag item={item} className="text-indigo-600 font-bold text-xs mb-4" />
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">Tanggal Mulai Kelas</label>
            <input type="date" name="date" min={today} required className={inputClass} />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-slate-700 mb-1 uppercase">
              Durasi ({unitOf(item)})
            </label>
            <input type="number" name="duration" min="1" required defaultValue="1" className={inputClass} />
          </div>
          {error && <p role="alert" className="text-xs font-medium text-rose-700">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold uppercase text-xs hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20 mt-1"
          >
            Konfirmasi Pendaftaran
          </button>
        </form>
      </div>
    </div>
  );
}
