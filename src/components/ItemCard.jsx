export default function ItemCard({ item, onDetail, onBook, onEdit, onDelete, session }) {
  const isAdmin = session?.role === "admin";

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={item.image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 right-3 bg-indigo-950/80 backdrop-blur-md text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wider">
            {item.category || "Kelas Musik"}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-slate-900 mb-1">{item.name}</h3>
          <p className="text-indigo-600 font-extrabold text-sm mb-2">
            Rp {Number(item.price).toLocaleString("id-ID")}{" "}
            <span className="text-slate-400 font-normal text-xs">/ Sesi</span>
          </p>
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
        {isAdmin ? (
          <>
            <button
              onClick={() => onEdit && onEdit(item)}
              className="flex-1 bg-amber-500 text-white py-2.5 rounded-xl font-bold text-xs uppercase hover:bg-amber-600 transition shadow-md"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete && onDelete(item.id)}
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