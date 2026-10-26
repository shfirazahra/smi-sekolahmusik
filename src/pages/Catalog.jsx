import AsyncBoundary from "../components/AsyncBoundary";
import ItemCard from "../components/ItemCard";

export default function Catalog({ catalog, filter, handleOpenDetail, onBook }) {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, filtered } = filter;
  const sourceEmpty = catalog.data.length === 0;

  return (
    <div className="animate-fade-in py-12 sm:py-16 bg-slate-50 min-h-[80vh] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
            Program Pembelajaran
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 mb-2">Kelas Musik</h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            Cari program berdasarkan nama atau kategori untuk menemukan kelas yang sesuai.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Cari piano, gitar, vokal, atau kelas musik..."
              aria-label="Cari item katalog"
              className="bg-slate-50 text-slate-800 pl-10 pr-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs sm:text-sm font-medium border border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            aria-label="Filter kategori"
            className="bg-slate-50 text-slate-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-semibold text-xs sm:text-sm border border-slate-200 sm:w-60 cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="Semua">Tampilkan Semua Kategori</option>
            <option value="Kelas Musik">Kelas Musik</option>
          </select>
        </div>

        {catalog.skipped > 0 && (
          <p className="mb-4 text-xs text-slate-400">{catalog.skipped} data tidak valid dilewati.</p>
        )}

        <AsyncBoundary
          loading={catalog.loading}
          error={catalog.error}
          onRetry={catalog.retry}
          isEmpty={filtered.length === 0}
          emptyTitle={sourceEmpty ? "Katalog belum tersedia" : "Item tidak ditemukan"}
          emptyHint={
            sourceEmpty
              ? "Data katalog kosong. Silakan coba lagi nanti."
              : "Coba kata kunci pencarian lain atau ubah filter kategori Anda."
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => (
              <ItemCard key={item.id} item={item} onDetail={handleOpenDetail} onBook={onBook} />
            ))}
          </div>
        </AsyncBoundary>
      </div>
    </div>
  );
}
