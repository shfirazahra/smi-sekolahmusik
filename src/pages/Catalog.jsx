import { useState } from "react";
import AsyncBoundary from "../components/AsyncBoundary";
import ItemCard from "../components/ItemCard";

export default function Catalog({ catalog, filter, handleOpenDetail, onBook, session }) {
  const { searchQuery, setSearchQuery, categoryFilter, setCategoryFilter, filtered } = filter;
  const sourceEmpty = catalog.data.length === 0;
  const isAdmin = session?.role === "admin";

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formName, setFormName] = useState("");
  const [formPrice, setFormPrice] = useState("");
  const [formDesc, setFormDesc] = useState("");

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormName("");
    setFormPrice("");
    setFormDesc("");
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormPrice(item.price);
    setFormDesc(item.description || "");
    setShowModal(true);
  };

  const handleDeleteClass = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus kelas ini dari katalog?")) {
      const idx = catalog.data.findIndex((c) => c.id === id);
      if (idx !== -1) {
        catalog.data.splice(idx, 1);
        alert("Kelas berhasil dihapus!");
      }
    }
  };

  const handleSaveClass = (e) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    if (editingItem) {
      // Edit data kelas yang ada
      editingItem.name = formName;
      editingItem.price = Number(formPrice);
      editingItem.description = formDesc;
      alert("Data kelas berhasil diperbarui!");
    } else {
      // Tambah kelas baru
      catalog.data.unshift({
        id: `class-${Date.now()}`,
        name: formName,
        price: Number(formPrice),
        category: "Kelas Musik",
        description: formDesc || "Kelas musik baru.",
      });
      alert("Kelas baru berhasil ditambahkan!");
    }

    setShowModal(false);
  };

  return (
    <div className="animate-fade-in py-12 sm:py-16 bg-slate-50 min-h-[80vh] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
            {isAdmin ? "Panel Pengelolaan Katalog Admin" : "Program Pembelajaran"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 mt-3 mb-2">
            {isAdmin ? "Kelola Katalog Kelas" : "Katalog Kelas"}
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm">
            {isAdmin
              ? "Atur, tambah, perbarui, atau hapus daftar program kelas yang tersedia."
              : "Cari program berdasarkan nama atau kategori untuk menemukan kelas yang sesuai."}
          </p>

          {/* Tombol Tambah Kelas khusus Admin */}
          {isAdmin && (
            <button
              onClick={handleOpenAdd}
              className="mt-5 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition"
            >
              + Tambah Kelas Baru
            </button>
          )}
        </div>

        {/* Modal Tambah / Edit Kelas Admin */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-fade-in">
              <h3 className="text-lg font-black text-slate-900 mb-4">
                {editingItem ? "Edit Data Kelas" : "Tambah Kelas Baru"}
              </h3>
              <form onSubmit={handleSaveClass} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Kelas</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Contoh: Kelas Biola Advance"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Biaya / Sesi (Rp)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="150000"
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi</label>
                  <textarea
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Deskripsi singkat mengenai kelas ini..."
                    className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-slate-50"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-indigo-700"
                  >
                    {editingItem ? "Simpan Perubahan" : "Tambah Kelas"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between mb-8 gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
          <div className="relative flex-grow">
            <input
              type="text"
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
            <option value="Kelas Musik">Kelas Musik</option>
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
                onEdit={handleOpenEdit}
                onDelete={handleDeleteClass}
              />
            ))}
          </div>
        </AsyncBoundary>
      </div>
    </div>
  );
}