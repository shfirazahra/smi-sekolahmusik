export default function ItemDetail({ item, onBack, onBook, session }) {
  const isAdmin = session?.role === "admin";

  return (
    <div className="animate-fade-in py-12 bg-slate-50 min-h-[80vh] px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition"
        >
          ← Kembali ke Kelas
        </button>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm grid grid-cols-1 md:grid-cols-2">
          {/* Bagian Gambar */}
          <div className="relative h-64 md:h-full bg-slate-100">
            <img
              src={item.image || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-indigo-950/80 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1.5 rounded-lg uppercase tracking-wider">
              {item.category || "Kelas Musik"}
            </span>
          </div>

          {/* Bagian Detail Informasi */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{item.name}</h1>
              <p className="text-indigo-600 font-black text-xl mb-6">
                Rp {Number(item.price).toLocaleString("id-ID")}{" "}
                <span className="text-slate-400 font-semibold text-xs">/ Sesi</span>
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                    Tentang Kelas
                  </h3>
                  <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
                    {item.description || "Pengenalan materi dasar kelas musik untuk pemula."}
                  </p>
                </div>

                {item.learnings && (
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                      Yang Akan Dipelajari
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {item.learnings.map((point, index) => (
                        <li key={index} className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                          <span className="text-emerald-500 font-bold">✓</span> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sembunyikan Tombol Daftar Kelas untuk Admin */}
            {!isAdmin ? (
              <button
                onClick={() => onBook(item)}
                className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold text-xs uppercase hover:bg-indigo-700 transition shadow-md shadow-indigo-600/20"
              >
                Daftar Kelas
              </button>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-center">
                <p className="text-xs font-bold text-amber-800">
                  Mode Pengelola: Admin tidak dapat mendaftar kelas.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}