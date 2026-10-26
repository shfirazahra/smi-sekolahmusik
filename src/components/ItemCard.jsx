import ItemImage from "./ItemImage";
import PriceTag from "./PriceTag";

// Kartu item reusable: dipakai di Beranda (large) dan Katalog.
export default function ItemCard({ item, large = false, onDetail, onBook }) {
  const canBook = item.price !== null;
  const pad = large ? "p-6" : "p-5";
  const btn = large ? "py-3" : "py-2.5";

  return (
    <div
      className={`bg-white overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between group ${
        large ? "rounded-3xl hover:-translate-y-1.5" : "rounded-2xl hover:-translate-y-1"
      }`}
    >
      <div>
        <div className="relative overflow-hidden aspect-video">
          <ItemImage
            item={item}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
          <div className="absolute top-3 right-3 bg-slate-900/90 text-indigo-300 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase border border-slate-700">
            {item.type}
          </div>
        </div>
        <div className={pad}>
          <h3 className={`font-bold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition ${large ? "text-xl" : "text-lg"}`}>
            {item.name}
          </h3>
          <PriceTag item={item} className="text-indigo-600 font-black text-base mb-2" />
          <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed">{item.description}</p>
        </div>
      </div>

      <div className={`${pad} pt-0 flex gap-2`}>
        <button
          onClick={() => onDetail(item)}
          className={`w-1/2 bg-slate-100 hover:bg-slate-200 text-slate-700 ${btn} rounded-xl font-bold transition text-xs uppercase`}
        >
          Detail
        </button>
        <button
          onClick={() => onBook(item)}
          disabled={!canBook}
          className={`w-1/2 bg-indigo-600 hover:bg-indigo-700 text-white ${btn} rounded-xl font-bold transition text-xs uppercase shadow-md shadow-indigo-600/20 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none`}
        >
          Daftar Kelas
        </button>
      </div>
    </div>
  );
}
