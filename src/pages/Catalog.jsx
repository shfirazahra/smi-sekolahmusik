import { useMemo, useState } from "react";
import AsyncBoundary from "../components/AsyncBoundary";
import CatalogFormModal from "../components/CatalogFormModal";
import ItemCard from "../components/ItemCard";
import { isInstructor } from "../services/auth";

export default function Catalog({ catalog, filter, handleOpenDetail, onBook, session, onNotify }) {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, filtered } = filter;
  const sourceEmpty = catalog.data.length === 0;
  const canManage = isInstructor(session);
  const categories = useMemo(() => [...new Set(catalog.data.map((item) => item.type))], [catalog.data]);

  // undefined = modal tertutup, null = form tambah, objek = form edit
  const [formItem, setFormItem] = useState();

  const handleDelete = (item) => {
    if (!confirm(`Hapus "${item.name}" dari katalog?`)) return;
    catalog.removeItem(item.id);
    onNotify?.("Kelas berhasil dihapus.");
  };

  const handleSave = (fields) => {
    if (formItem) {
      catalog.updateItem(formItem.id, fields);
      onNotify?.("Data kelas berhasil diperbarui.");
    } else {
      catalog.addItem(fields);
      onNotify?.("Kelas baru berhasil ditambahkan.");
    }
    setFormItem(undefined);
  };

  return (
    <div className="animate-fade-in py-12 sm:py-16 bg-slate-50 min-h-[80vh] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
            {canManage ? "Panel Pengelolaan Katalog" : "Program Pembelajaran"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 mb-2">
            {canManage ? "Kelola Katalog Kelas" : "Katalog Kelas"}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            {canManage
              ? "Atur, tambah, perbarui, atau hapus daftar program kelas yang tersedia."
              : "Cari program berdasarkan nama atau kategori untuk menemukan kelas yang sesuai."}
          </p>

          {canManage && (
            <button
              onClick={() => setFormItem(null)}
              className="mt-5 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition"
            >
              + Tambah Kelas Baru
            </button>
          )}
        </div>

        {formItem !== undefined && (
          <CatalogFormModal
            key={formItem?.id ?? "new"}
            item={formItem}
            onSave={handleSave}
            onClose={() => setFormItem(undefined)}
          />
        )}

        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
          <div className="relative flex-grow">
            <input
              type="text"
              aria-label="Cari kelas"
              placeholder="Cari piano, gitar, vokal, atau kelas musik..."
              className="bg-slate-50 text-slate-800 pl-10 pr-4 py-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-indigo-600 text-xs sm:text-sm font-medium border border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="bg-slate-50 text-slate-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 font-semibold text-xs sm:text-sm border border-slate-200 sm:w-60 cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="Semua">Tampilkan Semua Kategori</option>
            {categories.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <AsyncBoundary
          loading={catalog.loading}
          error={catalog.error}
          onRetry={catalog.retry}
          isEmpty={filtered.length === 0}
          emptyTitle={sourceEmpty ? "Katalog belum tersedia" : "Item tidak ditemukan"}
          emptyHint="Coba kata kunci pencarian lain atau ubah filter kategori Anda."
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filtered.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                session={session}
                onDetail={handleOpenDetail}
                onBook={onBook}
                onEdit={setFormItem}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </AsyncBoundary>
      </div>
    </div>
  );
}