import { useState } from "react";

const inputClass =
  "w-full rounded-xl border border-slate-200 p-3 text-sm focus:ring-2 focus:ring-indigo-600 focus:outline-none bg-slate-50";

// Form tambah / ubah kelas. Gunakan `key` pada pemanggil agar state form ter-reset per item.
export default function CatalogFormModal({ item, onSave, onClose }) {
  const [name, setName] = useState(item?.name ?? "");
  const [price, setPrice] = useState(item?.price ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = {};
    if (!name.trim()) next.name = "Nama kelas wajib diisi.";
    const numericPrice = Number(price);
    if (price === "" || !Number.isFinite(numericPrice) || numericPrice <= 0) next.price = "Biaya harus berupa angka lebih dari 0.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({
      name: name.trim(),
      price: numericPrice,
      description: description.trim() || "Kelas musik baru.",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div role="dialog" aria-modal="true" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl animate-fade-in">
        <h3 className="mb-4 text-lg font-black text-slate-900">{item ? "Edit Data Kelas" : "Tambah Kelas Baru"}</h3>
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="class-name" className="mb-1 block text-xs font-bold text-slate-700">
              Nama Kelas
            </label>
            <input
              id="class-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Kelas Biola Lanjutan"
              className={inputClass}
            />
            {errors.name && <p className="mt-1 text-xs text-rose-700">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="class-price" className="mb-1 block text-xs font-bold text-slate-700">
              Biaya / Sesi (Rp)
            </label>
            <input
              id="class-price"
              type="number"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="150000"
              className={inputClass}
            />
            {errors.price && <p className="mt-1 text-xs text-rose-700">{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="class-desc" className="mb-1 block text-xs font-bold text-slate-700">
              Deskripsi
            </label>
            <textarea
              id="class-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Deskripsi singkat mengenai kelas ini..."
              className={inputClass}
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700">
              Batal
            </button>
            <button type="submit" className="rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-700">
              {item ? "Simpan Perubahan" : "Tambah Kelas"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
