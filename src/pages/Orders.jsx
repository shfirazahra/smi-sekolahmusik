import EmptyState from "../components/EmptyState";
import { formatRupiah } from "../utils/format";

export default function Orders({ orders, onGoCatalog }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-fade-in min-h-[60vh]">
      <h1 className="text-2xl sm:text-3xl font-black mb-6 text-slate-900 uppercase">Pendaftaran Saya</h1>
      {orders.length === 0 ? (
        <div>
          <EmptyState
            title="Belum ada pendaftaran kelas"
            hint="Pilih program belajar musik dari katalog kelas kami."
          />
          <div className="mt-4 text-center">
            <button
              onClick={onGoCatalog}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold transition text-xs shadow-md"
            >
              Lihat Kelas
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 shadow-sm"
            >
              <div>
                <span className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-1 inline-block">
                  ID: {order.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{order.itemName}</h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Mulai: <span className="font-semibold text-slate-700">{order.date}</span> &bull; Jumlah sesi:{" "}
                  <span className="font-semibold text-slate-700">{order.duration}</span> sesi
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Estimasi Biaya</p>
                <p className="text-lg font-black text-indigo-600">{formatRupiah(order.totalPrice) ?? "Hubungi kami"}</p>
                <span className="inline-block mt-1 bg-amber-50 text-amber-700 border border-amber-200 text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase">
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
