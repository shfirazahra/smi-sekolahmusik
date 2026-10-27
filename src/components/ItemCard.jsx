import ItemImage from "./ItemImage";
import PriceTag from "./PriceTag";
import { isInstructor } from "../services/auth";

export default function ItemCard({ item, onDetail, onBook, onEdit, onDelete, session }) {
  const canManage = isInstructor(session);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <ItemImage item={item} className="h-full w-full object-cover" />
          <span className="absolute top-3 right-3 bg-indigo-950/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {item.type}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
          <PriceTag item={item} className="text-indigo-600 font-extrabold text-sm mb-2" />
          <p className="text-slate-500 text-xs line-clamp-2">{item.description}</p>
        </div>
      </div>

      <div className="p-5 pt-0 flex gap-2">
        <button
          onClick={() => onDetail(item)}
          className="flex-1 bg-slate-100 text-slate-700 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-slate-200 transition"
        >
          Detail
        </button>

        {/* Tampilan Tombol Dinamis berdasarkan Role */}
        {canManage ? (
          <>
            <button
              onClick={() => onEdit?.(item)}
              className="flex-1 bg-amber-500 text-white py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-amber-600 transition shadow-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(item)}
              className="bg-rose-600 text-white px-3 py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-rose-700 transition"
              title="Hapus Kelas"
            >
              Hapus
            </button>
          </>
        ) : (
          <button
            onClick={() => onBook(item)}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-indigo-700 transition shadow-md"
          >
            Daftar Kelas
          </button>
        )}
      </div>
    </div>
  );
}