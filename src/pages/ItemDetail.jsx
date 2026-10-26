import ItemImage from "../components/ItemImage";
import PriceTag from "../components/PriceTag";

export default function ItemDetail({ item, onBack, onBook }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 animate-fade-in min-h-[75vh]">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-slate-600 font-bold hover:text-indigo-600 transition mb-6 bg-white px-4 py-2 rounded-full border border-slate-200 text-xs shadow-sm"
      >
        ← <span>Kembali ke Kelas</span>
      </button>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden grid lg:grid-cols-2 gap-0">
        <div className="relative h-64 sm:h-80 lg:h-full">
          <ItemImage item={item} className="w-full h-full object-cover" />
          <div className="absolute top-4 left-4 bg-slate-900/90 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase border border-slate-700 shadow-md">
            {item.type}
          </div>
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-between bg-white">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">{item.name}</h1>
            <PriceTag item={item} className="text-xl font-black text-indigo-600 mb-4" />

            <div className="mb-6">
              <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-1">Tentang Kelas</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.description}</p>
            </div>

            {item.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xs uppercase font-bold text-slate-400 tracking-wider mb-2">Yang Akan Dipelajari</h3>
                <div className="space-y-2">
                  {item.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs font-medium text-slate-700"
                    >
                      <span className="text-emerald-600 font-bold">✓</span> {feat}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={() => onBook(item)}
              disabled={item.price === null}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md shadow-indigo-600/20 transition duration-300 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              Daftar Kelas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
